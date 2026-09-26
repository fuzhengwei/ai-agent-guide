export var StorageType;
(function (StorageType) {
    StorageType["local"] = "local";
    StorageType["none"] = "none";
    StorageType["session"] = "session";
})(StorageType || (StorageType = {}));
var AbstractSDKRequest = (function () {
    function AbstractSDKRequest() {
    }
    return AbstractSDKRequest;
}());
export { AbstractSDKRequest };
var AbstractStorage = (function () {
    function AbstractStorage() {
    }
    return AbstractStorage;
}());
export { AbstractStorage };
