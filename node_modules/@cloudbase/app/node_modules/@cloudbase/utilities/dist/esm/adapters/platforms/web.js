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
import { AbstractSDKRequest, } from '@cloudbase/adapter-interface';
import { isFormData, formatUrl, toQueryString } from '../../libs/util';
import { getProtocol } from '../../constants/common';
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
            var realUrl = formatUrl(getProtocol(), url, method === 'get' ? data : {});
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
            if (isFormData(data)) {
                payload = data;
            }
            else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
                payload = toQueryString(data);
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
}(AbstractSDKRequest));
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
export { genAdapter, WebRequest };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBRUwsa0JBQWtCLEdBT25CLE1BQU0sOEJBQThCLENBQUE7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBS3BEO0lBQXlCLDhCQUFrQjtJQU96QyxvQkFBWSxNQUFzQjtRQUFsQyxZQUNFLGlCQUFPLFNBS1I7UUFKUyxJQUFBLE9BQU8sR0FBb0MsTUFBTSxRQUExQyxFQUFFLFVBQVUsR0FBd0IsTUFBTSxXQUE5QixFQUFFLGlCQUFpQixHQUFLLE1BQU0sa0JBQVgsQ0FBVztRQUN6RCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUE7UUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFBO1FBQ3RDLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFBOztJQUNyRixDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9BQXdCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sdUJBRVosT0FBTyxLQUNWLE1BQU0sRUFBRSxLQUFLLEtBRWYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDdkMsQ0FBQTtJQUNILENBQUM7SUFDTSx5QkFBSSxHQUFYLFVBQVksT0FBd0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsT0FBTyx1QkFFWixPQUFPLEtB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QU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQTthQUNmO2lCQUFNO2dCQUVMLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTthQUNsRDtZQUVELElBQUksZUFBZSxFQUFFO2dCQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTthQUM1QjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBNU9ELENBQXlCLGtCQUFrQixHQTRPMUM7QUFFRCxTQUFTLFVBQVU7SUFDakIsSUFBTSxPQUFPLEdBQW9EO1FBQy9ELElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixZQUFZLGNBQUE7S0FDYixDQUFBO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQztBQUVELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTREtBZGFwdGVySW50ZXJmYWNlLFxuICBBYnN0cmFjdFNES1JlcXVlc3QsXG4gIElSZXF1ZXN0T3B0aW9ucyxcbiAgUmVzcG9uc2VPYmplY3QsXG4gIElVcGxvYWRSZXF1ZXN0T3B0aW9ucyxcbiAgSVJlcXVlc3RDb25maWcsXG4gIElSZXF1ZXN0TWV0aG9kLFxuICBJRmV0Y2hPcHRpb25zLFxufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgaXNGb3JtRGF0YSwgZm9ybWF0VXJsLCB0b1F1ZXJ5U3RyaW5nIH0gZnJvbSAnLi4vLi4vbGlicy91dGlsJ1xuaW1wb3J0IHsgZ2V0UHJvdG9jb2wgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbW9uJ1xuXG4vKipcbiAqIEBjbGFzcyBXZWJSZXF1ZXN0XG4gKi9cbmNsYXNzIFdlYlJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdFNES1JlcXVlc3Qge1xuICAvLyDpu5jorqTkuI3pmZDotoXml7ZcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lb3V0OiBudW1iZXJcbiAgLy8g6LaF5pe25o+Q56S65paH5qGIXG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dE1zZzogc3RyaW5nXG4gIC8vIOi2heaXtuWPl+mZkOivt+axguexu+Wei++8jOm7mOiupOaJgOacieivt+axguWdh+WPl+mZkFxuICBwcml2YXRlIHJlYWRvbmx5IHJlc3RyaWN0ZWRNZXRob2RzOiBBcnJheTxJUmVxdWVzdE1ldGhvZD5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUmVxdWVzdENvbmZpZykge1xuICAgIHN1cGVyKClcbiAgICBjb25zdCB7IHRpbWVvdXQsIHRpbWVvdXRNc2csIHJlc3RyaWN0ZWRNZXRob2RzIH0gPSBjb25maWdcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDBcbiAgICB0aGlzLnRpbWVvdXRNc2cgPSB0aW1lb3V0TXNnIHx8ICfor7fmsYLotoXml7YnXG4gICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcyA9IHJlc3RyaWN0ZWRNZXRob2RzIHx8IFsnZ2V0JywgJ3Bvc3QnLCAndXBsb2FkJywgJ2Rvd25sb2FkJ11cbiAgfVxuICBwdWJsaWMgZ2V0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgfSxcbiAgICAgIHRoaXMucmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ2dldCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICB9LFxuICAgICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcy5pbmNsdWRlcygncG9zdCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcHV0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwdXQnLFxuICAgIH0pXG4gIH1cbiAgcHVibGljIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgeyBkYXRhLCBmaWxlLCBuYW1lLCBtZXRob2QsIGhlYWRlcnMgPSB7fSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJlcU1ldGhvZCA9IHsgcG9zdDogJ3Bvc3QnLCBwdXQ6ICdwdXQnIH1bbWV0aG9kPy50b0xvd2VyQ2FzZSgpXSB8fCAncHV0J1xuICAgIC8vIOS4iuS8oOaWueW8j+S4unBvc3Tml7bvvIzpnIDovazmjaLkuLpGb3JtRGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgICBpZiAocmVxTWV0aG9kID09PSAncG9zdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pXG4gICAgICB9KVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdrZXknLCBuYW1lKVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgIG1ldGhvZDogcmVxTWV0aG9kLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogZmlsZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICApXG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5nZXQoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBoZWFkZXJzOiB7fSwgLy8g5LiL6L296LWE5rqQ6K+35rGC5LiN57uP6L+Hc2VydmljZe+8jGhlYWRlcua4heepulxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJyxcbiAgICAgIH0pXG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0pKVxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTChvcHRpb25zLnVybCkucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJylcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSlcbiAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG4gICAgICBsaW5rLmNsaWNrKClcbiAgICAgIC8vIOWbnuaUtuWGheWtmFxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICB0ZW1wRmlsZVBhdGg6IG9wdGlvbnMudXJsLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFzeW5jIGZldGNoKG9wdGlvbnM6IElGZXRjaE9wdGlvbnMgJiB7IHNob3VsZFRocm93T25FcnJvcj86IGJvb2xlYW4gfSk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICBjb25zdCB7IHVybCwgZW5hYmxlQWJvcnQgPSBmYWxzZSwgc3RyZWFtID0gZmFsc2UsIHNpZ25hbCwgdGltZW91dDogX3RpbWVvdXQsIHNob3VsZFRocm93T25FcnJvciA9IHRydWUgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IHRpbWVvdXQgPSBfdGltZW91dCA/PyB0aGlzLnRpbWVvdXRcblxuICAgIC8vIEZJWE1FKOWGheWtmOazhOa8jyk6IHsgb25jZTogdHJ1ZSB9IOWPquWcqCBhYm9ydCDkuovku7bjgJDop6blj5HlkI7jgJHmiY3op6Pnu5Hnm5HlkKzlmajjgIJcbiAgICAvLyAgIOWmguaenOivt+axguato+W4uOWujOaIkOOAgeS7juacqiBhYm9ydO+8jOivpeebkeWQrOWZqOS8muS4gOebtOaui+eVmeWcqOWklumDqCBzaWduYWwg5LiK44CCXG4gICAgLy8gICDlvZPosIPnlKjmlrnlpI3nlKjlkIzkuIDplb/nlJ/lkb3lkajmnJ8gc2lnbmFsIOWPjeWkjeWPkeivt+axguaXtu+8jOebkeWQrOWZqOS7jeS8muaMgee7ree0r+enr+OAglxuICAgIC8vICAg5qC55rK75pa55byP77ya5Zyo6K+35rGC57uT5p2f77yIZmluYWxsee+8ieaXtiByZW1vdmVFdmVudExpc3RlbmVyIOS4u+WKqOino+e7ke+8jFxuICAgIC8vICAg6ICM5LiN6IO95LuF5L6d6LWWIHsgb25jZTogdHJ1ZSB944CC5q2k5aSE5pqC5LuF6K6w5b2V77yM5LiN5pS55Yqo6YC76L6R44CCXG4gICAgaWYgKHNpZ25hbCkge1xuICAgICAgaWYgKHNpZ25hbC5hYm9ydGVkKSBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKVxuICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4gYWJvcnRDb250cm9sbGVyLmFib3J0KCkpXG4gICAgfVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbFxuICAgIGlmIChlbmFibGVBYm9ydCAmJiB0aW1lb3V0KSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4odGhpcy50aW1lb3V0TXNnKVxuICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQobmV3IEVycm9yKHRoaXMudGltZW91dE1zZykpXG4gICAgICB9LCB0aW1lb3V0KVxuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICB9KVxuICAgICAgLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgaWYgKHNob3VsZFRocm93T25FcnJvcikge1xuICAgICAgICAgIC8vIDQwNCDnrYnnrYnkuZ/kvJrov5sgcmVzb2x2Ze+8jOaJgOS7peimgeWGjemAmui/hyBvayDliKTmlq1cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2sgPyByZXNwb25zZSA6IFByb21pc2UucmVqZWN0KGF3YWl0IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAvLyDkvKDovpPnuqflpLHotKXvvIjnvZHnu5zkuK3mlq3jgIFDT1JTIOmihOajgOiiq+aLkuOAgeivt+axguiiqyBhYm9ydCDnrYnvvInml7YgZmV0Y2gg5LyaIHJlamVjdO+8jFxuICAgICAgICAvLyDmraTml7bmsqHmnInlj6/op6PmnpDnmoQgUmVzcG9uc2XjgILml6Dorrogc2hvdWxkVGhyb3dPbkVycm9yIOWPluWAvOmDveW/hemhu+aKiuecn+WunumUmeivr+aKm+WHuu+8jFxuICAgICAgICAvLyDlkKbliJkgcmVzIOS8muWPmOaIkCB1bmRlZmluZWTvvIzkuIvmlrnor7vlj5YgcmVzLmhlYWRlcnMg5Lya5oqb5Ye65Luk5Lq66K+v6Kej55qEXG4gICAgICAgIC8vIFwiQ2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiB1bmRlZmluZWQgKHJlYWRpbmcgJ2hlYWRlcnMnKVwi77yM5o6p55uW55yf5q2j55qE6ZSZ6K+v5Y6f5Zug44CCXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh4KVxuICAgICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgIGRhdGE6IHN0cmVhbSA/IHJlcy5ib2R5IDogcmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKT8uaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSA/IHJlcy5qc29uKCkgOiByZXMudGV4dCgpLFxuICAgICAgc3RhdHVzQ29kZTogcmVzLnN0YXR1cyxcbiAgICAgIGhlYWRlcjogcmVzLmhlYWRlcnMsXG4gICAgICAvLyDpgI/lh7rljp/lp4sgUmVzcG9uc2XvvIzkvr/kuo7kuIrlsYLmjInpnIAgLmJsb2IoKSAvIC5hcnJheUJ1ZmZlcigpIC8g6K+75Y+WIGJvZHkg5rWB77yM6YG/5YWN5LqM5qyh5YyF6KOF44CCXG4gICAgICByZXNwb25zZTogcmVzLFxuICAgIH1cbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtJUmVxdWVzdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVBYm9ydCDmmK/lkKbotoXml7bkuK3mlq3or7fmsYJcbiAgICovXG4gIHByb3RlY3RlZCByZXF1ZXN0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucywgZW5hYmxlQWJvcnQgPSBmYWxzZSk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCBtZXRob2QgPSBTdHJpbmcob3B0aW9ucy5tZXRob2QpLnRvTG93ZXJDYXNlKCkgfHwgJ2dldCdcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHsgdXJsLCBoZWFkZXJzID0ge30sIGRhdGEsIHJlc3BvbnNlVHlwZSwgd2l0aENyZWRlbnRpYWxzLCBib2R5LCBvblVwbG9hZFByb2dyZXNzIH0gPSBvcHRpb25zXG4gICAgICBjb25zdCByZWFsVXJsID0gZm9ybWF0VXJsKGdldFByb3RvY29sKCksIHVybCwgbWV0aG9kID09PSAnZ2V0JyA/IGRhdGEgOiB7fSlcbiAgICAgIGNvbnN0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgYWpheC5vcGVuKG1ldGhvZCwgcmVhbFVybClcbiAgICAgIHJlc3BvbnNlVHlwZSAmJiAoYWpheC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUpXG4gICAgICAvLyDmlK/mjIHpgJrov4cgQWJvcnRTaWduYWwg5Y+W5raI6K+35rGC77ya5beyIGFib3J0IOeri+WNs+WPlua2iO+8m+WQpuWImeeUqCB7IG9uY2U6IHRydWUgfVxuICAgICAgLy8g55uR5ZCs77yM6Kem5Y+R5ZCO6Ieq5Yqo6Kej57uR77yM6YG/5YWN5aSN55So5ZCM5LiAIEFib3J0Q29udHJvbGxlciDlpJrmrKHor7fmsYLml7bntK/np6/nm5HlkKzlmajjgIJcbiAgICAgIC8vXG4gICAgICAvLyBGSVhNRSjlhoXlrZjms4TmvI8pOiB7IG9uY2U6IHRydWUgfSDlj6rlnKggYWJvcnQg5LqL5Lu244CQ6Kem5Y+R5ZCO44CR5omN6Kej57uR55uR5ZCs5Zmo44CCXG4gICAgICAvLyAgIOWmguaenOivt+axguato+W4uOWujOaIkOOAgeS7juacqiBhYm9ydO+8jOivpeebkeWQrOWZqOS8muS4gOebtOaui+eVmeWcqOWklumDqCBzaWduYWwg5LiK44CCXG4gICAgICAvLyAgIOW9k+iwg+eUqOaWueWkjeeUqOWQjOS4gOmVv+eUn+WRveWRqOacnyBzaWduYWwg5Y+N5aSN5Y+R6K+35rGC5pe277yM55uR5ZCs5Zmo5LuN5Lya5oyB57ut57Sv56ev44CCXG4gICAgICAvLyAgIOagueayu+aWueW8j++8muWcqOivt+axgue7k+adn++8iHJlYWR5U3RhdGU9PT00IC8gb25sb2FkZW5k77yJ5pe2IHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgIC8vICAg5Li75Yqo6Kej57uR77yM6ICM5LiN6IO95LuF5L6d6LWWIHsgb25jZTogdHJ1ZSB944CC5q2k5aSE5pqC5LuF6K6w5b2V77yM5LiN5pS55Yqo6YC76L6R44CCXG4gICAgICBjb25zdCBzaWduYWwgPSAob3B0aW9ucyBhcyBhbnkpLnNpZ25hbCBhcyBBYm9ydFNpZ25hbCB8IHVuZGVmaW5lZFxuICAgICAgaWYgKHNpZ25hbCkge1xuICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICBhamF4LmFib3J0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiBhamF4LmFib3J0KCksIHsgb25jZTogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgYWpheC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgfSlcbiAgICAgIGxldCB0aW1lclxuICAgICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgYWpheC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwbG9hZFByb2dyZXNzKVxuICAgICAgfVxuICAgICAgYWpheC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogUmVzcG9uc2VPYmplY3QgPSB7fVxuICAgICAgICBpZiAoYWpheC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IGFqYXguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgICBjb25zdCBhcnIgPSBoZWFkZXJzLnRyaW0oKS5zcGxpdCgvW1xcclxcbl0rLylcbiAgICAgICAgICAvLyBDcmVhdGUgYSBtYXAgb2YgaGVhZGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgIGNvbnN0IGhlYWRlck1hcCA9IHt9XG4gICAgICAgICAgYXJyLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgnOiAnKVxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gcGFydHMuc2hpZnQoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLmpvaW4oJzogJylcbiAgICAgICAgICAgIGhlYWRlck1hcFtoZWFkZXJdID0gdmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJlc3VsdC5oZWFkZXIgPSBoZWFkZXJNYXBcbiAgICAgICAgICByZXN1bHQuc3RhdHVzQ29kZSA9IGFqYXguc3RhdHVzXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOS4iuS8oHBvc3Tor7fmsYLov5Tlm57mlbDmja7moLzlvI/kuLp4bWzvvIzmraTlpITlrrnplJlcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gcmVzcG9uc2VUeXBlID09PSAnYmxvYicgPyBhamF4LnJlc3BvbnNlIDogSlNPTi5wYXJzZShhamF4LnJlc3BvbnNlVGV4dClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IHJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InID8gYWpheC5yZXNwb25zZSA6IGFqYXgucmVzcG9uc2VUZXh0XG4gICAgICAgICAgfVxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVuYWJsZUFib3J0ICYmIHRoaXMudGltZW91dCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzLnRpbWVvdXRNc2cpXG4gICAgICAgICAgYWpheC5hYm9ydCgpXG4gICAgICAgIH0sIHRoaXMudGltZW91dClcbiAgICAgIH1cbiAgICAgIC8vIOWkhOeQhiBwYXlsb2FkXG4gICAgICBsZXQgcGF5bG9hZFxuICAgICAgaWYgKGlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgLy8gRm9ybURhdGHvvIzkuI3lpITnkIZcbiAgICAgICAgcGF5bG9hZCA9IGRhdGFcbiAgICAgIH0gZWxzZSBpZiAoaGVhZGVyc1snY29udGVudC10eXBlJ10gPT09ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB7XG4gICAgICAgIHBheWxvYWQgPSB0b1F1ZXJ5U3RyaW5nKGRhdGEpXG4gICAgICB9IGVsc2UgaWYgKGJvZHkpIHtcbiAgICAgICAgcGF5bG9hZCA9IGJvZHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFtuWug+aDheWGtVxuICAgICAgICBwYXlsb2FkID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmICh3aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgYWpheC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG4gICAgICBhamF4LnNlbmQocGF5bG9hZClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGdlbkFkYXB0ZXIoKSB7XG4gIGNvbnN0IGFkYXB0ZXI6IFNES0FkYXB0ZXJJbnRlcmZhY2UgJiB7IHR5cGU/OiAnZGVmYXVsdCcgfCAnJyB9ID0ge1xuICAgIHR5cGU6ICdkZWZhdWx0JyxcbiAgICByb290OiB3aW5kb3csXG4gICAgcmVxQ2xhc3M6IFdlYlJlcXVlc3QsXG4gICAgd3NDbGFzczogV2ViU29ja2V0LFxuICAgIGxvY2FsU3RvcmFnZSxcbiAgfVxuICByZXR1cm4gYWRhcHRlclxufVxuXG5leHBvcnQgeyBnZW5BZGFwdGVyLCBXZWJSZXF1ZXN0IH1cbiJdfQ==