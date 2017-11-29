import "whatwg-fetch";
import cookie from "js-cookie";
import { message } from "antd";
import ParseUrl from "./parseUrl";

const errorMessages = res => `${res.status} ${res.statusText}`;

/* 资源找不到 */
function check404(res) {
    if (res.status === 404) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}

/* 401是没有登录，跳转到登录页面(根据葛志刚同志要求修改于20170726) */
function check401(res) {
    // 登陆界面不需要做401校验
    if (res.status === 401 && !res.url.match("auth")) {
        window.location.href = window.location.origin + "/#/login";
    }
    return res;
}

function check400(res) {
    if (!(res.status === 400 && res.url.indexOf('omp/api/micro_app/get_org_app') !== -1)) {
        return res;
    }
}

function checkStatus(response) {
    const res = response.json();
    if (response.status >= 200 && response.status < 300) {
        return res.then(({ errorCode, errorMsg, result, ...rest }) => {
            if (errorCode) {
                return Promise.reject({
                    statusCode: errorCode,
                    msg: errorMsg,
                    result: result
                });
            }
            return {
                ...rest,
                result
            };
        });
    }

    return res.then(({ errorCode, errorMsg, result, ...rest }) =>
        Promise.reject({
            statusCode: response.status,
            msg: response.statusText,
            result: result
        })
    );
}

/* 跳转 */
function check302(data) {
    const { errorCode } = data;
    if (errorCode === "302") {
        window.location.href = window.location.origin + "/#/login";
    } else {
        return data;
    }
}

function setUriParam(keys, value, keyPostfix) {
    let keyStr = keys[0];
    keys.slice(1).forEach(key => {
        keyStr += `[${key}]`;
    });
    if (keyPostfix) {
        keyStr += keyPostfix;
    }
    return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUrlParams(keys, object) {
    const array = [];
    if (object instanceof Array) {
        object.forEach(value => {
            array.push(setUriParam(keys, value, "[]"));
        });
    } else if (object instanceof Object) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];

                array.push(getUrlParams(keys.concat(key), value));
            }
        }
    } else {
        if (object !== undefined) {
            array.push(setUriParam(keys, object));
        }
    }
    return array.join("&");
}

function toQueryString(object) {
    const array = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const str = getUrlParams([key], object[key]);
            if (str !== "") {
                array.push(str);
            }
        }
    }
    return array.join("&");
}

function process(url, options) {
    // let mergeUrl = `${url}?checkSum=${checkSum}`;
    let mergeUrl = `${url}`;
    const defaultOptions = {
        method: "GET",
        credentials: "same-origin"
    };
    let opts = Object.assign({}, defaultOptions, { ...options });
    // add query params to url when method is GET
    if (opts && opts.method === "GET" && opts["params"]) {
        mergeUrl = mergeUrl + "?" + toQueryString(opts["params"]);
    }

    opts.headers = {
        ...opts.headers,
        "X-csrf-token": cookie.get("csrf_token"),
        Authorization: cookie.get("access_token") || ""
    };

    // Authentication
    if (opts.method === "POST") {
        if (Object.prototype.toString.call(opts.body) !== "[object FormData]") {
            opts.body = JSON.stringify(opts.body);
        }
    }
    return { mergeUrl, opts };
}

function cFetch(url, options) {
    const startTime = new Date().getTime();
    const { mergeUrl, opts } = process(url, options);

    const pathname = ParseUrl(url).pathname;

    return fetch(mergeUrl, opts)
        .then(check400)
        .then(check404)
        .then(check401)
        .then(checkStatus)
        .then(check302)
        .then(res => {
            return res;
        })
        .catch(err => {

            message.error(err.msg || "服务器出错~");

            return Promise.reject(err); // 后面的catch 约定不要弹框，不然就会重复弹框了
        });
}

export default cFetch;
