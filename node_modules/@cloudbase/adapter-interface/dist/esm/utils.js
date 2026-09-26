export function formatUrl(protocol, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    for (var key in query) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += key + "=" + encodeURIComponent(query[key]);
    }
    url += queryString;
    if (/^http(s)?\:\/\//.test(url)) {
        return url;
    }
    return "" + protocol + url;
}
