function parse(search, isDecode = true) {
    if (search.includes('?')) {
        search = search.replace(/^[^?]*\?/, '')
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
    return [...obj.entries()].map(([key, val]) => `key=${isEncode ? encodeURIComponent(val) : val}`).join('&')
}

function update(url, obj) {
    if (!obj.keys().length) return url
    const firstPart = url.split('?')[0]
    return firstPart + '?' + stringify(obj)

}

return {
    parse,
    stringify,
    update
}