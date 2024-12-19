function getShuffleList(list) {
    const cloneList = list.slice()
    function pickRandomOne(list) {
        const i = Math.floor(Math.random() * list.length)
        const item = list.splice(i, 1).pop()
        return item
    }

    const retList = []
    while(cloneList.length) {
        const item = pickRandomOne(cloneList)
        retList.push(item)
    }

    return retList

}

function uniqBy(list, key) {
    let field = key
    const valueList = []
    const retList = []

    list.forEach((val, i) => {
        const compareValue = typeof key === 'function' ? key(val, i) : key ? val[key] : val
        if (!valueList.includes(compareValue)) {
            valueList.push(compareValue)
            retList.push(val)
        }
    })
    return retList
}

function isJsonLike(val) {
    const re = /^\[.*\]$|^\{.*\}$/
    return re.test(val)
}

function isPlainObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

function addZero(val) {
    return val < 10 ? '0' + val : val + ''
}

function getTodayStr() {
    const today= new Date()
    const y = today.getFullYear()
    const m = today.getMonth() + 1
    const d = today.getDate()
    return [y, m, d].map(addZero).join('-')
}

class LStorage {
    constructor() {
        this.storage = window.localStorage;
    }

    set(key, value) {
        if (isPlainObj(value) || Array.isArray(value)) {
            value = JSON.stringify(value);
        }
        this.storage.setItem(key, value);
    }

    get(key) {
        let value = this.storage.getItem(key);
        if (isJsonLike(value)) {
            value = JSON.parse(value);
        }

        if (/^[0-9\.]+$/.test(value)) {
            value = value * 1
        }

        return value;
    }

    del(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

const LCache = new LStorage();



function getCurUser() {
    return LCache.get('curUser') || ''
}

function getUserKey(cacheKey) {
    const curUser = getCurUser()
    return curUser ? curUser + ':' + cacheKey : cacheKey;
}

const listDataKeys = ['words', 'mwords', 'tags', 'users']

function getCache(cacheKey, skipDisables) {
    const userKey = getUserKey(cacheKey)
    let data = LCache.get(userKey)
    if (listDataKeys.includes(cacheKey) && skipDisables) {
        data = (data || []).filter(item => item.status !== 'disable')
    }

    return data
}

function clone(data) {
    return JSON.parse(JSON.stringify(data))
}

function setCache(cacheKey, data, isFillDisables) {
    const userKey = getUserKey(cacheKey)
    let newData = data
    if (!listDataKeys.includes(cacheKey) && isFillDisables) {
        newData = clone(data)
        const oldData = LCache.get(userKey) || []
        const disableIndexLs = oldData.map((item, i) => item.status !== 'disable' ? i : null).filter(v => v !== null)
        while(disableIndexLs.length > 0) {
            const i = disableIndexLs.shift()
            const len = newData.length
            if (i < len) {
                newData.splice(i, 0, oldData[i])
            } else {
                newData.push(oldData[i])
            }
        }
    }
    LCache.set(userKey, newData)
    return true
}

function delArrayItem(arr, item) {
    const index = arr.findIndex((el) => el === item)
    if (index > -1) {
        arr.splice(index, 1)
    }

    return arr;
}

function showToast(msg) {
    let appDiv = document.querySelector('#app')
    let toastDiv = document.createElement('div')
    toastDiv.className = 'my-toast'
    toastDiv.innerText = msg
    appDiv.appendChild(toastDiv)
    setTimeout(() => {
        toastDiv.classList.add('show')
        setTimeout(() => {
            appDiv.removeChild(toastDiv)
            toastDiv = null
            appDiv = null
        }, 2500);
    }, 300)

}

function getIsMobile() {
    return window.innerWidth < 800;
}

function getAllOptionOfTag() {
    const allOption = {name: "all", text: '全部', reverse: false}
    return allOption

}


const priorityWords = ["练习", "测试", "第"];
function sortByPriority(list, isPriorityLast = false) {
  const PList = list.filter((item) =>
    priorityWords.some((w) => item.name.startsWith(w))
  );
  const OList = list.filter((item) => !PList.includes(item));

  PList.sort((a, b) => (a.name > b.name ? 1 : -1));
  OList.sort((a, b) => (a.name > b.name ? 1 : -1));

  return isPriorityLast ? [...OList, ...PList] : [...PList, ...OList];
}


function getTagOptions(tagList) {
    const allOption = getAllOptionOfTag()
    const otherOptions = tagList.map(tag => {
        if (!tag.text) {
            tag.text = tag.name
        }

        if (tag.reverse == null) {
            tag.reverse = false
        }

        return {...tag}
    })

    return [allOption, ...sortByPriority(otherOptions)]
}

function getSortedTagList(tagList, isPriorityLast) {
    return sortByPriority(tagList, isPriorityLast);
}

function updateSelectedForTags(tagList, selectedTags) {
    tagList.forEach((tag, i) => {
        const matched = selectedTags.find(t => t.name === tag.name)
        if (matched) {
            tagList[i] = matched
        }
    })
}

function insertNoReferrerMeta() {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'referrer')
    meta.setAttribute('content', 'no-referrer')
    document.head.appendChild(meta)
}

async function defineMyFonts() {
    const baseURL = 'https://gitee.com/stephenykk/stephenykk.github.io/raw/master/source/study/'
    const fonts = {
        // AaKaishupinyin: baseURL + 'AaKaishupinyin.woff2',
        pinyin: 'https://files.cnblogs.com/files/stephenykk/AaKaishupinyin.woff2.zip'
    }

    Object.keys(fonts).forEach(fontName => {
        const fontURL = fonts[fontName]
        injectFont(fontName, fontURL)
    })
}

async function injectFont(fontName, fontURL, isObjectURL = false) {
    // while response content-type is text/plain, res.blob() is empty
    // const blob = await fetch(fontURL, { mode: 'no-cors'}).then(res => res.blob())
    const res = await fetch(fontURL, { /* mode: 'no-cors', */ responseType: 'blob'})
    const text = await res.text()
    // debugger;
    console.log("🚀 ~ injectFont ~ text:", text)
    const blob = await res.blob()
    console.log("🚀 ~ injectFont ~ blob:", blob)
    let targetURL = ''
    if (isObjectURL) {
        const objURL = URL.createObjectURL(obj)
        targetURL = objURL
    } else {
        const reader = new FileReader()
        const readPromise = new Promise(resolve => {
            reader.onload = function(event) {
                resolve(event.target.result)
                console.log("🚀 ~ readPromise ~ event:", event)
            }

            reader.readAsDataURL(blob)
        })

        const dataURL = await readPromise
        targetURL = dataURL
    }
    console.log("🚀 ~ injectFont ~ targetURL:", targetURL)

    const format = fontURL.replace(/\.zip$/, '').split('.').pop();
    const fontFaceRule = `
    @font-face {
        font-family: ${fontName};
        src: url(${targetURL}) format('${format}');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    `

    const style = document.createElement('style')
    style.type = 'text/css'
    style.setAttribute('data-font', fontName)
    if (style.styleSheet) {
        style.styleSheet.cssText = fontFaceRule; // ie
    } else {
        style.appendChild(document.createTextNode(fontFaceRule))
    }

    document.head.appendChild(style)


    console.log(`inject font  [${fontName}] success!`);
}


// insertNoReferrerMeta()

// defineMyFonts();