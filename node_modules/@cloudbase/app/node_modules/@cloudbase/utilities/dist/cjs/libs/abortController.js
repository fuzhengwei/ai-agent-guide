"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = AbortController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvYWJvcnRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFXRTtRQUFBLGlCQUFnQjtRQVZoQixjQUFTLEdBQTRCLEVBQUUsQ0FBQTtRQUN2QyxXQUFNLEdBQUc7WUFDUCxPQUFPLEVBQUUsS0FBSztZQUNkLGdCQUFnQixFQUFFLFVBQUMsQ0FBUyxFQUFFLENBQW1CO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUU7b0JBQ2pCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN2QjtZQUNILENBQUM7U0FDRixDQUFBO0lBRWMsQ0FBQztJQUVoQiwrQkFBSyxHQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFNO1FBRS9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBYm9ydENvbnRyb2xsZXIge1xuICBsaXN0ZW5lcnM6IEFycmF5PENhbGxhYmxlRnVuY3Rpb24+ID0gW11cbiAgc2lnbmFsID0ge1xuICAgIGFib3J0ZWQ6IGZhbHNlLFxuICAgIGFkZEV2ZW50TGlzdGVuZXI6IChlOiBzdHJpbmcsIGY6IENhbGxhYmxlRnVuY3Rpb24pID0+IHtcbiAgICAgIGlmIChlID09PSAnYWJvcnQnKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goZilcbiAgICAgIH1cbiAgICB9LFxuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlbGVzcy1jb25zdHJ1Y3RvclxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgYWJvcnQoKSB7XG4gICAgaWYgKHRoaXMuc2lnbmFsLmFib3J0ZWQpIHJldHVyblxuXG4gICAgdGhpcy5zaWduYWwuYWJvcnRlZCA9IHRydWVcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGYgPT4gZigpKVxuICB9XG59XG4iXX0=