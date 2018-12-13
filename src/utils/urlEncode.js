function urlEncode(urlString){
    var newURLString = encodeURIComponent(urlString.replace(/\//g, "_"))

    return newURLString
}

export default urlEncode