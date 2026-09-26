var AbortController = (function () {
    function AbortController() {
        var _this = this;
        this.listeners = [];
        this.signal = {
            aborted: false,
            addEventListener: function (e, f) {
                if (e === 'abort') {
                    _this.listeners.push(f);
                }
            },
        };
    }
    AbortController.prototype.abort = function () {
        if (this.signal.aborted)
            return;
        this.signal.aborted = true;
        this.listeners.forEach(function (f) { return f(); });
    };
    return AbortController;
}());
export default AbortController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvYWJvcnRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBV0U7UUFBQSxpQkFBZ0I7UUFWaEIsY0FBUyxHQUE0QixFQUFFLENBQUE7UUFDdkMsV0FBTSxHQUFHO1lBQ1AsT0FBTyxFQUFFLEtBQUs7WUFDZCxnQkFBZ0IsRUFBRSxVQUFDLENBQVMsRUFBRSxDQUFtQjtnQkFDL0MsSUFBSSxDQUFDLEtBQUssT0FBTyxFQUFFO29CQUNqQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDdkI7WUFDSCxDQUFDO1NBQ0YsQ0FBQTtJQUVjLENBQUM7SUFFaEIsK0JBQUssR0FBTDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsRUFBSCxDQUFHLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJvcnRDb250cm9sbGVyIHtcbiAgbGlzdGVuZXJzOiBBcnJheTxDYWxsYWJsZUZ1bmN0aW9uPiA9IFtdXG4gIHNpZ25hbCA9IHtcbiAgICBhYm9ydGVkOiBmYWxzZSxcbiAgICBhZGRFdmVudExpc3RlbmVyOiAoZTogc3RyaW5nLCBmOiBDYWxsYWJsZUZ1bmN0aW9uKSA9PiB7XG4gICAgICBpZiAoZSA9PT0gJ2Fib3J0Jykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGYpXG4gICAgICB9XG4gICAgfSxcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZWxlc3MtY29uc3RydWN0b3JcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFib3J0KCkge1xuICAgIGlmICh0aGlzLnNpZ25hbC5hYm9ydGVkKSByZXR1cm5cblxuICAgIHRoaXMuc2lnbmFsLmFib3J0ZWQgPSB0cnVlXG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChmID0+IGYoKSlcbiAgfVxufVxuIl19