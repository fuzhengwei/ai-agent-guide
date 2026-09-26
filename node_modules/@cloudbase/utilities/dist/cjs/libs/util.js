"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCaptcha = exports.parseQueryString = exports.transformPhone = exports.sleep = exports.printGroupLog = exports.throwError = exports.printInfo = exports.printError = exports.printWarn = exports.execCallback = exports.createPromiseCallback = exports.removeParam = exports.getHash = exports.getQuery = exports.toQueryString = exports.formatUrl = exports.generateRequestId = exports.genSeqId = exports.isFormData = exports.isInstanceOf = exports.isNull = exports.isPalinObject = exports.isUndefined = exports.isString = exports.isArray = void 0;
var constants_1 = require("../constants");
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
exports.isArray = isArray;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
function isUndefined(val) {
    return typeof val === 'undefined';
}
exports.isUndefined = isUndefined;
function isPalinObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
exports.isPalinObject = isPalinObject;
function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
}
exports.isNull = isNull;
function isInstanceOf(instance, construct) {
    return instance instanceof construct;
}
exports.isInstanceOf = isInstanceOf;
function isFormData(val) {
    return Object.prototype.toString.call(val) === '[object FormData]';
}
exports.isFormData = isFormData;
function genSeqId() {
    return Math.random().toString(16)
        .slice(2);
}
exports.genSeqId = genSeqId;
function generateRequestId() {
    var d = new Date().getTime();
    var d2 = ((Date === null || Date === void 0 ? void 0 : Date.now) && Date.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
}
exports.generateRequestId = generateRequestId;
function formatUrl(PROTOCOL, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    Object.keys(query).forEach(function (key) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += "".concat(key, "=").concat(encodeURIComponent(query[key]));
    });
    url += queryString;
    if (/^http(s)?:\/\//.test(url)) {
        return url;
    }
    return "".concat(PROTOCOL).concat(url);
}
exports.formatUrl = formatUrl;
function toQueryString(query) {
    if (query === void 0) { query = {}; }
    var queryString = [];
    Object.keys(query).forEach(function (key) {
        queryString.push("".concat(key, "=").concat(encodeURIComponent(query[key])));
    });
    return queryString.join('&');
}
exports.toQueryString = toQueryString;
function getQuery(name, url) {
    if (typeof window === 'undefined') {
        return false;
    }
    var u = url || decodeURIComponent(window.location.search);
    var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"));
    var r = u.substr(u.indexOf('?') + 1).match(reg);
    return r !== null && r !== undefined ? r[2] : '';
}
exports.getQuery = getQuery;
var getHash = function (name) {
    if (typeof window === 'undefined') {
        return '';
    }
    var matches = window.location.hash.match(new RegExp("[#?&/]".concat(name, "=([^&#]*)")));
    return matches ? matches[1] : '';
};
exports.getHash = getHash;
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split('?')[0];
    var param;
    var params = [];
    var queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params = queryString.split('&');
        for (var i = params.length - 1; i >= 0; i -= 1) {
            param = params[i].split('=')[0];
            if (param === key) {
                params.splice(i, 1);
            }
        }
        rtn = "".concat(rtn, "?").concat(params.join('&'));
    }
    return rtn;
}
exports.removeParam = removeParam;
function createPromiseCallback() {
    var cb = {};
    if (!Promise) {
        cb = function () { };
        cb.promise = {};
        var throwPromiseNotDefined = function () {
            throw new Error('Your Node runtime does support ES6 Promises. '
                + 'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    var promise = new Promise(function (resolve, reject) {
        cb = function (err, data) {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
}
exports.createPromiseCallback = createPromiseCallback;
function execCallback(fn, err, data) {
    if (data === void 0) { data = null; }
    if (fn && typeof fn === 'function') {
        return fn(err, data);
    }
    if (err) {
        throw err;
    }
    return data;
}
exports.execCallback = execCallback;
function printWarn(error, msg) {
    console.warn("[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg));
}
exports.printWarn = printWarn;
function printError(error, msg) {
    console.error({
        code: error,
        msg: "[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg),
    });
}
exports.printError = printError;
function printInfo(error, msg) {
    console.log("[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg));
}
exports.printInfo = printInfo;
function throwError(error, msg) {
    throw new Error(JSON.stringify({
        code: error,
        msg: "[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg),
    }));
}
exports.throwError = throwError;
function printGroupLog(options) {
    var _a;
    var title = options.title, _b = options.subtitle, subtitle = _b === void 0 ? '' : _b, _c = options.content, content = _c === void 0 ? [] : _c, _d = options.printTrace, printTrace = _d === void 0 ? false : _d, _e = options.collapsed, collapsed = _e === void 0 ? false : _e;
    if (collapsed) {
        (console.groupCollapsed || console.error)(title, subtitle);
    }
    else {
        (console.group || console.error)(title, subtitle);
    }
    for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
        var tip = content_1[_i];
        var type = tip.type, body = tip.body;
        switch (type) {
            case 'info':
                console.log(body);
                break;
            case 'warn':
                console.warn(body);
                break;
            case 'error':
                console.error(body);
                break;
        }
    }
    if (printTrace) {
        (console.trace || console.log)('stack trace:');
    }
    (_a = console.groupEnd) === null || _a === void 0 ? void 0 : _a.call(console);
}
exports.printGroupLog = printGroupLog;
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
exports.sleep = sleep;
function transformPhone(phoneNumber) {
    return "+86".concat(phoneNumber);
}
exports.transformPhone = transformPhone;
var parseQueryString = function (queryString) {
    queryString = queryString.replace(/^\?/, '');
    var params = {};
    var pairs = queryString.split('&');
    pairs.forEach(function (item) {
        var _a = item.split('='), key = _a[0], value = _a[1];
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        if (key) {
            if (params[key]) {
                if (Array.isArray(params[key])) {
                    params[key].push(value);
                }
                else {
                    params[key] = [params[key], value];
                }
            }
            else {
                params[key] = value;
            }
        }
    });
    return params;
};
exports.parseQueryString = parseQueryString;
function parseCaptcha(url) {
    var queryObj = {};
    var matched = url.match(/^(data:.*?)(\?[^#\s]*)?$/);
    if (matched) {
        url = matched[1];
        var search = matched[2];
        if (search) {
            queryObj = (0, exports.parseQueryString)(search);
        }
    }
    var token = queryObj.token, restQueryObj = __rest(queryObj, ["token"]);
    if (/^data:/.test(url) && !token) {
        return {
            error: 'invalid_argument',
            error_description: "invalid captcha data: ".concat(url),
        };
    }
    if (!token) {
        return {
            error: 'unimplemented',
            error_description: 'need to impl captcha data',
        };
    }
    return {
        state: restQueryObj.state,
        token: token,
        captchaData: url,
    };
}
exports.parseCaptcha = parseCaptcha;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBeUM7QUFFekMsU0FBZ0IsT0FBTyxDQUFDLEdBQVE7SUFDOUIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLENBQUE7QUFDakUsQ0FBQztBQUZELDBCQUVDO0FBQ0QsU0FBZ0IsUUFBUSxDQUFDLEdBQVE7SUFDL0IsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUE7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBQ0QsU0FBZ0IsV0FBVyxDQUFDLEdBQVE7SUFDbEMsT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUE7QUFDbkMsQ0FBQztBQUZELGtDQUVDO0FBQ0QsU0FBZ0IsYUFBYSxDQUFDLEdBQVE7SUFDcEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssaUJBQWlCLENBQUE7QUFDbEUsQ0FBQztBQUZELHNDQUVDO0FBQ0QsU0FBZ0IsTUFBTSxDQUFDLEdBQVE7SUFDN0IsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBZSxDQUFBO0FBQ2hFLENBQUM7QUFGRCx3QkFFQztBQUNELFNBQWdCLFlBQVksQ0FBQyxRQUFhLEVBQUUsU0FBYztJQUN4RCxPQUFPLFFBQVEsWUFBWSxTQUFTLENBQUE7QUFDdEMsQ0FBQztBQUZELG9DQUVDO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLEdBQVE7SUFDakMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssbUJBQW1CLENBQUE7QUFDcEUsQ0FBQztBQUZELGdDQUVDO0FBQ0Qs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MEJBQTBCLENBQUMsQ0FBQTtJQUNyRCxJQUFJLE9BQU8sRUFBRTtRQUVYLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLElBQUksTUFBTSxFQUFFO1lBQ1YsUUFBUSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUE7U0FDcEM7S0FDRjtJQUNPLElBQUEsS0FBSyxHQUFzQixRQUFRLE1BQTlCLEVBQUssWUFBWSxVQUFLLFFBQVEsRUFBckMsU0FBMEIsQ0FBRixDQUFhO0lBQzNDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNoQyxPQUFPO1lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixpQkFBaUIsRUFBRSxnQ0FBeUIsR0FBRyxDQUFFO1NBQ2xELENBQUE7S0FDRjtJQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPO1lBQ0wsS0FBSyxFQUFFLGVBQWU7WUFDdEIsaUJBQWlCLEVBQUUsMkJBQTJCO1NBQy9DLENBQUE7S0FDRjtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7UUFDekIsS0FBSyxPQUFBO1FBQ0wsV0FBVyxFQUFFLEdBQUc7S0FDakIsQ0FBQTtBQUNILENBQUM7QUE5QkQsb0NBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS1YgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJ1xuaW1wb3J0IHsgZ2V0U2RrTmFtZSB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nXG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnXG59XG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnXG59XG5leHBvcnQgZnVuY3Rpb24gaXNQYWxpbk9iamVjdCh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgTnVsbF0nXG59XG5leHBvcnQgZnVuY3Rpb24gaXNJbnN0YW5jZU9mKGluc3RhbmNlOiBhbnksIGNvbnN0cnVjdDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIGNvbnN0cnVjdFxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRm9ybURhdGEodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGb3JtRGF0YV0nXG59XG5leHBvcnQgZnVuY3Rpb24gZ2VuU2VxSWQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpXG4gICAgLnNsaWNlKDIpXG59XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVSZXF1ZXN0SWQoKSB7XG4gIGxldCBkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgbGV0IGQyID0gKERhdGU/Lm5vdyAmJiBEYXRlLm5vdygpICogMTAwMCkgfHwgMFxuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2XG4gICAgaWYgKGQgPiAwKSB7XG4gICAgICByID0gKGQgKyByKSAlIDE2IHwgMFxuICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KVxuICAgIH0gZWxzZSB7XG4gICAgICByID0gKGQyICsgcikgJSAxNiB8IDBcbiAgICAgIGQyID0gTWF0aC5mbG9vcihkMiAvIDE2KVxuICAgIH1cbiAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4NykgfCAweDgpLnRvU3RyaW5nKDE2KVxuICB9KVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFVybChQUk9UT0NPTDogc3RyaW5nLCB1cmw6IHN0cmluZywgcXVlcnk6IEtWPGFueT4gPSB7fSk6IHN0cmluZyB7XG4gIGNvbnN0IHVybEhhc1F1ZXJ5ID0gL1xcPy8udGVzdCh1cmwpXG4gIGxldCBxdWVyeVN0cmluZyA9ICcnXG4gIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAocXVlcnlTdHJpbmcgPT09ICcnKSB7XG4gICAgICAhdXJsSGFzUXVlcnkgJiYgKHVybCArPSAnPycpXG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXJ5U3RyaW5nICs9ICcmJ1xuICAgIH1cbiAgICBxdWVyeVN0cmluZyArPSBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5W2tleV0pfWBcbiAgfSlcbiAgdXJsICs9IHF1ZXJ5U3RyaW5nXG4gIGlmICgvXmh0dHAocyk/OlxcL1xcLy8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIHVybFxuICB9XG4gIHJldHVybiBgJHtQUk9UT0NPTH0ke3VybH1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1F1ZXJ5U3RyaW5nKHF1ZXJ5OiBLVjxhbnk+ID0ge30pIHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBbXVxuICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgcXVlcnlTdHJpbmcucHVzaChgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5W2tleV0pfWApXG4gIH0pXG4gIHJldHVybiBxdWVyeVN0cmluZy5qb2luKCcmJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5KG5hbWU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIC8vIOWPguaVsO+8muWPmOmHj+WQje+8jHVybOS4uuepuuWImeihqOS7juW9k+WJjemhtemdoueahHVybOS4reWPllxuICBjb25zdCB1ID0gdXJsIHx8IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxuICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGAoXnwmKSR7bmFtZX09KFteJl0qKSgmfCQpYClcbiAgY29uc3QgciA9IHUuc3Vic3RyKHUuaW5kZXhPZignPycpICsgMSkubWF0Y2gocmVnKVxuICByZXR1cm4gciAhPT0gbnVsbCAmJiByICE9PSB1bmRlZmluZWQgPyByWzJdIDogJydcbn1cblxuZXhwb3J0IGNvbnN0IGdldEhhc2ggPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAnJ1xuICB9XG4gIGNvbnN0IG1hdGNoZXMgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaChuZXcgUmVnRXhwKGBbIz8mL10ke25hbWV9PShbXiYjXSopYCkpXG4gIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQYXJhbShrZXk6IHN0cmluZywgc291cmNlVVJMOiBzdHJpbmcpIHtcbiAgbGV0IHJ0biA9IHNvdXJjZVVSTC5zcGxpdCgnPycpWzBdXG4gIGxldCBwYXJhbVxuICBsZXQgcGFyYW1zID0gW11cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzb3VyY2VVUkwuaW5kZXhPZignPycpICE9PSAtMSA/IHNvdXJjZVVSTC5zcGxpdCgnPycpWzFdIDogJydcbiAgaWYgKHF1ZXJ5U3RyaW5nICE9PSAnJykge1xuICAgIHBhcmFtcyA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCcmJylcbiAgICBmb3IgKGxldCBpID0gcGFyYW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgIHBhcmFtID0gcGFyYW1zW2ldLnNwbGl0KCc9JylbMF1cbiAgICAgIGlmIChwYXJhbSA9PT0ga2V5KSB7XG4gICAgICAgIHBhcmFtcy5zcGxpY2UoaSwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgcnRuID0gYCR7cnRufT8ke3BhcmFtcy5qb2luKCcmJyl9YFxuICB9XG4gIHJldHVybiBydG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb21pc2VDYWxsYmFjaygpIHtcbiAgbGV0IGNiOiBhbnkgPSB7fVxuICBpZiAoIVByb21pc2UpIHtcbiAgICBjYiA9ICgpID0+IHt9XG4gICAgY2IucHJvbWlzZSA9IHt9XG5cbiAgICBjb25zdCB0aHJvd1Byb21pc2VOb3REZWZpbmVkID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIE5vZGUgcnVudGltZSBkb2VzIHN1cHBvcnQgRVM2IFByb21pc2VzLiAnXG4gICAgICAgICAgKyAnU2V0IFwiZ2xvYmFsLlByb21pc2VcIiB0byB5b3VyIHByZWZlcnJlZCBpbXBsZW1lbnRhdGlvbiBvZiBwcm9taXNlcy4nLClcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2IucHJvbWlzZSwgJ3RoZW4nLCB7IGdldDogdGhyb3dQcm9taXNlTm90RGVmaW5lZCB9KVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYi5wcm9taXNlLCAnY2F0Y2gnLCB7IGdldDogdGhyb3dQcm9taXNlTm90RGVmaW5lZCB9KVxuICAgIHJldHVybiBjYlxuICB9XG5cbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjYiA9IChlcnIsIGRhdGEpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSlcbiAgICB9XG4gIH0pXG4gIGNiLnByb21pc2UgPSBwcm9taXNlXG4gIHJldHVybiBjYlxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY0NhbGxiYWNrKGZuOiBGdW5jdGlvbiB8IG51bGwgfCB1bmRlZmluZWQsIGVycjogYW55LCBkYXRhID0gbnVsbCkge1xuICBpZiAoZm4gJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZuKGVyciwgZGF0YSlcbiAgfVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgZXJyXG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50V2FybihlcnJvcjogc3RyaW5nLCBtc2c6IHN0cmluZykge1xuICBjb25zb2xlLndhcm4oYFske2dldFNka05hbWUoKX1dWyR7ZXJyb3J9XToke21zZ31gKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRFcnJvcihlcnJvcjogc3RyaW5nLCBtc2c6IHN0cmluZykge1xuICBjb25zb2xlLmVycm9yKHtcbiAgICBjb2RlOiBlcnJvcixcbiAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske2Vycm9yfV06JHttc2d9YCxcbiAgfSlcbn1cbmV4cG9ydCBmdW5jdGlvbiBwcmludEluZm8oZXJyb3I6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgY29uc29sZS5sb2coYFske2dldFNka05hbWUoKX1dWyR7ZXJyb3J9XToke21zZ31gKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3I6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICBjb2RlOiBlcnJvcixcbiAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske2Vycm9yfV06JHttc2d9YCxcbiAgfSksKVxufVxuXG5pbnRlcmZhY2UgSVByaW50R3JvdXBMb2dPcHRpb25zIHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZTogc3RyaW5nIHwgb2JqZWN0XG4gIGNvbnRlbnQ6IHtcbiAgICB0eXBlOiAnaW5mbycgfCAnd2FybicgfCAnZXJyb3InXG4gICAgYm9keTogc3RyaW5nIHwgRXJyb3JcbiAgfVtdXG4gIHByaW50VHJhY2U/OiBib29sZWFuXG4gIGNvbGxhcHNlZD86IGJvb2xlYW5cbn1cbmV4cG9ydCBmdW5jdGlvbiBwcmludEdyb3VwTG9nKG9wdGlvbnM6IElQcmludEdyb3VwTG9nT3B0aW9ucykge1xuICBjb25zdCB7IHRpdGxlLCBzdWJ0aXRsZSA9ICcnLCBjb250ZW50ID0gW10sIHByaW50VHJhY2UgPSBmYWxzZSwgY29sbGFwc2VkID0gZmFsc2UgfSA9IG9wdGlvbnNcbiAgaWYgKGNvbGxhcHNlZCkge1xuICAgIChjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGNvbnNvbGUuZXJyb3IpKHRpdGxlLCBzdWJ0aXRsZSlcbiAgfSBlbHNlIHtcbiAgICAoY29uc29sZS5ncm91cCB8fCBjb25zb2xlLmVycm9yKSh0aXRsZSwgc3VidGl0bGUpXG4gIH1cbiAgZm9yIChjb25zdCB0aXAgb2YgY29udGVudCkge1xuICAgIGNvbnN0IHsgdHlwZSwgYm9keSB9ID0gdGlwXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgY29uc29sZS5sb2coYm9keSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICBjb25zb2xlLndhcm4oYm9keSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgY29uc29sZS5lcnJvcihib2R5KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuICBpZiAocHJpbnRUcmFjZSkge1xuICAgIChjb25zb2xlLnRyYWNlIHx8IGNvbnNvbGUubG9nKSgnc3RhY2sgdHJhY2U6JylcbiAgfVxuICBjb25zb2xlLmdyb3VwRW5kPy4oKVxufVxuXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAobXMgPSAwKSA9PiBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgbXMpKVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZykge1xuICByZXR1cm4gYCs4NiR7cGhvbmVOdW1iZXJ9YFxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VRdWVyeVN0cmluZyA9IChxdWVyeVN0cmluZykgPT4ge1xuICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnJlcGxhY2UoL15cXD8vLCAnJylcbiAgY29uc3QgcGFyYW1zID0ge31cbiAgY29uc3QgcGFpcnMgPSBxdWVyeVN0cmluZy5zcGxpdCgnJicpXG5cbiAgcGFpcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGxldCBba2V5LCB2YWx1ZV0gPSBpdGVtLnNwbGl0KCc9JylcbiAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKVxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJhbXNba2V5XSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNba2V5XSkpIHtcbiAgICAgICAgICBwYXJhbXNba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtc1trZXldID0gW3BhcmFtc1trZXldLCB2YWx1ZV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGFyYW1zXG59XG5cbi8vIOino+aekFVSTOWPguaVsFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ2FwdGNoYSh1cmwpIHtcbiAgbGV0IHF1ZXJ5T2JqOiBhbnkgPSB7fVxuICBjb25zdCBtYXRjaGVkID0gdXJsLm1hdGNoKC9eKGRhdGE6Lio/KShcXD9bXiNcXHNdKik/JC8pXG4gIGlmIChtYXRjaGVkKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgdXJsID0gbWF0Y2hlZFsxXVxuICAgIGNvbnN0IHNlYXJjaCA9IG1hdGNoZWRbMl1cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBxdWVyeU9iaiA9IHBhcnNlUXVlcnlTdHJpbmcoc2VhcmNoKVxuICAgIH1cbiAgfVxuICBjb25zdCB7IHRva2VuLCAuLi5yZXN0UXVlcnlPYmogfSA9IHF1ZXJ5T2JqXG4gIGlmICgvXmRhdGE6Ly50ZXN0KHVybCkgJiYgIXRva2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAnaW52YWxpZF9hcmd1bWVudCcsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogYGludmFsaWQgY2FwdGNoYSBkYXRhOiAke3VybH1gLFxuICAgIH1cbiAgfVxuICBpZiAoIXRva2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAndW5pbXBsZW1lbnRlZCcsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogJ25lZWQgdG8gaW1wbCBjYXB0Y2hhIGRhdGEnLFxuICAgIH1cbiAgfVxuICAvLyDop6PmnpB1cmzlvpfliLDnmoTlj4LmlbBcbiAgcmV0dXJuIHtcbiAgICBzdGF0ZTogcmVzdFF1ZXJ5T2JqLnN0YXRlLFxuICAgIHRva2VuLCAvLyDpqozor4HnoIF0b2tlblxuICAgIGNhcHRjaGFEYXRhOiB1cmwsIC8vIOmqjOivgeeggWJhc2U2NOWbvueJh1xuICB9XG59XG4iXX0=