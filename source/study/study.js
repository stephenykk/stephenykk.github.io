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