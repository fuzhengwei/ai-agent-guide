"use strict";
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
exports.catchErrorsDecorator = void 0;
var util_1 = require("../libs/util");
var constants_1 = require("../constants");
var isFirefox = false;
if (typeof navigator !== 'undefined' && navigator.userAgent) {
    isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
}
var REG_STACK_DECORATE = isFirefox
    ? /(\.js\/)?__decorate(\$\d+)?<@.*\d$/
    : /(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/;
var REG_STACK_LINK = /https?:\/\/.+:\d*\/.*\.js:\d+:\d+/;
function catchErrorsDecorator(options) {
    var _a = options.mode, mode = _a === void 0 ? 'async' : _a, _b = options.customInfo, customInfo = _b === void 0 ? {} : _b, title = options.title, _c = options.messages, messages = _c === void 0 ? [] : _c;
    return function (target, methodName, descriptor) {
        if (!constants_1.IS_DEBUG_MODE) {
            return;
        }
        var className = customInfo.className || target.constructor.name;
        var fnName = customInfo.methodName || methodName;
        var fn = descriptor.value;
        var sourceLink = getSourceLink(new Error());
        if (mode === 'sync') {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var innerErr = getRewritedError({
                    err: new Error(),
                    className: className,
                    methodName: fnName,
                    sourceLink: sourceLink,
                });
                try {
                    return fn.apply(this, args);
                }
                catch (err) {
                    var failErr = err;
                    var errMsg = err.message, error = err.error, errorDescription = err.error_description;
                    var logs = {
                        title: title || "".concat(className, ".").concat(fnName, " failed"),
                        content: [{
                                type: 'error',
                                body: err,
                            }],
                    };
                    if (errMsg && /^\{.*\}$/.test(errMsg)) {
                        var msg = JSON.parse(errMsg);
                        logs.subtitle = errMsg;
                        if (msg.code) {
                            if (innerErr) {
                                innerErr.code = msg.code;
                                innerErr.msg = msg.msg;
                            }
                            else {
                                err.code = msg.code;
                                err.message = msg.msg;
                            }
                            failErr = innerErr || err;
                            logs.content = messages.map(function (msg) { return ({
                                type: 'info',
                                body: msg,
                            }); });
                        }
                    }
                    if (error && errorDescription) {
                        logs.subtitle = errorDescription;
                        if (innerErr) {
                            innerErr.code = error;
                            innerErr.msg = errorDescription;
                        }
                        else {
                            err.code = error;
                            err.message = errorDescription;
                        }
                        failErr = innerErr || err;
                        logs.content = messages.map(function (msg) { return ({
                            type: 'info',
                            body: msg,
                        }); });
                    }
                    (0, util_1.printGroupLog)(logs);
                    throw failErr;
                }
            };
        }
        else {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var innerErr, err_1, failErr, errMsg, error, errorDescription, logs, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                innerErr = getRewritedError({
                                    err: new Error(),
                                    className: className,
                                    methodName: fnName,
                                    sourceLink: sourceLink,
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, fn.apply(this, args)];
                            case 2: return [2, _a.sent()];
                            case 3:
                                err_1 = _a.sent();
                                failErr = err_1;
                                errMsg = err_1.message, error = err_1.error, errorDescription = err_1.error_description;
                                logs = {
                                    title: title || "".concat(className, ".").concat(fnName, " failed"),
                                    content: [{
                                            type: 'error',
                                            body: err_1,
                                        }],
                                };
                                if (errMsg && /^\{.*\}$/.test(errMsg)) {
                                    msg = JSON.parse(errMsg);
                                    logs.subtitle = msg;
                                    if (msg.code) {
                                        if (innerErr) {
                                            innerErr.code = msg.code;
                                            innerErr.message = msg.msg;
                                        }
                                        else {
                                            err_1.code = msg.code;
                                            err_1.message = msg.msg;
                                        }
                                        failErr = innerErr || err_1;
                                        logs.content = messages.map(function (msg) { return ({
                                            type: 'info',
                                            body: msg,
                                        }); });
                                    }
                                }
                                if (error && errorDescription) {
                                    logs.subtitle = errorDescription;
                                    if (innerErr) {
                                        innerErr.code = error;
                                        innerErr.msg = errorDescription;
                                    }
                                    else {
                                        err_1.code = error;
                                        err_1.message = errorDescription;
                                    }
                                    failErr = innerErr || err_1;
                                    logs.content = messages.map(function (msg) { return ({
                                        type: 'info',
                                        body: msg,
                                    }); });
                                }
                                (0, util_1.printGroupLog)(logs);
                                throw failErr;
                            case 4: return [2];
                        }
                    });
                });
            };
        }
    };
}
exports.catchErrorsDecorator = catchErrorsDecorator;
function getSourceLink(err) {
    var sourceLink = '';
    var outterErrStacks = err.stack.split('\n');
    var indexOfDecorator = outterErrStacks.findIndex(function (str) { return REG_STACK_DECORATE.test(str); });
    if (indexOfDecorator !== -1) {
        var match = REG_STACK_LINK.exec(outterErrStacks[indexOfDecorator + 1] || '');
        sourceLink = match ? match[0] : '';
    }
    return sourceLink;
}
function getRewritedError(options) {
    var err = options.err, className = options.className, methodName = options.methodName, sourceLink = options.sourceLink;
    if (!sourceLink) {
        return null;
    }
    var innerErrStack = err.stack.split('\n');
    var REG_STACK_INNER_METHOD = isFirefox
        ? /^catchErrorsDecorator\/<\/descriptor.value@.*\d$/
        : new RegExp("".concat(className, "\\.descriptor.value\\s*\\[as\\s").concat(methodName, "\\]\\s*\\(.*\\)$"));
    var REG_STACK_INNER_METHOD_WITHOUT_LINK = isFirefox
        ? /^catchErrorsDecorator\/<\/descriptor.value/
        : new RegExp("".concat(className, "\\.descriptor.value\\s*\\[as\\s").concat(methodName, "\\]"));
    var indexOfSource = innerErrStack.findIndex(function (str) { return REG_STACK_INNER_METHOD.test(str); });
    var innerErr;
    if (indexOfSource !== -1) {
        var realErrStack = innerErrStack.filter(function (v, i) { return i > indexOfSource; });
        realErrStack.unshift(innerErrStack[indexOfSource]
            .replace(REG_STACK_INNER_METHOD_WITHOUT_LINK, "".concat(className, ".").concat(methodName))
            .replace(REG_STACK_LINK, sourceLink));
        innerErr = new Error();
        innerErr.stack = "".concat(isFirefox ? '@debugger' : 'Error', "\n").concat(realErrStack.join('\n'));
    }
    return innerErr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTRDO0FBQzVDLDBDQUE0QztBQVk1QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUE7QUFDckIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtJQUMzRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVM7SUFDbEMsQ0FBQyxDQUFDLG9DQUFvQztJQUN0QyxDQUFDLENBQUMsNENBQTRDLENBQUE7QUFDaEQsSUFBTSxjQUFjLEdBQUcsbUNBQW1DLENBQUE7QUFLMUQsU0FBZ0Isb0JBQW9CLENBQUMsT0FBcUM7SUFDaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFZO0lBRXpFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLHlCQUFhLEVBQUU7WUFDbEIsT0FBTTtTQUNQO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtRQUNqRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQTtRQUNsRCxJQUFNLEVB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U0FBUztRQUNuRCxDQUFDLENBQUMsNENBQTRDO1FBQzlDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFHLFNBQVMsNENBQWtDLFVBQVUsUUFBSyxDQUFDLENBQUE7SUFDN0UsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFBO0lBQ3RGLElBQUksUUFBZSxDQUFBO0lBQ25CLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBRXhCLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLGFBQWEsRUFBakIsQ0FBaUIsQ0FBQyxDQUFBO1FBQ3RFLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQzthQUM5QyxPQUFPLENBQUMsbUNBQW1DLEVBQUUsVUFBRyxTQUFTLGNBQUksVUFBVSxDQUFFLENBQUM7YUFDMUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3RCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsVUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxlQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQTtLQUNwRjtJQUNELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmludEdyb3VwTG9nIH0gZnJvbSAnLi4vbGlicy91dGlsJ1xuaW1wb3J0IHsgSVNfREVCVUdfTU9ERSB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuaW50ZXJmYWNlIElDYXRjaEVycm9yc0RlY29yYXRvck9wdGlvbnMge1xuICBtb2RlPzogJ3N5bmMnIHwgJ2FzeW5jJztcbiAgY3VzdG9tSW5mbz86IHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgbWV0aG9kTmFtZT86IHN0cmluZztcbiAgfTtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2VzPzogc3RyaW5nW107XG59XG4vLyBmaXJlZm9455qEc3RhY2vmoLzlvI/kuI5jaHJvbWXkuI3lkIxcbmxldCBpc0ZpcmVmb3ggPSBmYWxzZVxuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgaXNGaXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgIT09IC0xXG59XG4vKipcbiAqIGRlY29yYXRl5Zyoc3RhY2vkuK3kuIDoiKzpg73nibnlrprnmoTop4TojINcbiAqL1xuY29uc3QgUkVHX1NUQUNLX0RFQ09SQVRFID0gaXNGaXJlZm94XG4gID8gLyhcXC5qc1xcLyk/X19kZWNvcmF0ZShcXCRcXGQrKT88QC4qXFxkJC9cbiAgOiAvKFxcL1xcdytcXC5qc1xcLik/X19kZWNvcmF0ZShcXCRcXGQrKT9cXHMqXFwoLipcXCkkL1xuY29uc3QgUkVHX1NUQUNLX0xJTksgPSAvaHR0cHM/OlxcL1xcLy4rOlxcZCpcXC8uKlxcLmpzOlxcZCs6XFxkKy9cbi8qKlxuICogZGVidWfmqKHlvI/lvLrljJbml6Xlv5fkv6Hmga9cbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEVycm9yc0RlY29yYXRvcihvcHRpb25zOiBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zKSB7XG4gIGNvbnN0IHsgbW9kZSA9ICdhc3luYycsIGN1c3RvbUluZm8gPSB7fSwgdGl0bGUsIG1lc3NhZ2VzID0gW10gfSA9IG9wdGlvbnNcblxuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIHRhcmdldDogYW55LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdG9yOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxGdW5jdGlvbj5cbiAgKSB7XG4gICAgLy8g55Sf5Lqn546v5aKD56aB55SoXG4gICAgaWYgKCFJU19ERUJVR19NT0RFKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY3VzdG9tSW5mby5jbGFzc05hbWUgfHwgdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWVcbiAgICBjb25zdCBmbk5hbWUgPSBjdXN0b21JbmZvLm1ldGhvZE5hbWUgfHwgbWV0aG9kTmFtZVxuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZVxuXG4gICAgLy8g6KKrZGVjb3JhdG9y6KOF6aWw55qE5rqQ56CBbGlua1xuICAgIC8vIOWcqGRlc2NyaXB0b3IudmFsdWXlpJbpg6jmraTlpITliJvlu7rnmoRzdGFja+WxguasoeWPr+inpui+vua6kOeggVxuICAgIC8vIOiAjGRlc2NyaXB0b3IudmFsdWXlhoXpg6jmnInlj6/og73nlLHkuo5zdGFja+Wkqua3seaXoOazleinpui+vlxuICAgIGNvbnN0IHNvdXJjZUxpbmsgPSBnZXRTb3VyY2VMaW5rKG5ldyBFcnJvcigpKVxuXG4gICAgaWYgKG1vZGUgPT09ICdzeW5jJykge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAvLyDmraTlpITnmoRzdGFja+S9nOeUqOS4u+imgeaYr+S4uuS6huiOt+WPluiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWNsYXNz5ZKMbWV0aG9k5ZCN56ewXG4gICAgICAgIGNvbnN0IGlubmVyRXJyOiBhbnkgPSBnZXRSZXdyaXRlZEVycm9yKHtcbiAgICAgICAgICBlcnI6IG5ldyBFcnJvcigpLFxuICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICBtZXRob2ROYW1lOiBmbk5hbWUsXG4gICAgICAgICAgc291cmNlTGluayxcbiAgICAgICAgfSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnJcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZywgZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uIH0gPSBlcnJcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVycixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKVxuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IGVyck1zZ1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnIuY29kZSA9IG1zZy5jb2RlXG4gICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVyclxuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+ICh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb2F1dGgg6ZSZ6K+v54m55q6K5aSE55CGXG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgaW5uZXJFcnIuY29kZSA9IGVycm9yXG4gICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IGVycm9yRGVzY3JpcHRpb25cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVyci5jb2RlID0gZXJyb3JcbiAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyXG4gICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+ICh7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgYm9keTogbXNnLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHByaW50R3JvdXBMb2cobG9ncylcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCBpbm5lckVycjogYW55ID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmssXG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZm4uYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnJcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZywgZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uIH0gPSBlcnJcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVycixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKVxuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IG1zZ1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1lc3NhZ2UgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnJcbiAgICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBib2R5OiBtc2csXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9hdXRoIOmUmeivr+eJueauiuWkhOeQhlxuICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvckRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgaWYgKGlubmVyRXJyKSB7XG4gICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBlcnJvclxuICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnIuY29kZSA9IGVycm9yXG4gICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVyclxuICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcmludEdyb3VwTG9nKGxvZ3MpXG4gICAgICAgICAgdGhyb3cgZmFpbEVyclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu5bm26L+U5Zue5rqQ56CB6ZO+5o6lbGlua1xuICogQHBhcmFtIGVyclxuICovXG5mdW5jdGlvbiBnZXRTb3VyY2VMaW5rKGVycjogRXJyb3IpIHtcbiAgbGV0IHNvdXJjZUxpbmsgPSAnJ1xuICBjb25zdCBvdXR0ZXJFcnJTdGFja3MgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpXG4gIGNvbnN0IGluZGV4T2ZEZWNvcmF0b3IgPSBvdXR0ZXJFcnJTdGFja3MuZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfREVDT1JBVEUudGVzdChzdHIpKVxuXG4gIGlmIChpbmRleE9mRGVjb3JhdG9yICE9PSAtMSkge1xuICAgIGNvbnN0IG1hdGNoID0gUkVHX1NUQUNLX0xJTksuZXhlYyhvdXR0ZXJFcnJTdGFja3NbaW5kZXhPZkRlY29yYXRvciArIDFdIHx8ICcnKVxuXG4gICAgc291cmNlTGluayA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJ1xuICB9XG4gIHJldHVybiBzb3VyY2VMaW5rXG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu77yM5YmU6Zmk5YW25ZCO55qE5peg55So5aCG5qCI77yM5bm25bCG6ZO+5o6l5pu/5o2i5Li65rqQ56CBbGlua1xuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gZ2V0UmV3cml0ZWRFcnJvcihvcHRpb25zOiB7XG4gIGVycjogRXJyb3I7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBtZXRob2ROYW1lOiBzdHJpbmc7XG4gIHNvdXJjZUxpbms6IHN0cmluZztcbn0pIHtcbiAgY29uc3QgeyBlcnIsIGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgc291cmNlTGluayB9ID0gb3B0aW9uc1xuICAvLyDmib7kuI3liLDmupDnoIFsaW5r6L+U5ZuebnVsbO+8jOWQjue7remAu+i+keWwhuaJk+WNsOWOn+WghuagiOS/oeaBr1xuICBpZiAoIXNvdXJjZUxpbmspIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgaW5uZXJFcnJTdGFjayA9IGVyci5zdGFjay5zcGxpdCgnXFxuJylcbiAgY29uc3QgUkVHX1NUQUNLX0lOTkVSX01FVEhPRCA9IGlzRmlyZWZveFxuICAgID8gL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlQC4qXFxkJC9cbiAgICA6IG5ldyBSZWdFeHAoYCR7Y2xhc3NOYW1lfVxcXFwuZGVzY3JpcHRvci52YWx1ZVxcXFxzKlxcXFxbYXNcXFxccyR7bWV0aG9kTmFtZX1cXFxcXVxcXFxzKlxcXFwoLipcXFxcKSRgKVxuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSyA9IGlzRmlyZWZveFxuICAgID8gL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlL1xuICAgIDogbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdYClcbiAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IGlubmVyRXJyU3RhY2suZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9ELnRlc3Qoc3RyKSlcbiAgbGV0IGlubmVyRXJyOiBFcnJvclxuICBpZiAoaW5kZXhPZlNvdXJjZSAhPT0gLTEpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVhbEVyclN0YWNrID0gaW5uZXJFcnJTdGFjay5maWx0ZXIoKHYsIGkpID0+IGkgPiBpbmRleE9mU291cmNlKVxuICAgIHJlYWxFcnJTdGFjay51bnNoaWZ0KGlubmVyRXJyU3RhY2tbaW5kZXhPZlNvdXJjZV1cbiAgICAgIC5yZXBsYWNlKFJFR19TVEFDS19JTk5FUl9NRVRIT0RfV0lUSE9VVF9MSU5LLCBgJHtjbGFzc05hbWV9LiR7bWV0aG9kTmFtZX1gKVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0xJTkssIHNvdXJjZUxpbmspKVxuICAgIGlubmVyRXJyID0gbmV3IEVycm9yKClcbiAgICBpbm5lckVyci5zdGFjayA9IGAke2lzRmlyZWZveCA/ICdAZGVidWdnZXInIDogJ0Vycm9yJ31cXG4ke3JlYWxFcnJTdGFjay5qb2luKCdcXG4nKX1gXG4gIH1cbiAgcmV0dXJuIGlubmVyRXJyXG59XG4iXX0=