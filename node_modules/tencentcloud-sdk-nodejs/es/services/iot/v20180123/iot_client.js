import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iot.tencentcloudapi.com", "2018-01-23", clientConfig);
    }
    async GetDataHistory(req, cb) {
        return this.request("GetDataHistory", req, cb);
    }
    async ResetDevice(req, cb) {
        return this.request("ResetDevice", req, cb);
    }
    async GetDeviceStatistics(req, cb) {
        return this.request("GetDeviceStatistics", req, cb);
    }
    async AppSecureAddDevice(req, cb) {
        return this.request("AppSecureAddDevice", req, cb);
    }
    async IssueDeviceControl(req, cb) {
        return this.request("IssueDeviceControl", req, cb);
    }
    async GetDebugLog(req, cb) {
        return this.request("GetDebugLog", req, cb);
    }
    async DeactivateRule(req, cb) {
        return this.request("DeactivateRule", req, cb);
    }
    async GetDevices(req, cb) {
        return this.request("GetDevices", req, cb);
    }
    async AddTopic(req, cb) {
        return this.request("AddTopic", req, cb);
    }
    async AppGetDeviceStatuses(req, cb) {
        return this.request("AppGetDeviceStatuses", req, cb);
    }
    async GetProducts(req, cb) {
        return this.request("GetProducts", req, cb);
    }
    async AppGetToken(req, cb) {
        return this.request("AppGetToken", req, cb);
    }
    async AppUpdateUser(req, cb) {
        return this.request("AppUpdateUser", req, cb);
    }
    async AddRule(req, cb) {
        return this.request("AddRule", req, cb);
    }
    async UnassociateSubDeviceFromGatewayProduct(req, cb) {
        return this.request("UnassociateSubDeviceFromGatewayProduct", req, cb);
    }
    async GetDeviceSignatures(req, cb) {
        return this.request("GetDeviceSignatures", req, cb);
    }
    async DeleteRule(req, cb) {
        return this.request("DeleteRule", req, cb);
    }
    async AddProduct(req, cb) {
        return this.request("AddProduct", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async PublishMsg(req, cb) {
        return this.request("PublishMsg", req, cb);
    }
    async UpdateRule(req, cb) {
        return this.request("UpdateRule", req, cb);
    }
    async AppDeleteDevice(req, cb) {
        return this.request("AppDeleteDevice", req, cb);
    }
    async GetDeviceStatuses(req, cb) {
        return this.request("GetDeviceStatuses", req, cb);
    }
    async GetRules(req, cb) {
        return this.request("GetRules", req, cb);
    }
    async DeleteProduct(req, cb) {
        return this.request("DeleteProduct", req, cb);
    }
    async AppGetUser(req, cb) {
        return this.request("AppGetUser", req, cb);
    }
    async AppGetDevices(req, cb) {
        return this.request("AppGetDevices", req, cb);
    }
    async AppAddUser(req, cb) {
        return this.request("AppAddUser", req, cb);
    }
    async UpdateProduct(req, cb) {
        return this.request("UpdateProduct", req, cb);
    }
    async AppIssueDeviceControl(req, cb) {
        return this.request("AppIssueDeviceControl", req, cb);
    }
    async GetTopic(req, cb) {
        return this.request("GetTopic", req, cb);
    }
    async AppGetDeviceData(req, cb) {
        return this.request("AppGetDeviceData", req, cb);
    }
    async GetDevice(req, cb) {
        return this.request("GetDevice", req, cb);
    }
    async AppGetDevice(req, cb) {
        return this.request("AppGetDevice", req, cb);
    }
    async GetDeviceData(req, cb) {
        return this.request("GetDeviceData", req, cb);
    }
    async GetRule(req, cb) {
        return this.request("GetRule", req, cb);
    }
    async GetDeviceLog(req, cb) {
        return this.request("GetDeviceLog", req, cb);
    }
    async GetTopics(req, cb) {
        return this.request("GetTopics", req, cb);
    }
    async AddDevice(req, cb) {
        return this.request("AddDevice", req, cb);
    }
    async GetProduct(req, cb) {
        return this.request("GetProduct", req, cb);
    }
    async AppResetPassword(req, cb) {
        return this.request("AppResetPassword", req, cb);
    }
    async ActivateRule(req, cb) {
        return this.request("ActivateRule", req, cb);
    }
    async AssociateSubDeviceToGatewayProduct(req, cb) {
        return this.request("AssociateSubDeviceToGatewayProduct", req, cb);
    }
    async DeleteTopic(req, cb) {
        return this.request("DeleteTopic", req, cb);
    }
    async AppUpdateDevice(req, cb) {
        return this.request("AppUpdateDevice", req, cb);
    }
}
