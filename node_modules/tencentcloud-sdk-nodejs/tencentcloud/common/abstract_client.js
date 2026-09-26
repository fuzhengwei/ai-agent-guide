"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClient = void 0;
const tslib_1 = require("tslib");
const sdk_version_1 = require("./sdk_version");
const interface_1 = require("./interface");
const sign_1 = tslib_1.__importDefault(require("./sign"));
const http_connection_1 = require("./http/http_connection");
const tencent_cloud_sdk_exception_1 = tslib_1.__importDefault(require("./exception/tencent_cloud_sdk_exception"));
const sse_response_model_1 = require("./sse_response_model");
const uuid_1 = require("uuid");
/**
 * Abstract base client for Tencent Cloud SDK
 *
 * This class provides common functionality for making API requests to Tencent Cloud services,
 * including request signing, error handling, and response parsing.
 */
class AbstractClient {
    /**
     * Constructs a new AbstractClient instance
     *
     * @param {string} endpoint - The service endpoint URL (e.g. "cvm.tencentcloudapi.com")
     * @param {string} version - The API version of the service (e.g. "2017-03-12")
     * @param {ClientConfig} config - Configuration object containing:
     * @param {Credential|DynamicCredential} config.credential - Credentials for authentication
     * @param {string} [config.region] - The region of the service (e.g. "ap-shanghai")
     * @param {ClientProfile} [config.profile={}] - Optional client configuration profile
     *
     * @throws {TencentCloudSDKHttpException} If invalid language is specified in profile
     *
     * @example
     * const client = new AbstractClient(
     *   "cvm.tencentcloudapi.com",
     *   "2017-03-12",
     *   {
     *     credential: {
     *       secretId: process.env.secretId,
     *       secretKey: process.env.secretKey,
     *     },
     *     region: "ap-shanghai",
     *     profile: {}
     *   }
     * );
     */
    constructor(endpoint, version, { credential, region, profile = {} }) {
        this.path = "/";
        /**
         * Credential instance
         */
        if (credential && "getCredential" in credential) {
            this.credential = credential;
        }
        else {
            this.credential = Object.assign({
                secretId: null,
                secretKey: null,
                token: null,
            }, credential);
        }
        /**
         * The region of the service
         */
        this.region = region || null;
        this.sdkVersion = "SDK_NODEJS_" + sdk_version_1.sdkVersion;
        this.apiVersion = version;
        this.endpoint = (profile && profile.httpProfile && profile.httpProfile.endpoint) || endpoint;
        /**
         * Optional configuration instance
         * @type {ClientProfile}
         */
        this.profile = {
            signMethod: (profile && profile.signMethod) || "TC3-HMAC-SHA256",
            httpProfile: Object.assign({
                reqMethod: "POST",
                endpoint: null,
                protocol: "https://",
                reqTimeout: 60,
            }, profile && profile.httpProfile),
            language: profile.language,
        };
        if (this.profile.language && !interface_1.SUPPORT_LANGUAGE_LIST.includes(this.profile.language)) {
            throw new tencent_cloud_sdk_exception_1.default(`Language invalid, choices: ${interface_1.SUPPORT_LANGUAGE_LIST.join("|")}`);
        }
    }
    /**
     * Get credential information
     * @returns {Promise<Credential>} Promise that resolves with credential information
     */
    async getCredential() {
        if ("getCredential" in this.credential) {
            return await this.credential.getCredential();
        }
        return this.credential;
    }
    /**
     * Make an API request to Tencent Cloud service
     *
     * @param {string} action - The API action name to call
     * @param {any} req - The request payload/parameters
     * @param {ResponseCallback|RequestOptions} [options] - Either request options or callback function
     * @param {ResponseCallback} [cb] - Optional callback function for async operation
     * @returns {Promise<ResponseData>} Promise that resolves with the API response data
     *
     * @example
     * // Using promise
     * client.request('DescribeInstances', {Limit: 10})
     *   .then(data => console.log(data))
     *   .catch(err => console.error(err));
     *
     * // Using callback
     * client.request('DescribeInstances', {Limit: 10}, (err, data) => {
     *   if (err) console.error(err);
     *   else console.log(data);
     * });
     *
     * // With options
     * client.request('DescribeInstances', {Limit: 10}, {signal: abortController.signal})
     *   .then(data => console.log(data))
     *   .catch(err => console.error(err));
     */
    async request(action, req, options, cb) {
        if (typeof options === "function") {
            cb = options;
            options = {};
        }
        try {
            const result = await this.doRequest(action, req !== null && req !== void 0 ? req : {}, options);
            cb && cb(null, result);
            return result;
        }
        catch (e) {
            cb && cb(e, null);
            throw e;
        }
    }
    /**
     * Make a request with octet-stream content type
     * @param {string} action API action name
     * @param {any} req Request data
     * @param {ResponseCallback|RequestOptions} [options] Request options or callback
     * @param {ResponseCallback} [cb] Callback function
     * @returns {Promise<any>} Promise that resolves with response data
     */
    async requestOctetStream(action, req, options, cb) {
        if (typeof options === "function") {
            cb = options;
            options = {};
        }
        try {
            const result = await this.doRequest(action, req !== null && req !== void 0 ? req : {}, Object.assign({}, options, {
                headers: {
                    "Content-Type": "application/octet-stream; charset=utf-8",
                },
            }));
            cb && cb(null, result);
            return result;
        }
        catch (e) {
            cb && cb(e, null);
            throw e;
        }
    }
    /**
     * @inner
     */
    async doRequest(action, req, options = {}) {
        if (this.profile.signMethod === "TC3-HMAC-SHA256") {
            return this.doRequestWithSign3(action, req, options);
        }
        let params = this.mergeData(req);
        params = await this.formatRequestData(action, params);
        const headers = Object.assign({}, this.profile.httpProfile.headers, options.headers);
        let traceId = "";
        for (let key in headers) {
            if (key.toLowerCase() === "x-tc-traceid") {
                traceId = headers[key];
                break;
            }
        }
        if (!traceId) {
            traceId = (0, uuid_1.v4)();
            headers["X-TC-TraceId"] = traceId;
        }
        let res;
        try {
            res = await http_connection_1.HttpConnection.doRequest({
                method: this.profile.httpProfile.reqMethod,
                url: this.profile.httpProfile.protocol + this.endpoint + this.path,
                data: params,
                timeout: this.profile.httpProfile.reqTimeout * 1000,
                headers,
                agent: this.profile.httpProfile.agent,
                proxy: this.profile.httpProfile.proxy,
                signal: options.signal,
            });
        }
        catch (error) {
            throw new tencent_cloud_sdk_exception_1.default(error.message, "", traceId);
        }
        return this.parseResponse(res);
    }
    /**
     * @inner
     */
    async doRequestWithSign3(action, params, options = {}) {
        const headers = Object.assign({}, this.profile.httpProfile.headers, options.headers);
        let traceId = "";
        for (let key in headers) {
            if (key.toLowerCase() === "x-tc-traceid") {
                traceId = headers[key];
                break;
            }
        }
        if (!traceId) {
            traceId = (0, uuid_1.v4)();
            headers["X-TC-TraceId"] = traceId;
        }
        let res;
        try {
            const credential = await this.getCredential();
            res = await http_connection_1.HttpConnection.doRequestWithSign3({
                method: this.profile.httpProfile.reqMethod,
                url: this.profile.httpProfile.protocol + this.endpoint + this.path,
                secretId: credential.secretId,
                secretKey: credential.secretKey,
                region: this.region,
                data: params || "",
                service: this.endpoint.split(".")[0],
                action: action,
                version: this.apiVersion,
                multipart: options && options.multipart,
                timeout: this.profile.httpProfile.reqTimeout * 1000,
                token: credential.token,
                requestClient: this.sdkVersion,
                language: this.profile.language,
                headers,
                agent: this.profile.httpProfile.agent,
                proxy: this.profile.httpProfile.proxy,
                signal: options.signal,
                skipSign: options.skipSign,
            });
        }
        catch (e) {
            throw new tencent_cloud_sdk_exception_1.default(e.message, "", traceId);
        }
        return this.parseResponse(res);
    }
    /**
     * Parse HTTP response
     * @param {Response} res HTTP response object
     * @returns {Promise<ResponseData>} Promise that resolves with parsed response data
     * @throws {TencentCloudSDKHttpException} If response contains error
     */
    async parseResponse(res) {
        const traceId = res.headers.get("x-tc-traceid");
        if (res.status !== 200) {
            const tcError = new tencent_cloud_sdk_exception_1.default(res.statusText, "", traceId);
            tcError.httpCode = res.status;
            throw tcError;
        }
        else {
            if (res.headers.get("content-type") === "text/event-stream") {
                return new sse_response_model_1.SSEResponseModel(res.body);
            }
            else {
                const data = await res.json();
                if (data.Response.Error) {
                    const tcError = new tencent_cloud_sdk_exception_1.default(data.Response.Error.Message, data.Response.RequestId, traceId);
                    tcError.code = data.Response.Error.Code;
                    throw tcError;
                }
                else {
                    return data.Response;
                }
            }
        }
    }
    /**
     * Merge nested data into flat structure
     * @param {any} data Input data
     * @param {string} [prefix=""] Key prefix
     * @returns {any} Flattened data object
     */
    mergeData(data, prefix = "") {
        const ret = {};
        for (const k in data) {
            if (data[k] === null || data[k] === undefined) {
                continue;
            }
            if (data[k] instanceof Array || data[k] instanceof Object) {
                Object.assign(ret, this.mergeData(data[k], prefix + k + "."));
            }
            else {
                ret[prefix + k] = data[k];
            }
        }
        return ret;
    }
    /**
     * Format request data with required fields and signature
     * @param {string} action API action name
     * @param {RequestData} params Request parameters
     * @returns {Promise<RequestData>} Promise that resolves with formatted request data
     */
    async formatRequestData(action, params) {
        params.Action = action;
        params.RequestClient = this.sdkVersion;
        params.Nonce = Math.round(Math.random() * 65535);
        params.Timestamp = Math.round(Date.now() / 1000);
        params.Version = this.apiVersion;
        const credential = await this.getCredential();
        if (credential.secretId) {
            params.SecretId = credential.secretId;
        }
        if (this.region) {
            params.Region = this.region;
        }
        if (credential.token) {
            params.Token = credential.token;
        }
        if (this.profile.language) {
            params.Language = this.profile.language;
        }
        if (this.profile.signMethod) {
            params.SignatureMethod = this.profile.signMethod;
        }
        const signStr = this.formatSignString(params);
        params.Signature = sign_1.default.sign(credential.secretKey, signStr, this.profile.signMethod);
        return params;
    }
    /**
     * Format string for signature calculation
     * @param {RequestData} params Request parameters
     * @returns {string} String to be signed
     */
    formatSignString(params) {
        let strParam = "";
        const keys = Object.keys(params);
        keys.sort();
        for (const k in keys) {
            if (!keys.hasOwnProperty(k)) {
                continue;
            }
            //k = k.replace(/_/g, '.');
            strParam += "&" + keys[k] + "=" + params[keys[k]];
        }
        const strSign = this.profile.httpProfile.reqMethod.toLocaleUpperCase() +
            this.endpoint +
            this.path +
            "?" +
            strParam.slice(1);
        return strSign;
    }
}
exports.AbstractClient = AbstractClient;
