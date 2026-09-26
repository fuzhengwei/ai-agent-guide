import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iotvideo.tencentcloudapi.com", "2019-11-26", clientConfig);
    }
    async DescribeOtaVersions(req, cb) {
        return this.request("DescribeOtaVersions", req, cb);
    }
    async DisableOtaVersion(req, cb) {
        return this.request("DisableOtaVersion", req, cb);
    }
    async CreateUploadTest(req, cb) {
        return this.request("CreateUploadTest", req, cb);
    }
    async ClearDeviceActiveCode(req, cb) {
        return this.request("ClearDeviceActiveCode", req, cb);
    }
    async DescribeIotDataType(req, cb) {
        return this.request("DescribeIotDataType", req, cb);
    }
    async DisableDevice(req, cb) {
        return this.request("DisableDevice", req, cb);
    }
    async DeleteTraceIds(req, cb) {
        return this.request("DeleteTraceIds", req, cb);
    }
    async RunOtaVersion(req, cb) {
        return this.request("RunOtaVersion", req, cb);
    }
    async DescribeDevice(req, cb) {
        return this.request("DescribeDevice", req, cb);
    }
    async RunTestOtaVersion(req, cb) {
        return this.request("RunTestOtaVersion", req, cb);
    }
    async DescribeProduct(req, cb) {
        return this.request("DescribeProduct", req, cb);
    }
    async SendOnlineMsg(req, cb) {
        return this.request("SendOnlineMsg", req, cb);
    }
    async RunIotModel(req, cb) {
        return this.request("RunIotModel", req, cb);
    }
    async ModifyDevice(req, cb) {
        return this.request("ModifyDevice", req, cb);
    }
    async CreateIotDataType(req, cb) {
        return this.request("CreateIotDataType", req, cb);
    }
    async CreateAnonymousAccessToken(req, cb) {
        return this.request("CreateAnonymousAccessToken", req, cb);
    }
    async CreateDevices(req, cb) {
        return this.request("CreateDevices", req, cb);
    }
    async CreateProduct(req, cb) {
        return this.request("CreateProduct", req, cb);
    }
    async CreateIotModel(req, cb) {
        return this.request("CreateIotModel", req, cb);
    }
    async DeleteIotDataType(req, cb) {
        return this.request("DeleteIotDataType", req, cb);
    }
    async DescribeMessageQueue(req, cb) {
        return this.request("DescribeMessageQueue", req, cb);
    }
    async DescribeIotModel(req, cb) {
        return this.request("DescribeIotModel", req, cb);
    }
    async ModifyDeviceAction(req, cb) {
        return this.request("ModifyDeviceAction", req, cb);
    }
    async DescribeProducts(req, cb) {
        return this.request("DescribeProducts", req, cb);
    }
    async CreateTraceIds(req, cb) {
        return this.request("CreateTraceIds", req, cb);
    }
    async DescribeBindUsr(req, cb) {
        return this.request("DescribeBindUsr", req, cb);
    }
    async CreateAppUsr(req, cb) {
        return this.request("CreateAppUsr", req, cb);
    }
    async CreateBinding(req, cb) {
        return this.request("CreateBinding", req, cb);
    }
    async CreateDevToken(req, cb) {
        return this.request("CreateDevToken", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async DeleteAppUsr(req, cb) {
        return this.request("DeleteAppUsr", req, cb);
    }
    async DescribeRechargeRecords(req, cb) {
        return this.request("DescribeRechargeRecords", req, cb);
    }
    async ModifyProduct(req, cb) {
        return this.request("ModifyProduct", req, cb);
    }
    async DescribeLogs(req, cb) {
        return this.request("DescribeLogs", req, cb);
    }
    async RefundStorageService(req, cb) {
        return this.request("RefundStorageService", req, cb);
    }
    async CreateStorageService(req, cb) {
        return this.request("CreateStorageService", req, cb);
    }
    async SetMessageQueue(req, cb) {
        return this.request("SetMessageQueue", req, cb);
    }
    async DescribeAccountBalance(req, cb) {
        return this.request("DescribeAccountBalance", req, cb);
    }
    async DeleteProduct(req, cb) {
        return this.request("DeleteProduct", req, cb);
    }
    async DescribeOsList(req, cb) {
        return this.request("DescribeOsList", req, cb);
    }
    async DescribeIotModels(req, cb) {
        return this.request("DescribeIotModels", req, cb);
    }
    async DeleteOtaVersion(req, cb) {
        return this.request("DeleteOtaVersion", req, cb);
    }
    async DeliverStorageService(req, cb) {
        return this.request("DeliverStorageService", req, cb);
    }
    async DescribeTraceStatus(req, cb) {
        return this.request("DescribeTraceStatus", req, cb);
    }
    async DescribeStream(req, cb) {
        return this.request("DescribeStream", req, cb);
    }
    async DescribeRegistrationStatus(req, cb) {
        return this.request("DescribeRegistrationStatus", req, cb);
    }
    async DescribeRunLog(req, cb) {
        return this.request("DescribeRunLog", req, cb);
    }
    async DescribeBindDev(req, cb) {
        return this.request("DescribeBindDev", req, cb);
    }
    async DescribeStorageService(req, cb) {
        return this.request("DescribeStorageService", req, cb);
    }
    async DisableDeviceStream(req, cb) {
        return this.request("DisableDeviceStream", req, cb);
    }
    async CreateUploadPath(req, cb) {
        return this.request("CreateUploadPath", req, cb);
    }
    async DescribeModelDataRet(req, cb) {
        return this.request("DescribeModelDataRet", req, cb);
    }
    async DescribePubVersions(req, cb) {
        return this.request("DescribePubVersions", req, cb);
    }
    async RunDeviceStream(req, cb) {
        return this.request("RunDeviceStream", req, cb);
    }
    async RenewUploadTest(req, cb) {
        return this.request("RenewUploadTest", req, cb);
    }
    async ModifyVerContent(req, cb) {
        return this.request("ModifyVerContent", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async CreateGencode(req, cb) {
        return this.request("CreateGencode", req, cb);
    }
    async DescribeDeviceModel(req, cb) {
        return this.request("DescribeDeviceModel", req, cb);
    }
    async DeleteBinding(req, cb) {
        return this.request("DeleteBinding", req, cb);
    }
    async CreateStorage(req, cb) {
        return this.request("CreateStorage", req, cb);
    }
    async DescribeTraceIds(req, cb) {
        return this.request("DescribeTraceIds", req, cb);
    }
    async DeleteMessageQueue(req, cb) {
        return this.request("DeleteMessageQueue", req, cb);
    }
    async ModifyDeviceProperty(req, cb) {
        return this.request("ModifyDeviceProperty", req, cb);
    }
    async RunDevice(req, cb) {
        return this.request("RunDevice", req, cb);
    }
    async UploadOtaVersion(req, cb) {
        return this.request("UploadOtaVersion", req, cb);
    }
    async UpgradeDevice(req, cb) {
        return this.request("UpgradeDevice", req, cb);
    }
    async CreateUsrToken(req, cb) {
        return this.request("CreateUsrToken", req, cb);
    }
}
