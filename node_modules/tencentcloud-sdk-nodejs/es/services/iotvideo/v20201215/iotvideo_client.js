import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iotvideo.tencentcloudapi.com", "2020-12-15", clientConfig);
    }
    async DescribeProducts(req, cb) {
        return this.request("DescribeProducts", req, cb);
    }
    async DescribeDeviceCommLog(req, cb) {
        return this.request("DescribeDeviceCommLog", req, cb);
    }
    async CheckForwardAuth(req, cb) {
        return this.request("CheckForwardAuth", req, cb);
    }
    async DescribeDeviceData(req, cb) {
        return this.request("DescribeDeviceData", req, cb);
    }
    async DescribeSDKLog(req, cb) {
        return this.request("DescribeSDKLog", req, cb);
    }
    async ModifyProduct(req, cb) {
        return this.request("ModifyProduct", req, cb);
    }
    async TransferCloudStorage(req, cb) {
        return this.request("TransferCloudStorage", req, cb);
    }
    async ModifyDeviceLogLevel(req, cb) {
        return this.request("ModifyDeviceLogLevel", req, cb);
    }
    async CreateAIDetection(req, cb) {
        return this.request("CreateAIDetection", req, cb);
    }
    async DescribeFirmware(req, cb) {
        return this.request("DescribeFirmware", req, cb);
    }
    async DescribeCloudStorageDate(req, cb) {
        return this.request("DescribeCloudStorageDate", req, cb);
    }
    async RetryDeviceFirmwareTask(req, cb) {
        return this.request("RetryDeviceFirmwareTask", req, cb);
    }
    async DescribeAIModels(req, cb) {
        return this.request("DescribeAIModels", req, cb);
    }
    async UploadFirmware(req, cb) {
        return this.request("UploadFirmware", req, cb);
    }
    async DescribeAIModelApplications(req, cb) {
        return this.request("DescribeAIModelApplications", req, cb);
    }
    async DescribeProduct(req, cb) {
        return this.request("DescribeProduct", req, cb);
    }
    async DescribeAIModelUsage(req, cb) {
        return this.request("DescribeAIModelUsage", req, cb);
    }
    async DescribeBatch(req, cb) {
        return this.request("DescribeBatch", req, cb);
    }
    async ModifyDevice(req, cb) {
        return this.request("ModifyDevice", req, cb);
    }
    async DescribeCloudStorageUsers(req, cb) {
        return this.request("DescribeCloudStorageUsers", req, cb);
    }
    async CancelAIModelApplication(req, cb) {
        return this.request("CancelAIModelApplication", req, cb);
    }
    async ModifyDataForward(req, cb) {
        return this.request("ModifyDataForward", req, cb);
    }
    async DescribeCloudStorage(req, cb) {
        return this.request("DescribeCloudStorage", req, cb);
    }
    async DescribeBatchs(req, cb) {
        return this.request("DescribeBatchs", req, cb);
    }
    async BatchUpdateFirmware(req, cb) {
        return this.request("BatchUpdateFirmware", req, cb);
    }
    async CreateProduct(req, cb) {
        return this.request("CreateProduct", req, cb);
    }
    async DescribeDeviceActionHistory(req, cb) {
        return this.request("DescribeDeviceActionHistory", req, cb);
    }
    async UpdateAIModelChannel(req, cb) {
        return this.request("UpdateAIModelChannel", req, cb);
    }
    async CreateCOSCredentials(req, cb) {
        return this.request("CreateCOSCredentials", req, cb);
    }
    async DescribeModelDefinition(req, cb) {
        return this.request("DescribeModelDefinition", req, cb);
    }
    async DeleteForwardRule(req, cb) {
        return this.request("DeleteForwardRule", req, cb);
    }
    async InheritCloudStorageUser(req, cb) {
        return this.request("InheritCloudStorageUser", req, cb);
    }
    async CreateBatch(req, cb) {
        return this.request("CreateBatch", req, cb);
    }
    async DescribeFirmwareTaskStatistics(req, cb) {
        return this.request("DescribeFirmwareTaskStatistics", req, cb);
    }
    async ModifyProductDynamicRegister(req, cb) {
        return this.request("ModifyProductDynamicRegister", req, cb);
    }
    async DescribeDeviceDataHistory(req, cb) {
        return this.request("DescribeDeviceDataHistory", req, cb);
    }
    async DescribeFirmwareTasks(req, cb) {
        return this.request("DescribeFirmwareTasks", req, cb);
    }
    async GetFirmwareURL(req, cb) {
        return this.request("GetFirmwareURL", req, cb);
    }
    async ModifyForwardRule(req, cb) {
        return this.request("ModifyForwardRule", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async CreateCloudStorage(req, cb) {
        return this.request("CreateCloudStorage", req, cb);
    }
    async GenerateSignedVideoURL(req, cb) {
        return this.request("GenerateSignedVideoURL", req, cb);
    }
    async SetForwardAuth(req, cb) {
        return this.request("SetForwardAuth", req, cb);
    }
    async ListFirmwares(req, cb) {
        return this.request("ListFirmwares", req, cb);
    }
    async EditFirmware(req, cb) {
        return this.request("EditFirmware", req, cb);
    }
    async DescribeCategory(req, cb) {
        return this.request("DescribeCategory", req, cb);
    }
    async PublishMessage(req, cb) {
        return this.request("PublishMessage", req, cb);
    }
    async DescribeFirmwareTaskDistribution(req, cb) {
        return this.request("DescribeFirmwareTaskDistribution", req, cb);
    }
    async DeleteProduct(req, cb) {
        return this.request("DeleteProduct", req, cb);
    }
    async DescribeProductDynamicRegister(req, cb) {
        return this.request("DescribeProductDynamicRegister", req, cb);
    }
    async DescribeDeviceEventHistory(req, cb) {
        return this.request("DescribeDeviceEventHistory", req, cb);
    }
    async ModifyDataForwardStatus(req, cb) {
        return this.request("ModifyDataForwardStatus", req, cb);
    }
    async CreateTaskFileUrl(req, cb) {
        return this.request("CreateTaskFileUrl", req, cb);
    }
    async DescribeFirmwareTask(req, cb) {
        return this.request("DescribeFirmwareTask", req, cb);
    }
    async ImportModelDefinition(req, cb) {
        return this.request("ImportModelDefinition", req, cb);
    }
    async ReportAliveDevice(req, cb) {
        return this.request("ReportAliveDevice", req, cb);
    }
    async ResetCloudStorage(req, cb) {
        return this.request("ResetCloudStorage", req, cb);
    }
    async DescribeDeviceStatusLog(req, cb) {
        return this.request("DescribeDeviceStatusLog", req, cb);
    }
    async DescribeCloudStorageEvents(req, cb) {
        return this.request("DescribeCloudStorageEvents", req, cb);
    }
    async CreateDataForward(req, cb) {
        return this.request("CreateDataForward", req, cb);
    }
    async DescribeFirmwareTaskDevices(req, cb) {
        return this.request("DescribeFirmwareTaskDevices", req, cb);
    }
    async CancelDeviceFirmwareTask(req, cb) {
        return this.request("CancelDeviceFirmwareTask", req, cb);
    }
    async DescribeAIModelChannel(req, cb) {
        return this.request("DescribeAIModelChannel", req, cb);
    }
    async DescribeDataForwardList(req, cb) {
        return this.request("DescribeDataForwardList", req, cb);
    }
    async DescribeCloudStorageTime(req, cb) {
        return this.request("DescribeCloudStorageTime", req, cb);
    }
    async DescribeForwardRule(req, cb) {
        return this.request("DescribeForwardRule", req, cb);
    }
    async CreateForwardRule(req, cb) {
        return this.request("CreateForwardRule", req, cb);
    }
    async GetAllFirmwareVersion(req, cb) {
        return this.request("GetAllFirmwareVersion", req, cb);
    }
    async ModifyModelDefinition(req, cb) {
        return this.request("ModifyModelDefinition", req, cb);
    }
    async ApplyAIModel(req, cb) {
        return this.request("ApplyAIModel", req, cb);
    }
    async BindCloudStorageUser(req, cb) {
        return this.request("BindCloudStorageUser", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async DeleteFirmware(req, cb) {
        return this.request("DeleteFirmware", req, cb);
    }
    async DescribeDevice(req, cb) {
        return this.request("DescribeDevice", req, cb);
    }
    async DescribeBalanceTransactions(req, cb) {
        return this.request("DescribeBalanceTransactions", req, cb);
    }
    async ControlDeviceData(req, cb) {
        return this.request("ControlDeviceData", req, cb);
    }
    async DescribeCloudStorageThumbnail(req, cb) {
        return this.request("DescribeCloudStorageThumbnail", req, cb);
    }
    async DescribeBalance(req, cb) {
        return this.request("DescribeBalance", req, cb);
    }
    async WakeUpDevice(req, cb) {
        return this.request("WakeUpDevice", req, cb);
    }
}
