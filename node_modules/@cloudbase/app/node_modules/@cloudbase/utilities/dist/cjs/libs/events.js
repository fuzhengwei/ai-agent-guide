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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEventListener = exports.activateEvent = exports.addEventListener = exports.CloudbaseEventEmitter = exports.IErrorEvent = exports.CloudbaseEvent = void 0;
var util_1 = require("./util");
function customeAddEventListener(name, listener, listeners) {
    listeners[name] = listeners[name] || [];
    listeners[name].push(listener);
}
function customRemoveEventListener(name, listener, listeners) {
    if (listeners === null || listeners === void 0 ? void 0 : listeners[name]) {
        var index = listeners[name].indexOf(listener);
        if (index !== -1) {
            listeners[name].splice(index, 1);
        }
    }
}
var CloudbaseEvent = (function () {
    function CloudbaseEvent(name, data) {
        this.data = data || null;
        this.name = name;
    }
    return CloudbaseEvent;
}());
exports.CloudbaseEvent = CloudbaseEvent;
var IErrorEvent = (function (_super) {
    __extends(IErrorEvent, _super);
    function IErrorEvent(error, data) {
        var _this = _super.call(this, 'error', { error: error, data: data }) || this;
        _this.error = error;
        return _this;
    }
    return IErrorEvent;
}(CloudbaseEvent));
exports.IErrorEvent = IErrorEvent;
var CloudbaseEventEmitter = (function () {
    function CloudbaseEventEmitter() {
        this.listeners = {};
    }
    CloudbaseEventEmitter.prototype.on = function (name, listener) {
        customeAddEventListener(name, listener, this.listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.off = function (name, listener) {
        customRemoveEventListener(name, listener, this.listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.fire = function (event, data) {
        if ((0, util_1.isInstanceOf)(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        var ev = (0, util_1.isString)(event) ? new CloudbaseEvent(event, data || {}) : event;
        var name = ev.name;
        if (this.listens(name)) {
            ev.target = this;
            var handlers = this.listeners[name] ? __spreadArray([], this.listeners[name], true) : [];
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var fn = handlers_1[_i];
                fn.call(this, ev);
            }
        }
        return this;
    };
    CloudbaseEventEmitter.prototype.listens = function (name) {
        return this.listeners[name] && this.listeners[name].length > 0;
    };
    return CloudbaseEventEmitter;
}());
exports.CloudbaseEventEmitter = CloudbaseEventEmitter;
var eventEmitter = new CloudbaseEventEmitter();
function addEventListener(event, callback) {
    eventEmitter.on(event, callback);
}
exports.addEventListener = addEventListener;
function activateEvent(event, data) {
    if (data === void 0) { data = {}; }
    eventEmitter.fire(event, data);
}
exports.activateEvent = activateEvent;
function removeEventListener(event, callback) {
    eventEmitter.off(event, callback);
}
exports.removeEventListener = removeEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQztBQVcvQyxTQUFTLHVCQUF1QixDQUFDLElBQVksRUFBRSxRQUFrQixFQUFFLFNBQW9CO0lBQ3JGLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDaEMsQ0FBQztBQVFELFNBQVMseUJBQXlCLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsU0FBb0I7SUFDdkYsSUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUcsSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNqQztLQUNGO0FBQ0gsQ0FBQztBQVlEO0lBS0Usd0JBQVksSUFBWSxFQUFFLElBQVM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksd0NBQWM7QUFpQjNCO0lBQWlDLCtCQUFjO0lBRTdDLHFCQUFZLEtBQVksRUFBRSxJQUFVO1FBQXBDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxTQUVoQztRQURDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztJQUNwQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBaUMsY0FBYyxHQU05QztBQU5ZLGtDQUFXO0FBV3hCO0lBQUE7UUFPbUIsY0FBUyxHQUFjLEVBQUUsQ0FBQTtJQThENUMsQ0FBQztJQXJEUSxrQ0FBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWtCO1FBQ3hDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQVFNLG1DQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBa0I7UUFDekMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBT00sb0NBQUksR0FBWCxVQUFZLEtBQThCLEVBQUUsSUFBVTtRQUVwRCxJQUFJLElBQUEsbUJBQVksRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBRSxLQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFFRCxJQUFNLEVBQUUsR0FBbUIsSUFBQSxlQUFRLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLEtBQWUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQXVCLENBQUE7UUFFOUcsSUFBQSxJQUFJLEdBQUssRUFBRSxLQUFQLENBQU87UUFFbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBRWhCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDdEUsS0FBaUIsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7Z0JBQXRCLElBQU0sRUFBRSxpQkFBQTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTthQUNsQjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBUU8sdUNBQU8sR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXJFRCxJQXFFQztBQXJFWSxzREFBcUI7QUF3RWxDLElBQU0sWUFBWSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQTtBQUVoRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7SUFDaEUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbEMsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQWEsRUFBRSxJQUFjO0lBQWQscUJBQUEsRUFBQSxTQUFjO0lBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEtBQWEsRUFBRSxRQUFrQjtJQUNuRSxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNuQyxDQUFDO0FBRkQsa0RBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1N0cmluZywgaXNJbnN0YW5jZU9mIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgTGlzdGVuZXJzLCBJQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9ldmVudHMnXG5cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVyIC0g5re75Yqg55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBjdXN0b21lQWRkRXZlbnRMaXN0ZW5lcihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiwgbGlzdGVuZXJzOiBMaXN0ZW5lcnMpIHtcbiAgbGlzdGVuZXJzW25hbWVdID0gbGlzdGVuZXJzW25hbWVdIHx8IFtdXG4gIGxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKVxufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9yZW1vdmVFdmVudExpc3RlbmVyIC0g56e76Zmk55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBjdXN0b21SZW1vdmVFdmVudExpc3RlbmVyKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uLCBsaXN0ZW5lcnM6IExpc3RlbmVycykge1xuICBpZiAobGlzdGVuZXJzPy5bbmFtZV0pIHtcbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGxpc3RlbmVyc1tuYW1lXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5pbnRlcmZhY2UgSUV2ZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0YXJnZXQ6IGFueTtcbiAgZGF0YTogYW55O1xufVxuLyoqXG4gKiDoh6rlrprkuYnkuovku7ZcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDnsbvlnotcbiAqIEBwYXJhbSB7YW55fSBkYXRhIC0g5pWw5o2uXG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VFdmVudCBpbXBsZW1lbnRzIElFdmVudCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgcHVibGljIHRhcmdldDogYW55XG4gIHB1YmxpYyBkYXRhOiBhbnlcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwgbnVsbFxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgfVxufVxuLyoqXG4gKiDoh6rlrprkuYnplJnor6/kuovku7ZcbiAqIEBjbGFzcyBJRXJyb3JFdmVudFxuICogQGV4dGVuZHMgQ2xvdWRiYXNlRXZlbnRcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIC0g6ZSZ6K+v5L+h5oGv5a+56LGhXG4gKiBAcGFyYW0ge2FueX0gZGF0YSAgLSDmlbDmja5cbiAqL1xuZXhwb3J0IGNsYXNzIElFcnJvckV2ZW50IGV4dGVuZHMgQ2xvdWRiYXNlRXZlbnQge1xuICBwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEVycm9yXG4gIGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvciwgZGF0YT86IGFueSkge1xuICAgIHN1cGVyKCdlcnJvcicsIHsgZXJyb3IsIGRhdGEgfSlcbiAgICB0aGlzLmVycm9yID0gZXJyb3JcbiAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudEVtaXR0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZUV2ZW50RW1pdHRlciBpbXBsZW1lbnRzIElDbG91ZGJhc2VFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJlYWRvbmx5XG4gICAqIEBwcm9wZXJ0eSB7TGlzdGVuZXJzfSBsaXN0ZW5lcnMgLSDlk43lupTlh73mlbDpm4blkIhcbiAgICogQGRlZmF1bHQgYHt9YFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lcnM6IExpc3RlbmVycyA9IHt9XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG1ldGhvZCBvbiAtIOa3u+WKoOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb24obmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB0aGlzIHtcbiAgICBjdXN0b21lQWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5saXN0ZW5lcnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIG9mZiAtIOenu+mZpOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb2ZmKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdGhpcyB7XG4gICAgY3VzdG9tUmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5saXN0ZW5lcnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIGZpcmUgLSDop6blj5Hkuovku7ZcbiAgICogQHBhcmFtIHtzdHJpbmd8Q2xvdWRiYXNlRXZlbnR9IGV2ZW50IC0gZXZlbnRcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBmaXJlKGV2ZW50OiBzdHJpbmcgfCBDbG91ZGJhc2VFdmVudCwgZGF0YT86IGFueSk6IHRoaXMge1xuICAgIC8vIOaJk+WNsOmUmeivr+S/oeaBr1xuICAgIGlmIChpc0luc3RhbmNlT2YoZXZlbnQsIElFcnJvckV2ZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcigoZXZlbnQgYXMgSUVycm9yRXZlbnQpLmVycm9yKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBjb25zdCBldjogQ2xvdWRiYXNlRXZlbnQgPSBpc1N0cmluZyhldmVudCkgPyBuZXcgQ2xvdWRiYXNlRXZlbnQoZXZlbnQgYXMgc3RyaW5nLCBkYXRhIHx8IHt9KSA6IGV2ZW50IGFzIENsb3VkYmFzZUV2ZW50XG5cbiAgICBjb25zdCB7IG5hbWUgfSA9IGV2XG5cbiAgICBpZiAodGhpcy5saXN0ZW5zKG5hbWUpKSB7XG4gICAgICBldi50YXJnZXQgPSB0aGlzXG5cbiAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnNbbmFtZV0gPyBbLi4udGhpcy5saXN0ZW5lcnNbbmFtZV1dIDogW11cbiAgICAgIGZvciAoY29uc3QgZm4gb2YgaGFuZGxlcnMpIHtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBldilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZXRob2QgbGlzdGVucyAtIOWIpOaWreaYr+WQpuebkeWQrOS6hm5hbWXkuovku7ZcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBldmVudOWQjeensFxuICAgKiBAcmV0dXJuIGBib29sZWFuYFxuICAgKi9cbiAgcHJpdmF0ZSBsaXN0ZW5zKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc1tuYW1lXSAmJiB0aGlzLmxpc3RlbmVyc1tuYW1lXS5sZW5ndGggPiAwXG4gIH1cbn1cblxuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKClcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGV2ZW50RW1pdHRlci5vbihldmVudCwgY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZUV2ZW50KGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KSB7XG4gIGV2ZW50RW1pdHRlci5maXJlKGV2ZW50LCBkYXRhKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgZXZlbnRFbWl0dGVyLm9mZihldmVudCwgY2FsbGJhY2spXG59XG4iXX0=