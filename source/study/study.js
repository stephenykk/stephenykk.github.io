function isJsonLike(val) {
    const re = /^\[.*\]$|^\{.*\}$/
    return re.test(val)
}
console.log('===========kk')

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