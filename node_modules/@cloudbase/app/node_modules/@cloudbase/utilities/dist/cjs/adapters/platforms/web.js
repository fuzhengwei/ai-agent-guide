"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRequest = exports.genAdapter = void 0;
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var util_1 = require("../../libs/util");
var common_1 = require("../../constants/common");
var WebRequest = (function (_super) {
    __extends(WebRequest, _super);
    function WebRequest(config) {
        var _this = _super.call(this) || this;
        var timeout = config.timeout, timeoutMsg = config.timeoutMsg, restrictedMethods = config.restrictedMethods;
        _this.timeout = timeout || 0;
        _this.timeoutMsg = timeoutMsg || '请求超时';
        _this.restrictedMethods = restrictedMethods || ['get', 'post', 'upload', 'download'];
        return _this;
    }
    WebRequest.prototype.get = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'get' }), this.restrictedMethods.includes('get'));
    };
    WebRequest.prototype.post = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'post' }), this.restrictedMethods.includes('post'));
    };
    WebRequest.prototype.put = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'put' }));
    };
    WebRequest.prototype.upload = function (options) {
        var data = options.data, file = options.file, name = options.name, method = options.method, _a = options.headers, headers = _a === void 0 ? {} : _a;
        var reqMethod = { post: 'post', put: 'put' }[method === null || method === void 0 ? void 0 : method.toLowerCase()] || 'put';
        var formData = new FormData();
        if (reqMethod === 'post') {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
            formData.append('key', name);
            formData.append('file', file);
            return this.request(__assign(__assign({}, options), { data: formData, method: reqMethod }), this.restrictedMethods.includes('upload'));
        }
        return this.request(__assign(__assign({}, options), { method: 'put', headers: headers, body: file }), this.restrictedMethods.includes('upload'));
    };
    WebRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, url, fileName, link, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.get(__assign(__assign({}, options), { headers: {}, responseType: 'blob' }))];
                    case 1:
                        data = (_a.sent()).data;
                        url = window.URL.createObjectURL(new Blob([data]));
                        fileName = decodeURIComponent(new URL(options.url).pathname.split('/').pop() || '');
                        link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(link);
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3, 3];
                    case 3: return [2, new Promise(function (resolve) {
                            resolve({
                                statusCode: 200,
                                tempFilePath: options.url,
                            });
                        })];
                }
            });
        });
    };
    WebRequest.prototype.fetch = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var abortController, url, _b, enableAbort, _c, stream, signal, _timeout, _d, shouldThrowOnError, timeout, timer, res;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        abortController = new AbortController();
                        url = options.url, _b = options.enableAbort, enableAbort = _b === void 0 ? false : _b, _c = options.stream, stream = _c === void 0 ? false : _c, signal = options.signal, _timeout = options.timeout, _d = options.shouldThrowOnError, shouldThrowOnError = _d === void 0 ? true : _d;
                        timeout = _timeout !== null && _timeout !== void 0 ? _timeout : this.timeout;
                        if (signal) {
                            if (signal.aborted)
                                abortController.abort();
                            signal.addEventListener('abort', function () { return abortController.abort(); });
                        }
                        timer = null;
                        if (enableAbort && timeout) {
                            timer = setTimeout(function () {
                                console.warn(_this.timeoutMsg);
                                abortController.abort(new Error(_this.timeoutMsg));
                            }, timeout);
                        }
                        return [4, fetch(url, __assign(__assign({}, options), { signal: abortController.signal }))
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            clearTimeout(timer);
                                            if (!shouldThrowOnError) return [3, 4];
                                            if (!response.ok) return [3, 1];
                                            _a = response;
                                            return [3, 3];
                                        case 1:
                                            _c = (_b = Promise).reject;
                                            return [4, response.json()];
                                        case 2:
                                            _a = _c.apply(_b, [_d.sent()]);
                                            _d.label = 3;
                                        case 3: return [2, _a];
                                        case 4: return [2, response];
                                    }
                                });
                            }); })
                                .catch(function (x) {
                                clearTimeout(timer);
                                return Promise.reject(x);
                            })];
                    case 1:
                        res = _e.sent();
                        return [2, {
                                data: stream ? res.body : ((_a = res.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('application/json')) ? res.json() : res.text(),
                                statusCode: res.status,
                                header: res.headers,
                                response: res,
                            }];
                }
            });
        });
    };
    WebRequest.prototype.request = function (options, enableAbort) {
        var _this = this;
        if (enableAbort === void 0) { enableAbort = false; }
        var method = String(options.method).toLowerCase() || 'get';
        return new Promise(function (resolve) {
            var url = options.url, _a = options.headers, headers = _a === void 0 ? {} : _a, data = options.data, responseType = options.responseType, withCredentials = options.withCredentials, body = options.body, onUploadProgress = options.onUploadProgress;
            var realUrl = (0, util_1.formatUrl)((0, common_1.getProtocol)(), url, method === 'get' ? data : {});
            var ajax = new XMLHttpRequest();
            ajax.open(method, realUrl);
            responseType && (ajax.responseType = responseType);
            var signal = options.signal;
            if (signal) {
                if (signal.aborted) {
                    ajax.abort();
                }
                else {
                    signal.addEventListener('abort', function () { return ajax.abort(); }, { once: true });
                }
            }
            Object.keys(headers).forEach(function (key) {
                ajax.setRequestHeader(key, headers[key]);
            });
            var timer;
            if (onUploadProgress) {
                ajax.upload.addEventListener('progress', onUploadProgress);
            }
            ajax.onreadystatechange = function () {
                var result = {};
                if (ajax.readyState === 4) {
                    var headers_1 = ajax.getAllResponseHeaders();
                    var arr = headers_1.trim().split(/[\r\n]+/);
                    var headerMap_1 = {};
                    arr.forEach(function (line) {
                        var parts = line.split(': ');
                        var header = parts.shift().toLowerCase();
                        var value = parts.join(': ');
                        headerMap_1[header] = value;
                    });
                    result.header = headerMap_1;
                    result.statusCode = ajax.status;
                    try {
                        result.data = responseType === 'blob' ? ajax.response : JSON.parse(ajax.responseText);
                    }
                    catch (e) {
                        result.data = responseType === 'blob' ? ajax.response : ajax.responseText;
                    }
                    clearTimeout(timer);
                    resolve(result);
                }
            };
            if (enableAbort && _this.timeout) {
                timer = setTimeout(function () {
                    console.warn(_this.timeoutMsg);
                    ajax.abort();
                }, _this.timeout);
            }
            var payload;
            if ((0, util_1.isFormData)(data)) {
                payload = data;
            }
            else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
                payload = (0, util_1.toQueryString)(data);
            }
            else if (body) {
                payload = body;
            }
            else {
                payload = data ? JSON.stringify(data) : undefined;
            }
            if (withCredentials) {
                ajax.withCredentials = true;
            }
            ajax.send(payload);
        });
    };
    return WebRequest;
}(adapter_interface_1.AbstractSDKRequest));
exports.WebRequest = WebRequest;
function genAdapter() {
    var adapter = {
        type: 'default',
        root: window,
        reqClass: WebRequest,
        wsClass: WebSocket,
        localStorage: localStorage,
    };
    return adapter;
}
exports.genAdapter = genAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFTcUM7QUFDckMsd0NBQXNFO0FBQ3RFLGlEQUFvRDtBQUtwRDtJQUF5Qiw4QkFBa0I7SUFPekMsb0JBQVksTUFBc0I7UUFBbEMsWUFDRSxpQkFBTyxTQUtSO1FBSlMsSUFBQSxPQUFPLEdBQW9DLE1BQU0sUUFBMUMsRUFBRSxVQUFVLEdBQXdCLE1BQU0sV0FBOUIsRUFBRSxpQkFBaUIsR0FBSyxNQUFNLGtCQUFYLENBQVc7UUFDekQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFBO1FBQzNCLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLE1BQU0sQ0FBQTtRQUN0QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTs7SUFDckYsQ0FBQztJQUNNLHdCQUFHLEdBQVYsVUFBVyxPQUF3QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLHVCQUVaLE9BQU8sS0FDVixNQUFNLEVBQUUsS0FBSyxLQUVmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ3ZDLENBQUE7SUFDSCxDQUFDO0lBQ00seUJBQUksR0FBWCxVQUFZLE9BQXdCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sdUJBRVosT0FBTyxLQUNWLE1BQU0sRUFBRSxNQUFNLEtBRWhCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3hDLENBQUE7SUFDSCxDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9B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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7YUFDbEQ7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUE7YUFDNUI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQTVPRCxDQUF5QixzQ0FBa0IsR0E0TzFDO0FBYW9CLGdDQUFVO0FBWC9CLFNBQVMsVUFBVTtJQUNqQixJQUFNLE9BQU8sR0FBb0Q7UUFDL0QsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFlBQVksY0FBQTtLQUNiLENBQUE7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTREtBZGFwdGVySW50ZXJmYWNlLFxuICBBYnN0cmFjdFNES1JlcXVlc3QsXG4gIElSZXF1ZXN0T3B0aW9ucyxcbiAgUmVzcG9uc2VPYmplY3QsXG4gIElVcGxvYWRSZXF1ZXN0T3B0aW9ucyxcbiAgSVJlcXVlc3RDb25maWcsXG4gIElSZXF1ZXN0TWV0aG9kLFxuICBJRmV0Y2hPcHRpb25zLFxufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgaXNGb3JtRGF0YSwgZm9ybWF0VXJsLCB0b1F1ZXJ5U3RyaW5nIH0gZnJvbSAnLi4vLi4vbGlicy91dGlsJ1xuaW1wb3J0IHsgZ2V0UHJvdG9jb2wgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbW9uJ1xuXG4vKipcbiAqIEBjbGFzcyBXZWJSZXF1ZXN0XG4gKi9cbmNsYXNzIFdlYlJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdFNES1JlcXVlc3Qge1xuICAvLyDpu5jorqTkuI3pmZDotoXml7ZcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lb3V0OiBudW1iZXJcbiAgLy8g6LaF5pe25o+Q56S65paH5qGIXG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dE1zZzogc3RyaW5nXG4gIC8vIOi2heaXtuWPl+mZkOivt+axguexu+Wei++8jOm7mOiupOaJgOacieivt+axguWdh+WPl+mZkFxuICBwcml2YXRlIHJlYWRvbmx5IHJlc3RyaWN0ZWRNZXRob2RzOiBBcnJheTxJUmVxdWVzdE1ldGhvZD5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUmVxdWVzdENvbmZpZykge1xuICAgIHN1cGVyKClcbiAgICBjb25zdCB7IHRpbWVvdXQsIHRpbWVvdXRNc2csIHJlc3RyaWN0ZWRNZXRob2RzIH0gPSBjb25maWdcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDBcbiAgICB0aGlzLnRpbWVvdXRNc2cgPSB0aW1lb3V0TXNnIHx8ICfor7fmsYLotoXml7YnXG4gICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcyA9IHJlc3RyaWN0ZWRNZXRob2RzIHx8IFsnZ2V0JywgJ3Bvc3QnLCAndXBsb2FkJywgJ2Rvd25sb2FkJ11cbiAgfVxuICBwdWJsaWMgZ2V0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgfSxcbiAgICAgIHRoaXMucmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ2dldCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICB9LFxuICAgICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcy5pbmNsdWRlcygncG9zdCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcHV0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwdXQnLFxuICAgIH0pXG4gIH1cbiAgcHVibGljIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgeyBkYXRhLCBmaWxlLCBuYW1lLCBtZXRob2QsIGhlYWRlcnMgPSB7fSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJlcU1ldGhvZCA9IHsgcG9zdDogJ3Bvc3QnLCBwdXQ6ICdwdXQnIH1bbWV0aG9kPy50b0xvd2VyQ2FzZSgpXSB8fCAncHV0J1xuICAgIC8vIOS4iuS8oOaWueW8j+S4unBvc3Tml7bvvIzpnIDovazmjaLkuLpGb3JtRGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgICBpZiAocmVxTWV0aG9kID09PSAncG9zdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pXG4gICAgICB9KVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdrZXknLCBuYW1lKVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgIG1ldGhvZDogcmVxTWV0aG9kLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogZmlsZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICApXG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5nZXQoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBoZWFkZXJzOiB7fSwgLy8g5LiL6L296LWE5rqQ6K+35rGC5LiN57uP6L+Hc2VydmljZe+8jGhlYWRlcua4heepulxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJyxcbiAgICAgIH0pXG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0pKVxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTChvcHRpb25zLnVybCkucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJylcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSlcbiAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG4gICAgICBsaW5rLmNsaWNrKClcbiAgICAgIC8vIOWbnuaUtuWGheWtmFxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICB0ZW1wRmlsZVBhdGg6IG9wdGlvbnMudXJsLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFzeW5jIGZldGNoKG9wdGlvbnM6IElGZXRjaE9wdGlvbnMgJiB7IHNob3VsZFRocm93T25FcnJvcj86IGJvb2xlYW4gfSk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICBjb25zdCB7IHVybCwgZW5hYmxlQWJvcnQgPSBmYWxzZSwgc3RyZWFtID0gZmFsc2UsIHNpZ25hbCwgdGltZW91dDogX3RpbWVvdXQsIHNob3VsZFRocm93T25FcnJvciA9IHRydWUgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IHRpbWVvdXQgPSBfdGltZW91dCA/PyB0aGlzLnRpbWVvdXRcblxuICAgIC8vIEZJWE1FKOWGheWtmOazhOa8jyk6IHsgb25jZTogdHJ1ZSB9IOWPquWcqCBhYm9ydCDkuovku7bjgJDop6blj5HlkI7jgJHmiY3op6Pnu5Hnm5HlkKzlmajjgIJcbiAgICAvLyAgIOWmguaenOivt+axguato+W4uOWujOaIkOOAgeS7juacqiBhYm9ydO+8jOivpeebkeWQrOWZqOS8muS4gOebtOaui+eVmeWcqOWklumDqCBzaWduYWwg5LiK44CCXG4gICAgLy8gICDlvZPosIPnlKjmlrnlpI3nlKjlkIzkuIDplb/nlJ/lkb3lkajmnJ8gc2lnbmFsIOWPjeWkjeWPkeivt+axguaXtu+8jOebkeWQrOWZqOS7jeS8muaMgee7ree0r+enr+OAglxuICAgIC8vICAg5qC55rK75pa55byP77ya5Zyo6K+35rGC57uT5p2f77yIZmluYWxsee+8ieaXtiByZW1vdmVFdmVudExpc3RlbmVyIOS4u+WKqOino+e7ke+8jFxuICAgIC8vICAg6ICM5LiN6IO95LuF5L6d6LWWIHsgb25jZTogdHJ1ZSB944CC5q2k5aSE5pqC5LuF6K6w5b2V77yM5LiN5pS55Yqo6YC76L6R44CCXG4gICAgaWYgKHNpZ25hbCkge1xuICAgICAgaWYgKHNpZ25hbC5hYm9ydGVkKSBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKVxuICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4gYWJvcnRDb250cm9sbGVyLmFib3J0KCkpXG4gICAgfVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIGlmIChlbmFibGVBYm9ydCAmJiB0aW1lb3V0KSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4odGhpcy50aW1lb3V0TXNnKVxuICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQobmV3IEVycm9yKHRoaXMudGltZW91dE1zZykpXG4gICAgICB9LCB0aW1lb3V0KVxuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICB9KVxuICAgICAgLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgaWYgKHNob3VsZFRocm93T25FcnJvcikge1xuICAgICAgICAgIC8vIDQwNCDnrYnnrYnkuZ/kvJrov5sgcmVzb2x2Ze+8jOaJgOS7peimgeWGjemAmui/hyBvayDliKTmlq1cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2sgPyByZXNwb25zZSA6IFByb21pc2UucmVqZWN0KGF3YWl0IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAvLyDkvKDovpPnuqflpLHotKXvvIjnvZHnu5zkuK3mlq3jgIFDT1JTIOmihOajgOiiq+aLkuOAgeivt+axguiiqyBhYm9ydCDnrYnvvInml7YgZmV0Y2gg5LyaIHJlamVjdO+8jFxuICAgICAgICAvLyDmraTml7bmsqHmnInlj6/op6PmnpDnmoQgUmVzcG9uc2XjgILml6Dorrogc2hvdWxkVGhyb3dPbkVycm9yIOWPluWAvOmDveW/hemhu+aKiuecn+WunumUmeivr+aKm+WHuu+8jFxuICAgICAgICAvLyDlkKbliJkgcmVzIOS8muWPmOaIkCB1bmRlZmluZWTvvIzkuIvmlrnor7vlj5YgcmVzLmhlYWRlcnMg5Lya5oqb5Ye65Luk5Lq66K+v6Kej55qEXG4gICAgICAgIC8vIFwiQ2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiB1bmRlZmluZWQgKHJlYWRpbmcgJ2hlYWRlcnMnKVwi77yM5o6p55uW55yf5q2j55qE6ZSZ6K+v5Y6f5Zug44CCXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh4KVxuICAgICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgIGRhdGE6IHN0cmVhbSA/IHJlcy5ib2R5IDogcmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKT8uaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSA/IHJlcy5qc29uKCkgOiByZXMudGV4dCgpLFxuICAgICAgc3RhdHVzQ29kZTogcmVzLnN0YXR1cyxcbiAgICAgIGhlYWRlcjogcmVzLmhlYWRlcnMsXG4gICAgICAvLyDpgI/lh7rljp/lp4sgUmVzcG9uc2XvvIzkvr/kuo7kuIrlsYLmjInpnIAgLmJsb2IoKSAvIC5hcnJheUJ1ZmZlcigpIC8g6K+75Y+WIGJvZHkg5rWB77yM6YG/5YWN5LqM5qyh5YyF6KOF44CCXG4gICAgICByZXNwb25zZTogcmVzLFxuICAgIH1cbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtJUmVxdWVzdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVBYm9ydCDmmK/lkKbotoXml7bkuK3mlq3or7fmsYJcbiAgICovXG4gIHByb3RlY3RlZCByZXF1ZXN0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucywgZW5hYmxlQWJvcnQgPSBmYWxzZSk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCBtZXRob2QgPSBTdHJpbmcob3B0aW9ucy5tZXRob2QpLnRvTG93ZXJDYXNlKCkgfHwgJ2dldCdcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHsgdXJsLCBoZWFkZXJzID0ge30sIGRhdGEsIHJlc3BvbnNlVHlwZSwgd2l0aENyZWRlbnRpYWxzLCBib2R5LCBvblVwbG9hZFByb2dyZXNzIH0gPSBvcHRpb25zXG4gICAgICBjb25zdCByZWFsVXJsID0gZm9ybWF0VXJsKGdldFByb3RvY29sKCksIHVybCwgbWV0aG9kID09PSAnZ2V0JyA/IGRhdGEgOiB7fSlcbiAgICAgIGNvbnN0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgYWpheC5vcGVuKG1ldGhvZCwgcmVhbFVybClcbiAgICAgIHJlc3BvbnNlVHlwZSAmJiAoYWpheC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUpXG4gICAgICAvLyDmlK/mjIHpgJrov4cgQWJvcnRTaWduYWwg5Y+W5raI6K+35rGC77ya5beyIGFib3J0IOeri+WNs+WPlua2iO+8m+WQpuWImeeUqCB7IG9uY2U6IHRydWUgfVxuICAgICAgLy8g55uR5ZCs77yM6Kem5Y+R5ZCO6Ieq5Yqo6Kej57uR77yM6YG/5YWN5aSN55So5ZCM5LiAIEFib3J0Q29udHJvbGxlciDlpJrmrKHor7fmsYLml7bntK/np6/nm5HlkKzlmajjgIJcbiAgICAgIC8vXG4gICAgICAvLyBGSVhNRSjlhoXlrZjms4TmvI8pOiB7IG9uY2U6IHRydWUgfSDlj6rlnKggYWJvcnQg5LqL5Lu244CQ6Kem5Y+R5ZCO44CR5omN6Kej57uR55uR5ZCs5Zmo44CCXG4gICAgICAvLyAgIOWmguaenOivt+axguato+W4uOWujOaIkOOAgeS7juacqiBhYm9ydO+8jOivpeebkeWQrOWZqOS8muS4gOebtOaui+eVmeWcqOWklumDqCBzaWduYWwg5LiK44CCXG4gICAgICAvLyAgIOW9k+iwg+eUqOaWueWkjeeUqOWQjOS4gOmVv+eUn+WRveWRqOacnyBzaWduYWwg5Y+N5aSN5Y+R6K+35rGC5pe277yM55uR5ZCs5Zmo5LuN5Lya5oyB57ut57Sv56ev44CCXG4gICAgICAvLyAgIOagueayu+aWueW8j++8muWcqOivt+axgue7k+adn++8iHJlYWR5U3RhdGU9PT00IC8gb25sb2FkZW5k77yJ5pe2IHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgIC8vICAg5Li75Yqo6Kej57uR77yM6ICM5LiN6IO95LuF5L6d6LWWIHsgb25jZTogdHJ1ZSB944CC5q2k5aSE5pqC5LuF6K6w5b2V77yM5LiN5pS55Yqo6YC76L6R44CCXG4gICAgICBjb25zdCBzaWduYWwgPSAob3B0aW9ucyBhcyBhbnkpLnNpZ25hbCBhcyBBYm9ydFNpZ25hbCB8IHVuZGVmaW5lZFxuICAgICAgaWYgKHNpZ25hbCkge1xuICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICBhamF4LmFib3J0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiBhamF4LmFib3J0KCksIHsgb25jZTogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgYWpheC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgfSlcbiAgICAgIGxldCB0aW1lclxuICAgICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgYWpheC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwbG9hZFByb2dyZXNzKVxuICAgICAgfVxuICAgICAgYWpheC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzcG9uc2VPYmplY3QgPSB7fVxuICAgICAgICBpZiAoYWpheC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IGFqYXguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgICBjb25zdCBhcnIgPSBoZWFkZXJzLnRyaW0oKS5zcGxpdCgvW1xcclxcbl0rLylcbiAgICAgICAgICAvLyBDcmVhdGUgYSBtYXAgb2YgaGVhZGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgIGNvbnN0IGhlYWRlck1hcCA9IHt9XG4gICAgICAgICAgYXJyLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgnOiAnKVxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gcGFydHMuc2hpZnQoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLmpvaW4oJzogJylcbiAgICAgICAgICAgIGhlYWRlck1hcFtoZWFkZXJdID0gdmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJlc3VsdC5oZWFkZXIgPSBoZWFkZXJNYXBcbiAgICAgICAgICByZXN1bHQuc3RhdHVzQ29kZSA9IGFqYXguc3RhdHVzXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOS4iuS8oHBvc3Tor7fmsYLov5Tlm57mlbDmja7moLzlvI/kuLp4bWzvvIzmraTlpITlrrnplJlcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gcmVzcG9uc2VUeXBlID09PSAnYmxvYicgPyBhamF4LnJlc3BvbnNlIDogSlNPTi5wYXJzZShhamF4LnJlc3BvbnNlVGV4dClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IHJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InID8gYWpheC5yZXNwb25zZSA6IGFqYXgucmVzcG9uc2VUZXh0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVuYWJsZUFib3J0ICYmIHRoaXMudGltZW91dCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzLnRpbWVvdXRNc2cpXG4gICAgICAgICAgYWpheC5hYm9ydCgpXG4gICAgICAgIH0sIHRoaXMudGltZW91dClcbiAgICAgIH1cbiAgICAgIC8vIOWkhOeQhiBwYXlsb2FkXG4gICAgICBsZXQgcGF5bG9hZFxuICAgICAgaWYgKGlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgLy8gRm9ybURhdGHvvIzkuI3lpITnkIZcbiAgICAgICAgcGF5bG9hZCA9IGRhdGFcbiAgICAgIH0gZWxzZSBpZiAoaGVhZGVyc1snY29udGVudC10eXBlJ10gPT09ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB7XG4gICAgICAgIHBheWxvYWQgPSB0b1F1ZXJ5U3RyaW5nKGRhdGEpXG4gICAgICB9IGVsc2UgaWYgKGJvZHkpIHtcbiAgICAgICAgcGF5bG9hZCA9IGJvZHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFtuWug+aDheWGtVxuICAgICAgICBwYXlsb2FkID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmICh3aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgYWpheC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG4gICAgICBhamF4LnNlbmQocGF5bG9hZClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGdlbkFkYXB0ZXIoKSB7XG4gIGNvbnN0IGFkYXB0ZXI6IFNES0FkYXB0ZXJJbnRlcmZhY2UgJiB7IHR5cGU/OiAnZGVmYXVsdCcgfCAnJyB9ID0ge1xuICAgIHR5cGU6ICdkZWZhdWx0JyxcbiAgICByb290OiB3aW5kb3csXG4gICAgcmVxQ2xhc3M6IFdlYlJlcXVlc3QsXG4gICAgd3NDbGFzczogV2ViU29ja2V0LFxuICAgIGxvY2FsU3RvcmFnZSxcbiAgfVxuICByZXR1cm4gYWRhcHRlclxufVxuXG5leHBvcnQgeyBnZW5BZGFwdGVyLCBXZWJSZXF1ZXN0IH1cbiJdfQ==