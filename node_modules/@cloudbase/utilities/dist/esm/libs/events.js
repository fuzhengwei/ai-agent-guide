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
import { isString, isInstanceOf } from './util';
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
export { CloudbaseEvent };
var IErrorEvent = (function (_super) {
    __extends(IErrorEvent, _super);
    function IErrorEvent(error, data) {
        var _this = _super.call(this, 'error', { error: error, data: data }) || this;
        _this.error = error;
        return _this;
    }
    return IErrorEvent;
}(CloudbaseEvent));
export { IErrorEvent };
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
        if (isInstanceOf(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        var ev = isString(event) ? new CloudbaseEvent(event, data || {}) : event;
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
export { CloudbaseEventEmitter };
var eventEmitter = new CloudbaseEventEmitter();
export function addEventListener(event, callback) {
    eventEmitter.on(event, callback);
}
export function activateEvent(event, data) {
    if (data === void 0) { data = {}; }
    eventEmitter.fire(event, data);
}
export function removeEventListener(event, callback) {
    eventEmitter.off(event, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBVy9DLFNBQVMsdUJBQXVCLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsU0FBb0I7SUFDckYsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBUUQsU0FBUyx5QkFBeUIsQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxTQUFvQjtJQUN2RixJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRyxJQUFJLENBQUMsRUFBRTtRQUNyQixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQy9DLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ2pDO0tBQ0Y7QUFDSCxDQUFDO0FBWUQ7SUFLRSx3QkFBWSxJQUFZLEVBQUUsSUFBUztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUE7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7O0FBUUQ7SUFBaUMsK0JBQWM7SUFFN0MscUJBQVksS0FBWSxFQUFFLElBQVU7UUFBcEMsWUFDRSxrQkFBTSxPQUFPLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLFNBRWhDO1FBREMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7O0lBQ3BCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFORCxDQUFpQyxjQUFjLEdBTTlDOztBQUtEO0lBQUE7UUFPbUIsY0FBUyxHQUFjLEVBQUUsQ0FBQTtJQThENUMsQ0FBQztJQXJEUSxrQ0FBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWtCO1FBQ3hDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQVFNLG1DQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBa0I7UUFDekMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBT00sb0NBQUksR0FBWCxVQUFZLEtBQThCLEVBQUUsSUFBVTtRQUVwRCxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBRSxLQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFFRCxJQUFNLEVBQUUsR0FBbUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxLQUFlLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUF1QixDQUFBO1FBRTlHLElBQUEsSUFBSSxHQUFLLEVBQUUsS0FBUCxDQUFPO1FBRW5CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUVoQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBRSxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ3RFLEtBQWlCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO2dCQUF0QixJQUFNLEVBQUUsaUJBQUE7Z0JBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDbEI7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQVFPLHVDQUFPLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFyRUQsSUFxRUM7O0FBR0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFBO0FBRWhELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7SUFDaEUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbEMsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBYSxFQUFFLElBQWM7SUFBZCxxQkFBQSxFQUFBLFNBQWM7SUFDekQsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7SUFDbkUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzU3RyaW5nLCBpc0luc3RhbmNlT2YgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBMaXN0ZW5lcnMsIElDbG91ZGJhc2VFdmVudEVtaXR0ZXIgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2V2ZW50cydcblxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXIgLSDmt7vliqDnm5HlkKxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gKiBAcGFyYW0ge0xpc3RlbmVyc30gbGlzdGVuZXJzIC0g5bey5a2Y5ZON5bqU5Ye95pWw6ZuG5ZCIXG4gKi9cbmZ1bmN0aW9uIGN1c3RvbWVBZGRFdmVudExpc3RlbmVyKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uLCBsaXN0ZW5lcnM6IExpc3RlbmVycykge1xuICBsaXN0ZW5lcnNbbmFtZV0gPSBsaXN0ZW5lcnNbbmFtZV0gfHwgW11cbiAgbGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpXG59XG4vKipcbiAqIEBwcml2YXRlXG4gKiBAZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIgLSDnp7vpmaTnm5HlkKxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gKiBAcGFyYW0ge0xpc3RlbmVyc30gbGlzdGVuZXJzIC0g5bey5a2Y5ZON5bqU5Ye95pWw6ZuG5ZCIXG4gKi9cbmZ1bmN0aW9uIGN1c3RvbVJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24sIGxpc3RlbmVyczogTGlzdGVuZXJzKSB7XG4gIGlmIChsaXN0ZW5lcnM/LltuYW1lXSkge1xuICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzW25hbWVdLmluZGV4T2YobGlzdGVuZXIpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgbGlzdGVuZXJzW25hbWVdLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbn1cbmludGVyZmFjZSBJRXZlbnQge1xuICBuYW1lOiBzdHJpbmc7XG4gIHRhcmdldDogYW55O1xuICBkYXRhOiBhbnk7XG59XG4vKipcbiAqIOiHquWumuS5ieS6i+S7tlxuICogQGNsYXNzIENsb3VkYmFzZUV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIOexu+Wei1xuICogQHBhcmFtIHthbnl9IGRhdGEgLSDmlbDmja5cbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZUV2ZW50IGltcGxlbWVudHMgSUV2ZW50IHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZ1xuICBwdWJsaWMgdGFyZ2V0OiBhbnlcbiAgcHVibGljIGRhdGE6IGFueVxuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCBudWxsXG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICB9XG59XG4vKipcbiAqIOiHquWumuS5iemUmeivr+S6i+S7tlxuICogQGNsYXNzIElFcnJvckV2ZW50XG4gKiBAZXh0ZW5kcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgLSDplJnor6/kv6Hmga/lr7nosaFcbiAqIEBwYXJhbSB7YW55fSBkYXRhICAtIOaVsOaNrlxuICovXG5leHBvcnQgY2xhc3MgSUVycm9yRXZlbnQgZXh0ZW5kcyBDbG91ZGJhc2VFdmVudCB7XG4gIHB1YmxpYyByZWFkb25seSBlcnJvcjogRXJyb3JcbiAgY29uc3RydWN0b3IoZXJyb3I6IEVycm9yLCBkYXRhPzogYW55KSB7XG4gICAgc3VwZXIoJ2Vycm9yJywgeyBlcnJvciwgZGF0YSB9KVxuICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICB9XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZUV2ZW50RW1pdHRlclxuICovXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSUNsb3VkYmFzZUV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmVhZG9ubHlcbiAgICogQHByb3BlcnR5IHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOWTjeW6lOWHveaVsOmbhuWQiFxuICAgKiBAZGVmYXVsdCBge31gXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyczogTGlzdGVuZXJzID0ge31cblxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIG9uIC0g5re75Yqg55uR5ZCsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSDlk43lupTlh73mlbBcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBvbihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbik6IHRoaXMge1xuICAgIGN1c3RvbWVBZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCB0aGlzLmxpc3RlbmVycylcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqIEBtZXRob2Qgb2ZmIC0g56e76Zmk55uR5ZCsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSDlk43lupTlh73mlbBcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBvZmYobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB0aGlzIHtcbiAgICBjdXN0b21SZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCB0aGlzLmxpc3RlbmVycylcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqIEBtZXRob2QgZmlyZSAtIOinpuWPkeS6i+S7tlxuICAgKiBAcGFyYW0ge3N0cmluZ3xDbG91ZGJhc2VFdmVudH0gZXZlbnQgLSBldmVudFxuICAgKiBAcmV0dXJuIGB0aGlzYFxuICAgKi9cbiAgcHVibGljIGZpcmUoZXZlbnQ6IHN0cmluZyB8IENsb3VkYmFzZUV2ZW50LCBkYXRhPzogYW55KTogdGhpcyB7XG4gICAgLy8g5omT5Y2w6ZSZ6K+v5L+h5oGvXG4gICAgaWYgKGlzSW5zdGFuY2VPZihldmVudCwgSUVycm9yRXZlbnQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKChldmVudCBhcyBJRXJyb3JFdmVudCkuZXJyb3IpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGNvbnN0IGV2OiBDbG91ZGJhc2VFdmVudCA9IGlzU3RyaW5nKGV2ZW50KSA/IG5ldyBDbG91ZGJhc2VFdmVudChldmVudCBhcyBzdHJpbmcsIGRhdGEgfHwge30pIDogZXZlbnQgYXMgQ2xvdWRiYXNlRXZlbnRcblxuICAgIGNvbnN0IHsgbmFtZSB9ID0gZXZcblxuICAgIGlmICh0aGlzLmxpc3RlbnMobmFtZSkpIHtcbiAgICAgIGV2LnRhcmdldCA9IHRoaXNcblxuICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVyc1tuYW1lXSA/IFsuLi50aGlzLmxpc3RlbmVyc1tuYW1lXV0gOiBbXVxuICAgICAgZm9yIChjb25zdCBmbiBvZiBoYW5kbGVycykge1xuICAgICAgICBmbi5jYWxsKHRoaXMsIGV2KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQG1ldGhvZCBsaXN0ZW5zIC0g5Yik5pat5piv5ZCm55uR5ZCs5LqGbmFtZeS6i+S7tlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEByZXR1cm4gYGJvb2xlYW5gXG4gICAqL1xuICBwcml2YXRlIGxpc3RlbnMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzW25hbWVdICYmIHRoaXMubGlzdGVuZXJzW25hbWVdLmxlbmd0aCA+IDBcbiAgfVxufVxuXG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgZXZlbnRFbWl0dGVyLm9uKGV2ZW50LCBjYWxsYmFjaylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlRXZlbnQoZXZlbnQ6IHN0cmluZywgZGF0YTogYW55ID0ge30pIHtcbiAgZXZlbnRFbWl0dGVyLmZpcmUoZXZlbnQsIGRhdGEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICBldmVudEVtaXR0ZXIub2ZmKGV2ZW50LCBjYWxsYmFjaylcbn1cbiJdfQ==