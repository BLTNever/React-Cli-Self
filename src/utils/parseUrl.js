/**
 * 获取地址栏参数
 * @param url
 * @returns {{protocol: (*|number|string), host: (*|String|exports.callbacks.host|string), hostname: (*|boolean|string), port: *, pathname: (*|string), search: *, searchObject: {}, hash: *}}
 * @constructor
 */
var ParseUrl = function (url) {
    var parser;
    if (!url) {
        parser = window.location;
    } else {
        parser = document.createElement('a');
        parser.href = url;
    }
    var searchObject = {},
        queries, split, i;
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = decodeURIComponent(split[1]);
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };

};

module.exports = ParseUrl;