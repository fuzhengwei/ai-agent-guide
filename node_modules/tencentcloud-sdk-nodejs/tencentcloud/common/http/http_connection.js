"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpConnection = void 0;
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const url_1 = require("url");
const is_stream_1 = tslib_1.__importDefault(require("is-stream"));
const get_stream_1 = tslib_1.__importDefault(require("get-stream"));
const form_data_1 = tslib_1.__importDefault(require("form-data"));
const sign_1 = tslib_1.__importDefault(require("../sign"));
const fetch_1 = tslib_1.__importDefault(require("./fetch"));
const json_bigint_1 = tslib_1.__importDefault(require("json-bigint"));
const JSONbigNative = (0, json_bigint_1.default)({ useNativeBigInt: true });
/**
 * @inner
 */
class HttpConnection {
    static async doRequest({ method, url, data, timeout, headers = {}, agent, proxy, signal, }) {
        const config = {
            method: method,
            headers: Object.assign({}, headers),
            timeout,
            agent,
            proxy,
            signal,
        };
        if (method === "GET") {
            url += "?" + querystring_1.default.stringify(data);
        }
        else {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
            config.body = querystring_1.default.stringify(data);
        }
        return await (0, fetch_1.default)(url, config);
    }
    static async doRequestWithSign3({ method, url, data, service, action, region, version, secretId, secretKey, multipart = false, timeout = 60000, token, requestClient, language, headers = {}, agent, proxy, signal, skipSign = false, }) {
        // Convert readStream to Buffer to calculate the hash of the entire body
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await convertReadStreamToBuffer(data);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        data = deepRemoveNull(data);
        const timestamp = parseInt(String(new Date().getTime() / 1000));
        method = method.toUpperCase();
        let payload = "";
        if (method === "GET") {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            data = mergeData(data);
            url += "?" + querystring_1.default.stringify(data);
        }
        if (method === "POST") {
            payload = data;
        }
        const config = {
            method,
            timeout,
            headers: Object.assign({}, headers, {
                Host: new url_1.URL(url).host,
                "X-TC-Action": action,
                "X-TC-Region": region,
                "X-TC-Timestamp": timestamp,
                "X-TC-Version": version,
                "X-TC-Token": token,
                "X-TC-RequestClient": requestClient,
            }),
            agent,
            proxy,
            signal,
        };
        if (token === null || token === undefined) {
            delete config.headers["X-TC-Token"];
        }
        if (region === null || region === undefined) {
            delete config.headers["X-TC-Region"];
        }
        if (language) {
            config.headers["X-TC-Language"] = language;
        }
        let form;
        if (method === "GET") {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (method === "POST" && !multipart) {
            config.body = data;
            const contentType = config.headers["Content-Type"] || "application/json";
            if (!isBuffer(data))
                config.body = JSONbigNative.stringify(data);
            config.headers["Content-Type"] = contentType;
        }
        if (method === "POST" && multipart) {
            form = new form_data_1.default();
            for (const key in data) {
                form.append(key, data[key]);
            }
            config.body = form;
            config.headers = Object.assign({}, config.headers, form.getHeaders());
        }
        if (skipSign) {
            config.headers["Authorization"] = "SKIP";
        }
        else {
            const signature = sign_1.default.sign3({
                method,
                url,
                payload,
                timestamp,
                service,
                secretId,
                secretKey,
                multipart,
                boundary: form ? form.getBoundary() : undefined,
                headers: config.headers,
            });
            config.headers["Authorization"] = signature;
        }
        return await (0, fetch_1.default)(url, config);
    }
}
exports.HttpConnection = HttpConnection;
async function convertReadStreamToBuffer(data) {
    for (const key in data) {
        if ((0, is_stream_1.default)(data[key])) {
            data[key] = await get_stream_1.default.buffer(data[key]);
        }
    }
}
function mergeData(data, prefix = "") {
    const ret = {};
    for (const k in data) {
        if (data[k] === null) {
            continue;
        }
        if (data[k] instanceof Array || data[k] instanceof Object) {
            Object.assign(ret, mergeData(data[k], prefix + k + "."));
        }
        else {
            ret[prefix + k] = data[k];
        }
    }
    return ret;
}
function deepRemoveNull(obj) {
    if (isArray(obj)) {
        return obj.map(deepRemoveNull);
    }
    else if (isObject(obj)) {
        const result = {};
        for (const key in obj) {
            const value = obj[key];
            if (!isNull(value)) {
                result[key] = deepRemoveNull(value);
            }
        }
        return result;
    }
    else {
        return obj;
    }
}
function isBuffer(x) {
    return Buffer.isBuffer(x);
}
function isArray(x) {
    return Array.isArray(x);
}
function isObject(x) {
    return typeof x === "object" && !isArray(x) && !(0, is_stream_1.default)(x) && !isBuffer(x) && x !== null;
}
function isNull(x) {
    return x === null;
}
