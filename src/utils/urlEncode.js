function urlEncode(urlString){
    urlString = String(urlString)
    var newURLString = encodeURIComponent(urlString.replace(/\//g, "_"))

    return newURLString
}

export default urlEncode