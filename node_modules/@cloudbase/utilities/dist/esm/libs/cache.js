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
import { AbstractStorage } from '@cloudbase/adapter-interface';
import { printWarn } from './util';
import { ERRORS, getSdkName } from '../constants';
var TcbCacheObject = (function (_super) {
    __extends(TcbCacheObject, _super);
    function TcbCacheObject(root) {
        var _this = _super.call(this) || this;
        _this.root = root;
        if (!root.tcbCacheObject) {
            root.tcbCacheObject = {};
        }
        return _this;
    }
    TcbCacheObject.prototype.setItem = function (key, value) {
        this.root.tcbCacheObject[key] = value;
    };
    TcbCacheObject.prototype.getItem = function (key) {
        return this.root.tcbCacheObject[key];
    };
    TcbCacheObject.prototype.removeItem = function (key) {
        delete this.root.tcbCacheObject[key];
    };
    TcbCacheObject.prototype.clear = function () {
        delete this.root.tcbCacheObject;
    };
    return TcbCacheObject;
}(AbstractStorage));
function createStorage(persistence, adapter) {
    switch (persistence) {
        case 'local':
            if (!adapter.localStorage) {
                printWarn(ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
        case 'none':
            return new TcbCacheObject(adapter.root);
        default:
            if (!adapter.localStorage) {
                printWarn(ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
    }
}
var CloudbaseCache = (function () {
    function CloudbaseCache(config) {
        this.keys = {};
        var persistence = config.persistence, _a = config.platformInfo, platformInfo = _a === void 0 ? {} : _a, _b = config.keys, keys = _b === void 0 ? {} : _b;
        this.platformInfo = platformInfo;
        if (!this.storage) {
            this.persistenceTag = this.platformInfo.adapter.primaryStorage || persistence;
            this.storage = createStorage(this.persistenceTag, this.platformInfo.adapter);
            this.keys = keys;
        }
    }
    Object.defineProperty(CloudbaseCache.prototype, "mode", {
        get: function () {
            return this.storage.mode || 'sync';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudbaseCache.prototype, "persistence", {
        get: function () {
            return this.persistenceTag;
        },
        enumerable: false,
        configurable: true
    });
    CloudbaseCache.prototype.setStore = function (key, value, version) {
        if (this.mode === 'async') {
            printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use setStoreAsync insteed');
            return;
        }
        if (!this.storage) {
            return;
        }
        try {
            var val = {
                version: version || 'localCachev1',
                content: value,
            };
            this.storage.setItem(key, JSON.stringify(val));
        }
        catch (e) {
            throw new Error(JSON.stringify({
                code: ERRORS.OPERATION_FAIL,
                msg: "[".concat(getSdkName(), "][").concat(ERRORS.OPERATION_FAIL, "]setStore failed"),
                info: e,
            }));
        }
        return;
    };
    CloudbaseCache.prototype.setStoreAsync = function (key, value, version) {
        return __awaiter(this, void 0, void 0, function () {
            var val, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storage) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        val = {
                            version: version || 'localCachev1',
                            content: value,
                        };
                        return [4, this.storage.setItem(key, JSON.stringify(val))];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    CloudbaseCache.prototype.getStore = function (key, version) {
        var _a;
        if (this.mode === 'async') {
            printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getStoreAsync insteed');
            return;
        }
        try {
            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
                return process.env.tcb_token;
            }
            if (!this.storage) {
                return '';
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        var content = this.storage.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            var d = JSON.parse(content);
            return d.content;
        }
        return '';
    };
    CloudbaseCache.prototype.getStoreAsync = function (key, version) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var content, d;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        try {
                            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
                                return [2, process.env.tcb_token];
                            }
                            if (!this.storage) {
                                return [2, ''];
                            }
                        }
                        catch (e) {
                            return [2, ''];
                        }
                        version = version || 'localCachev1';
                        return [4, this.storage.getItem(key)];
                    case 1:
                        content = _b.sent();
                        if (!content) {
                            return [2, ''];
                        }
                        if (content.indexOf(version) >= 0) {
                            d = JSON.parse(content);
                            return [2, d.content];
                        }
                        return [2, ''];
                }
            });
        });
    };
    CloudbaseCache.prototype.removeStore = function (key) {
        if (this.mode === 'async') {
            printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use removeStoreAsync insteed');
            return;
        }
        this.storage.removeItem(key);
    };
    CloudbaseCache.prototype.removeStoreAsync = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.storage.removeItem(key)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return CloudbaseCache;
}());
export { CloudbaseCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBdUIsTUFBTSw4QkFBOEIsQ0FBQTtBQUdyRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBS2pEO0lBQTZCLGtDQUFlO0lBRTFDLHdCQUFZLElBQVM7UUFBckIsWUFDRSxpQkFBTyxTQUtSO1FBSkMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUE7U0FDekI7O0lBQ0gsQ0FBQztJQUNNLGdDQUFPLEdBQWQsVUFBZSxHQUFXLEVBQUUsS0FBVTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7SUFDdkMsQ0FBQztJQUNNLGdDQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNNLG1DQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBQ00sOEJBQUssR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUE7SUFDakMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUE2QixlQUFlLEdBcUIzQztBQUlELFNBQVMsYUFBYSxDQUFDLFdBQXdCLEVBQUUsT0FBNEI7SUFDM0UsUUFBUSxXQUFXLEVBQUU7UUFDbkIsS0FBSyxPQUFPO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLG1EQUFtRCxDQUFDLENBQUE7Z0JBRXJGLE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3hDO1lBQ0QsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFBO1FBQzdCLEtBQUssTUFBTTtZQUNULE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pDO1lBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLG1EQUFtRCxDQUFDLENBQUE7Z0JBRXJGLE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3hDO1lBQ0QsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFBO0tBQzlCO0FBQ0gsQ0FBQztBQUVEO0lBT0Usd0JBQVksTUFBb0I7UUFOekIsU0FBSSxHQUFlLEVBQUUsQ0FBQTtRQU9sQixJQUFBLFdBQVcsR0FBbUMsTUFBTSxZQUF6QyxFQUFFLEtBQWlDLE1BQU0sYUFBdEIsRUFBakIsWUFBWSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFjLE1BQU0sS0FBWCxFQUFULElBQUksbUJBQUcsRUFBRSxLQUFBLENBQVc7UUFDNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksV0FBVyxDQUFBO1lBQzdFLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM1RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtTQUNqQjtJQUNILENBQUM7SUFJRCxzQkFBSSxnQ0FBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUE7UUFDcEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx1Q0FBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO1FBQzVCLENBQUM7OztPQUFBO0lBRU0saUNBQVEsR0FBZixVQUFnQixHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWE7UUFDcEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLCtFQUErRSxDQUFDLENBQUE7WUFDcEgsT0FBTTtTQUNQO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTTtTQUNQO1FBRUQsSUFBSTtZQUNGLElBQU0sR0FBRyxHQUFHO2dCQUNWLE9BQU8sRUFBRSxPQUFPLElBQUksY0FBYztnQkFDbEMsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFBO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUMvQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0JBQzNCLEdBQUcsRUFBRSxXQUFJLFVBQVUsRUFBRSxlQUFLLE1BQU0sQ0FBQyxjQUFjLHFCQUFrQjtnQkFDakUsSUFBSSxFQUFFLENBQUM7YUFDUixDQUFDLENBQUMsQ0FBQTtTQUNKO1FBRUQsT0FBTTtJQUNSLENBQUM7SUFDWSxzQ0FBYSxHQUExQixVQUEyQixHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWE7Ozs7Ozt3QkFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2pCLFdBQU07eUJBQ1A7Ozs7d0JBR08sR0FBRyxHQUFHOzRCQUNWLE9BQU8sRUFBRSxPQUFPLElBQUksY0FBYzs0QkFDbEMsT0FBTyxFQUFFLEtBQUs7eUJBQ2YsQ0FBQTt3QkFDRCxXQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFBOzs7O3dCQUVwRCxXQUFNOzRCQUdSLFdBQU07Ozs7S0FDUDtJQUNNLGlDQUFRLEdBQWYsVUFBZ0IsR0FBVyxFQUFFLE9BQWdCOztRQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsK0VBQStFLENBQUMsQ0FBQTtZQUNwSCxPQUFNO1NBQ1A7UUFDRCxJQUFJO1lBRUYsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUksTUFBQSxPQUFPLENBQUMsR0FBRywwQ0FBRSxTQUFTLENBQUEsRUFBRTtnQkFDNUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTthQUM3QjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPLEVBQUUsQ0FBQTthQUNWO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7UUFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLGNBQWMsQ0FBQTtRQUVuQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUE7U0FDVjtRQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUE7U0FDakI7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFDWSxzQ0FBYSxHQUExQixVQUEyQixHQUFXLEVBQUUsT0FBZ0I7Ozs7Ozs7d0JBQ3RELElBQUk7NEJBRUYsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUksTUFBQSxPQUFPLENBQUMsR0FBRywwQ0FBRSxTQUFTLENBQUEsRUFBRTtnQ0FDNUQsV0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQTs2QkFDN0I7NEJBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0NBQ2pCLFdBQU8sRUFBRSxFQUFBOzZCQUNWO3lCQUNGO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNWLFdBQU8sRUFBRSxFQUFBO3lCQUNWO3dCQUVELE9BQU8sR0FBRyxPQUFPLElBQUksY0FBYyxDQUFBO3dCQUVuQixXQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBekMsT0FBTyxHQUFHLFNBQStCO3dCQUMvQyxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNaLFdBQU8sRUFBRSxFQUFBO3lCQUNWO3dCQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzNCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOzRCQUM3QixXQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUE7eUJBQ2pCO3dCQUNELFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFDTSxvQ0FBVyxHQUFsQixVQUFtQixHQUFXO1FBQzVCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxrRkFBa0YsQ0FBQyxDQUFBO1lBQ3ZILE9BQU07U0FDUDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDWSx5Q0FBZ0IsR0FBN0IsVUFBOEIsR0FBVzs7Ozs0QkFDdkMsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUE7Ozs7O0tBQ25DO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBeElELElBd0lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUludGVyZmFjZSwgQWJzdHJhY3RTdG9yYWdlLCBTREtBZGFwdGVySW50ZXJmYWNlIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSdcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSwgSUNhY2hlQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSdcbmltcG9ydCB7IEtWLCBQZXJzaXN0ZW5jZSwgSUNsb3VkYmFzZVBsYXRmb3JtSW5mbyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnXG5pbXBvcnQgeyBwcmludFdhcm4gfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBFUlJPUlMsIGdldFNka05hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnXG5cbi8qKlxuICogcGVyc2l0ZW5jZT1ub25l5pe255m75b2V5oCB5L+d5a2Y5Zyo5YaF5a2Y5LitXG4gKi9cbmNsYXNzIFRjYkNhY2hlT2JqZWN0IGV4dGVuZHMgQWJzdHJhY3RTdG9yYWdlIHtcbiAgcHJpdmF0ZSByZWFkb25seSByb290OiBhbnlcbiAgY29uc3RydWN0b3Iocm9vdDogYW55KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMucm9vdCA9IHJvb3RcbiAgICBpZiAoIXJvb3QudGNiQ2FjaGVPYmplY3QpIHtcbiAgICAgIHJvb3QudGNiQ2FjaGVPYmplY3QgPSB7fVxuICAgIH1cbiAgfVxuICBwdWJsaWMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMucm9vdC50Y2JDYWNoZU9iamVjdFtrZXldID0gdmFsdWVcbiAgfVxuICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJvb3QudGNiQ2FjaGVPYmplY3Rba2V5XVxuICB9XG4gIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgZGVsZXRlIHRoaXMucm9vdC50Y2JDYWNoZU9iamVjdFtrZXldXG4gIH1cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIGRlbGV0ZSB0aGlzLnJvb3QudGNiQ2FjaGVPYmplY3RcbiAgfVxufVxuLyoqXG4gKiDlt6XljoLlh73mlbBcbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RvcmFnZShwZXJzaXN0ZW5jZTogUGVyc2lzdGVuY2UsIGFkYXB0ZXI6IFNES0FkYXB0ZXJJbnRlcmZhY2UpOiBTdG9yYWdlSW50ZXJmYWNlIHtcbiAgc3dpdGNoIChwZXJzaXN0ZW5jZSkge1xuICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgIGlmICghYWRhcHRlci5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2xvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgcGxhdGZvcm0nKVxuICAgICAgICAvLyDkuI3mlK/mjIFsb2NhbHN0b3JhZ2XnmoTlubPlj7DpmY3nuqfkuLpub25lXG4gICAgICAgIHJldHVybiBuZXcgVGNiQ2FjaGVPYmplY3QoYWRhcHRlci5yb290KVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFkYXB0ZXIubG9jYWxTdG9yYWdlXG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdClcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKCFhZGFwdGVyLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAnbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQgb24gY3VycmVudCBwbGF0Zm9ybScpXG4gICAgICAgIC8vIOS4jeaUr+aMgWxvY2Fsc3RvcmFnZeeahOW5s+WPsOmZjee6p+S4um5vbmVcbiAgICAgICAgcmV0dXJuIG5ldyBUY2JDYWNoZU9iamVjdChhZGFwdGVyLnJvb3QpXG4gICAgICB9XG4gICAgICByZXR1cm4gYWRhcHRlci5sb2NhbFN0b3JhZ2VcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlQ2FjaGUgaW1wbGVtZW50cyBJQ2xvdWRiYXNlQ2FjaGUge1xuICBwdWJsaWMga2V5czogS1Y8c3RyaW5nPiA9IHt9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0ZW5jZVRhZzogUGVyc2lzdGVuY2VcbiAgcHJpdmF0ZSBwbGF0Zm9ybUluZm86IElDbG91ZGJhc2VQbGF0Zm9ybUluZm9cbiAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlSW50ZXJmYWNlXG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2FjaGVDb25maWcpIHtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBwbGF0Zm9ybUluZm8gPSB7fSwga2V5cyA9IHt9IH0gPSBjb25maWdcbiAgICB0aGlzLnBsYXRmb3JtSW5mbyA9IHBsYXRmb3JtSW5mb1xuICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICB0aGlzLnBlcnNpc3RlbmNlVGFnID0gdGhpcy5wbGF0Zm9ybUluZm8uYWRhcHRlci5wcmltYXJ5U3RvcmFnZSB8fCBwZXJzaXN0ZW5jZVxuICAgICAgdGhpcy5zdG9yYWdlID0gY3JlYXRlU3RvcmFnZSh0aGlzLnBlcnNpc3RlbmNlVGFnLCB0aGlzLnBsYXRmb3JtSW5mby5hZGFwdGVyKVxuICAgICAgdGhpcy5rZXlzID0ga2V5c1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQGdldHRlciBzdG9yYWdl5qih5byPLeWQjOatpS/lvILmraVcbiAgICovXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UubW9kZSB8fCAnc3luYydcbiAgfVxuICBnZXQgcGVyc2lzdGVuY2UoKTogUGVyc2lzdGVuY2Uge1xuICAgIHJldHVybiB0aGlzLnBlcnNpc3RlbmNlVGFnXG4gIH1cblxuICBwdWJsaWMgc2V0U3RvcmUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHZlcnNpb24/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2Ugc2V0U3RvcmVBc3luYyBpbnN0ZWVkJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RvcmFnZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJyxcbiAgICAgICAgY29udGVudDogdmFsdWUsXG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5PUEVSQVRJT05fRkFJTH1dc2V0U3RvcmUgZmFpbGVkYCxcbiAgICAgICAgaW5mbzogZSxcbiAgICAgIH0pKVxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yZUFzeW5jKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogYW55KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JhZ2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWwgPSB7XG4gICAgICAgIHZlcnNpb246IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MScsXG4gICAgICAgIGNvbnRlbnQ6IHZhbHVlLFxuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG4gIHB1YmxpYyBnZXRTdG9yZShrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRTdG9yZUFzeW5jIGluc3RlZWQnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyDmtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHZlcnNpb24gPSB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnXG5cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KVxuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZih2ZXJzaW9uKSA+PSAwKSB7XG4gICAgICBjb25zdCBkID0gSlNPTi5wYXJzZShjb250ZW50KVxuICAgICAgcmV0dXJuIGQuY29udGVudFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0U3RvcmVBc3luYyhrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvLyDmtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHZlcnNpb24gPSB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KVxuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZih2ZXJzaW9uKSA+PSAwKSB7XG4gICAgICBjb25zdCBkID0gSlNPTi5wYXJzZShjb250ZW50KVxuICAgICAgcmV0dXJuIGQuY29udGVudFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuICBwdWJsaWMgcmVtb3ZlU3RvcmUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgcmVtb3ZlU3RvcmVBc3luYyBpbnN0ZWVkJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH1cbiAgcHVibGljIGFzeW5jIHJlbW92ZVN0b3JlQXN5bmMoa2V5OiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH1cbn1cbiJdfQ==