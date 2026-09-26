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
import { printGroupLog } from '../libs/util';
import { IS_DEBUG_MODE } from '../constants';
var isFirefox = false;
if (typeof navigator !== 'undefined' && navigator.userAgent) {
    isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
}
var REG_STACK_DECORATE = isFirefox
    ? /(\.js\/)?__decorate(\$\d+)?<@.*\d$/
    : /(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/;
var REG_STACK_LINK = /https?:\/\/.+:\d*\/.*\.js:\d+:\d+/;
export function catchErrorsDecorator(options) {
    var _a = options.mode, mode = _a === void 0 ? 'async' : _a, _b = options.customInfo, customInfo = _b === void 0 ? {} : _b, title = options.title, _c = options.messages, messages = _c === void 0 ? [] : _c;
    return function (target, methodName, descriptor) {
        if (!IS_DEBUG_MODE) {
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
                    printGroupLog(logs);
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
                                printGroupLog(logs);
                                throw failErr;
                            case 4: return [2];
                        }
                    });
                });
            };
        }
    };
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBWTVDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtBQUNyQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO0lBQzNELFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtDQUMxRDtBQUlELElBQU0sa0JBQWtCLEdBQUcsU0FBUztJQUNsQyxDQUFDLENBQUMsb0NBQW9DO0lBQ3RDLENBQUMsQ0FBQyw0Q0FBNEMsQ0FBQTtBQUNoRCxJQUFNLGNBQWMsR0FBRyxtQ0FBbUMsQ0FBQTtBQUsxRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsT0FBcUM7SUFDaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFZO0lBRXpFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQixPQUFNO1NBQ1A7UUFDRCxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO1FBQ2pFLElB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QUMsQ0FBQTtJQUMxRixJQUFNLG1DQUFtQyxHQUFHLFNBQVM7UUFDbkQsQ0FBQyxDQUFDLDRDQUE0QztRQUM5QyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBRyxTQUFTLDRDQUFrQyxVQUFVLFFBQUssQ0FBQyxDQUFBO0lBQzdFLElBQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQTtJQUN0RixJQUFJLFFBQWUsQ0FBQTtJQUNuQixJQUFJLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUV4QixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxhQUFhLEVBQWpCLENBQWlCLENBQUMsQ0FBQTtRQUN0RSxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7YUFDOUMsT0FBTyxDQUFDLG1DQUFtQyxFQUFFLFVBQUcsU0FBUyxjQUFJLFVBQVUsQ0FBRSxDQUFDO2FBQzFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtRQUN2QyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUN0QixRQUFRLENBQUMsS0FBSyxHQUFHLFVBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sZUFBSyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUE7S0FDcEY7SUFDRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpbnRHcm91cExvZyB9IGZyb20gJy4uL2xpYnMvdXRpbCdcbmltcG9ydCB7IElTX0RFQlVHX01PREUgfSBmcm9tICcuLi9jb25zdGFudHMnXG5cbmludGVyZmFjZSBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zIHtcbiAgbW9kZT86ICdzeW5jJyB8ICdhc3luYyc7XG4gIGN1c3RvbUluZm8/OiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIG1ldGhvZE5hbWU/OiBzdHJpbmc7XG4gIH07XG4gIHRpdGxlPzogc3RyaW5nO1xuICBtZXNzYWdlcz86IHN0cmluZ1tdO1xufVxuLy8gZmlyZWZveOeahHN0YWNr5qC85byP5LiOY2hyb21l5LiN5ZCMXG5sZXQgaXNGaXJlZm94ID0gZmFsc2VcbmlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gIGlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMVxufVxuLyoqXG4gKiBkZWNvcmF0ZeWcqHN0YWNr5Lit5LiA6Iis6YO954m55a6a55qE6KeE6IyDXG4gKi9cbmNvbnN0IFJFR19TVEFDS19ERUNPUkFURSA9IGlzRmlyZWZveFxuICA/IC8oXFwuanNcXC8pP19fZGVjb3JhdGUoXFwkXFxkKyk/PEAuKlxcZCQvXG4gIDogLyhcXC9cXHcrXFwuanNcXC4pP19fZGVjb3JhdGUoXFwkXFxkKyk/XFxzKlxcKC4qXFwpJC9cbmNvbnN0IFJFR19TVEFDS19MSU5LID0gL2h0dHBzPzpcXC9cXC8uKzpcXGQqXFwvLipcXC5qczpcXGQrOlxcZCsvXG4vKipcbiAqIGRlYnVn5qih5byP5by65YyW5pel5b+X5L+h5oGvXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2F0Y2hFcnJvcnNEZWNvcmF0b3Iob3B0aW9uczogSUNhdGNoRXJyb3JzRGVjb3JhdG9yT3B0aW9ucykge1xuICBjb25zdCB7IG1vZGUgPSAnYXN5bmMnLCBjdXN0b21JbmZvID0ge30sIHRpdGxlLCBtZXNzYWdlcyA9IFtdIH0gPSBvcHRpb25zXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRvcjogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8RnVuY3Rpb24+XG4gICkge1xuICAgIC8vIOeUn+S6p+eOr+Wig+emgeeUqFxuICAgIGlmICghSVNfREVCVUdfTU9ERSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGN1c3RvbUluZm8uY2xhc3NOYW1lIHx8IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgY29uc3QgZm5OYW1lID0gY3VzdG9tSW5mby5tZXRob2ROYW1lIHx8IG1ldGhvZE5hbWVcbiAgICBjb25zdCBmbiA9IGRlc2NyaXB0b3IudmFsdWVcblxuICAgIC8vIOiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWxpbmtcbiAgICAvLyDlnKhkZXNjcmlwdG9yLnZhbHVl5aSW6YOo5q2k5aSE5Yib5bu655qEc3RhY2vlsYLmrKHlj6/op6bovr7mupDnoIFcbiAgICAvLyDogIxkZXNjcmlwdG9yLnZhbHVl5YaF6YOo5pyJ5Y+v6IO955Sx5LqOc3RhY2vlpKrmt7Hml6Dms5Xop6bovr5cbiAgICBjb25zdCBzb3VyY2VMaW5rID0gZ2V0U291cmNlTGluayhuZXcgRXJyb3IoKSlcblxuICAgIGlmIChtb2RlID09PSAnc3luYycpIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgLy8g5q2k5aSE55qEc3RhY2vkvZznlKjkuLvopoHmmK/kuLrkuobojrflj5booqtkZWNvcmF0b3Loo4XppbDnmoTmupDnoIFjbGFzc+WSjG1ldGhvZOWQjeensFxuICAgICAgICBjb25zdCBpbm5lckVycjogYW55ID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmssXG4gICAgICAgIH0pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyXG4gICAgICAgICAgY29uc3QgeyBtZXNzYWdlOiBlcnJNc2csIGVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3JEZXNjcmlwdGlvbiB9ID0gZXJyXG4gICAgICAgICAgY29uc3QgbG9nczogYW55ID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IGAke2NsYXNzTmFtZX0uJHtmbk5hbWV9IGZhaWxlZGAsXG4gICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBib2R5OiBlcnIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYgKGVyck1zZyAmJiAvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZylcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBlcnJNc2dcbiAgICAgICAgICAgIGlmIChtc2cuY29kZSkge1xuICAgICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnJcbiAgICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBib2R5OiBtc2csXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9hdXRoIOmUmeivr+eJueauiuWkhOeQhlxuICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvckRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgaWYgKGlubmVyRXJyKSB7XG4gICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBlcnJvclxuICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnIuY29kZSA9IGVycm9yXG4gICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVyclxuICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcmludEdyb3VwTG9nKGxvZ3MpXG4gICAgICAgICAgdGhyb3cgZmFpbEVyclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc3QgaW5uZXJFcnI6IGFueSA9IGdldFJld3JpdGVkRXJyb3Ioe1xuICAgICAgICAgIGVycjogbmV3IEVycm9yKCksXG4gICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgIG1ldGhvZE5hbWU6IGZuTmFtZSxcbiAgICAgICAgICBzb3VyY2VMaW5rLFxuICAgICAgICB9KVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyXG4gICAgICAgICAgY29uc3QgeyBtZXNzYWdlOiBlcnJNc2csIGVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3JEZXNjcmlwdGlvbiB9ID0gZXJyXG4gICAgICAgICAgY29uc3QgbG9nczogYW55ID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IGAke2NsYXNzTmFtZX0uJHtmbk5hbWV9IGZhaWxlZGAsXG4gICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBib2R5OiBlcnIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYgKGVyck1zZyAmJiAvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZylcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBtc2dcbiAgICAgICAgICAgIGlmIChtc2cuY29kZSkge1xuICAgICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBpbm5lckVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyXG4gICAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2cgPT4gKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgYm9keTogbXNnLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBvYXV0aCDplJnor6/nibnmrorlpITnkIZcbiAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3JEZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IGVycm9yRGVzY3JpcHRpb25cbiAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICBpbm5lckVyci5jb2RlID0gZXJyb3JcbiAgICAgICAgICAgICAgaW5uZXJFcnIubXNnID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyLmNvZGUgPSBlcnJvclxuICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IGVycm9yRGVzY3JpcHRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnJcbiAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2cgPT4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICBib2R5OiBtc2csXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRHcm91cExvZyhsb2dzKVxuICAgICAgICAgIHRocm93IGZhaWxFcnJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIOWcqOWOn+Wni+WghuagiOS4reafpeaJvuijhemlsOWZqOadoeebruW5tui/lOWbnua6kOeggemTvuaOpWxpbmtcbiAqIEBwYXJhbSBlcnJcbiAqL1xuZnVuY3Rpb24gZ2V0U291cmNlTGluayhlcnI6IEVycm9yKSB7XG4gIGxldCBzb3VyY2VMaW5rID0gJydcbiAgY29uc3Qgb3V0dGVyRXJyU3RhY2tzID0gZXJyLnN0YWNrLnNwbGl0KCdcXG4nKVxuICBjb25zdCBpbmRleE9mRGVjb3JhdG9yID0gb3V0dGVyRXJyU3RhY2tzLmZpbmRJbmRleChzdHIgPT4gUkVHX1NUQUNLX0RFQ09SQVRFLnRlc3Qoc3RyKSlcblxuICBpZiAoaW5kZXhPZkRlY29yYXRvciAhPT0gLTEpIHtcbiAgICBjb25zdCBtYXRjaCA9IFJFR19TVEFDS19MSU5LLmV4ZWMob3V0dGVyRXJyU3RhY2tzW2luZGV4T2ZEZWNvcmF0b3IgKyAxXSB8fCAnJylcblxuICAgIHNvdXJjZUxpbmsgPSBtYXRjaCA/IG1hdGNoWzBdIDogJydcbiAgfVxuICByZXR1cm4gc291cmNlTGlua1xufVxuXG4vKipcbiAqIOWcqOWOn+Wni+WghuagiOS4reafpeaJvuijhemlsOWZqOadoeebru+8jOWJlOmZpOWFtuWQjueahOaXoOeUqOWghuagiO+8jOW5tuWwhumTvuaOpeabv+aNouS4uua6kOeggWxpbmtcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGdldFJld3JpdGVkRXJyb3Iob3B0aW9uczoge1xuICBlcnI6IEVycm9yO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgbWV0aG9kTmFtZTogc3RyaW5nO1xuICBzb3VyY2VMaW5rOiBzdHJpbmc7XG59KSB7XG4gIGNvbnN0IHsgZXJyLCBjbGFzc05hbWUsIG1ldGhvZE5hbWUsIHNvdXJjZUxpbmsgfSA9IG9wdGlvbnNcbiAgLy8g5om+5LiN5Yiw5rqQ56CBbGlua+i/lOWbnm51bGzvvIzlkI7nu63pgLvovpHlsIbmiZPljbDljp/loIbmoIjkv6Hmga9cbiAgaWYgKCFzb3VyY2VMaW5rKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IGlubmVyRXJyU3RhY2sgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpXG4gIGNvbnN0IFJFR19TVEFDS19JTk5FUl9NRVRIT0QgPSBpc0ZpcmVmb3hcbiAgICA/IC9eY2F0Y2hFcnJvcnNEZWNvcmF0b3JcXC88XFwvZGVzY3JpcHRvci52YWx1ZUAuKlxcZCQvXG4gICAgOiBuZXcgUmVnRXhwKGAke2NsYXNzTmFtZX1cXFxcLmRlc2NyaXB0b3IudmFsdWVcXFxccypcXFxcW2FzXFxcXHMke21ldGhvZE5hbWV9XFxcXF1cXFxccypcXFxcKC4qXFxcXCkkYClcbiAgY29uc3QgUkVHX1NUQUNLX0lOTkVSX01FVEhPRF9XSVRIT1VUX0xJTksgPSBpc0ZpcmVmb3hcbiAgICA/IC9eY2F0Y2hFcnJvcnNEZWNvcmF0b3JcXC88XFwvZGVzY3JpcHRvci52YWx1ZS9cbiAgICA6IG5ldyBSZWdFeHAoYCR7Y2xhc3NOYW1lfVxcXFwuZGVzY3JpcHRvci52YWx1ZVxcXFxzKlxcXFxbYXNcXFxccyR7bWV0aG9kTmFtZX1cXFxcXWApXG4gIGNvbnN0IGluZGV4T2ZTb3VyY2UgPSBpbm5lckVyclN0YWNrLmZpbmRJbmRleChzdHIgPT4gUkVHX1NUQUNLX0lOTkVSX01FVEhPRC50ZXN0KHN0cikpXG4gIGxldCBpbm5lckVycjogRXJyb3JcbiAgaWYgKGluZGV4T2ZTb3VyY2UgIT09IC0xKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlYWxFcnJTdGFjayA9IGlubmVyRXJyU3RhY2suZmlsdGVyKCh2LCBpKSA9PiBpID4gaW5kZXhPZlNvdXJjZSlcbiAgICByZWFsRXJyU3RhY2sudW5zaGlmdChpbm5lckVyclN0YWNrW2luZGV4T2ZTb3VyY2VdXG4gICAgICAucmVwbGFjZShSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSywgYCR7Y2xhc3NOYW1lfS4ke21ldGhvZE5hbWV9YClcbiAgICAgIC5yZXBsYWNlKFJFR19TVEFDS19MSU5LLCBzb3VyY2VMaW5rKSlcbiAgICBpbm5lckVyciA9IG5ldyBFcnJvcigpXG4gICAgaW5uZXJFcnIuc3RhY2sgPSBgJHtpc0ZpcmVmb3ggPyAnQGRlYnVnZ2VyJyA6ICdFcnJvcid9XFxuJHtyZWFsRXJyU3RhY2suam9pbignXFxuJyl9YFxuICB9XG4gIHJldHVybiBpbm5lckVyclxufVxuIl19