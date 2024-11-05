function parse(search, isDecode = true) {
    if (search.includes('?')) {
        search = search.replace(/^[^?]*\?/, '')
    } else if (!search.includes('=')){
        return {}
    }

    const queryObj = {}
    search.split('&').map(part => {
        const [key, val = ''] = part.split(/(?<=^[^=]*)=/)
        const value = isDecode ? decodeURIComponent(val) : val
        queryObj[key] = value
    })

    return queryObj
}

function stringify(obj, isEncode = true) {
    return [...Object.entries(obj)].map(([key, val]) => `${key}=${isEncode ? encodeURIComponent(val) : val}`).join('&')
}

function update(url, obj, isEncode = true) {
    if (!Object.keys(obj).length) return url
    const firstPart = url.split('?')[0]
    return firstPart + "?" + stringify(obj, isEncode);

}

module.exports =  {
    parse,
    stringify,
    update
}