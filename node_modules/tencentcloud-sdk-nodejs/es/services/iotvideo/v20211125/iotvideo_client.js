import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iotvideo.tencentcloudapi.com", "2021-11-25", clientConfig);
    }
    async CallTRTCDevice(req, cb) {
        return this.request("CallTRTCDevice", req, cb);
    }
    async DescribeDevicePackages(req, cb) {
        return this.request("DescribeDevicePackages", req, cb);
    }
    async CreateAIDetection(req, cb) {
        return this.request("CreateAIDetection", req, cb);
    }
    async DescribeAIModels(req, cb) {
        return this.request("DescribeAIModels", req, cb);
    }
    async DescribeAIModelApplications(req, cb) {
        return this.request("DescribeAIModelApplications", req, cb);
    }
    async DescribeProduct(req, cb) {
        return this.request("DescribeProduct", req, cb);
    }
    async GetAllFirmwareVersion(req, cb) {
        return this.request("GetAllFirmwareVersion", req, cb);
    }
    async DescribeProducts(req, cb) {
        return this.request("DescribeProducts", req, cb);
    }
    async DescribeUser(req, cb) {
        return this.request("DescribeUser", req, cb);
    }
    async DescribeFirmwareTaskStatistics(req, cb) {
        return this.request("DescribeFirmwareTaskStatistics", req, cb);
    }
    async ModifyDeviceLogLevel(req, cb) {
        return this.request("ModifyDeviceLogLevel", req, cb);
    }
    async CallDeviceActionSync(req, cb) {
        return this.request("CallDeviceActionSync", req, cb);
    }
    async ModifyPushChannel(req, cb) {
        return this.request("ModifyPushChannel", req, cb);
    }
    async GenerateSignedVideoURL(req, cb) {
        return this.request("GenerateSignedVideoURL", req, cb);
    }
    async EditFirmware(req, cb) {
        return this.request("EditFirmware", req, cb);
    }
    async PublishMessage(req, cb) {
        return this.request("PublishMessage", req, cb);
    }
    async DescribeDeviceEventHistory(req, cb) {
        return this.request("DescribeDeviceEventHistory", req, cb);
    }
    async ImportModelDefinition(req, cb) {
        return this.request("ImportModelDefinition", req, cb);
    }
    async DescribeCloudStorageThumbnailList(req, cb) {
        return this.request("DescribeCloudStorageThumbnailList", req, cb);
    }
    async CancelDeviceFirmwareTask(req, cb) {
        return this.request("CancelDeviceFirmwareTask", req, cb);
    }
    async ReportAliveDevice(req, cb) {
        return this.request("ReportAliveDevice", req, cb);
    }
    async DescribeForwardRule(req, cb) {
        return this.request("DescribeForwardRule", req, cb);
    }
    async DescribePackageConsumeTasks(req, cb) {
        return this.request("DescribePackageConsumeTasks", req, cb);
    }
    async DescribeAccount(req, cb) {
        return this.request("DescribeAccount", req, cb);
    }
    async DescribeCloudStoragePackageConsumeStats(req, cb) {
        return this.request("DescribeCloudStoragePackageConsumeStats", req, cb);
    }
    async DescribeFirmwareTasks(req, cb) {
        return this.request("DescribeFirmwareTasks", req, cb);
    }
    async ControlDeviceData(req, cb) {
        return this.request("ControlDeviceData", req, cb);
    }
    async DescribeDeviceCommLog(req, cb) {
        return this.request("DescribeDeviceCommLog", req, cb);
    }
    async DescribeP2PRoute(req, cb) {
        return this.request("DescribeP2PRoute", req, cb);
    }
    async DescribeFirmware(req, cb) {
        return this.request("DescribeFirmware", req, cb);
    }
    async DescribeCloudStorageDate(req, cb) {
        return this.request("DescribeCloudStorageDate", req, cb);
    }
    async DescribeFreeCloudStorageNum(req, cb) {
        return this.request("DescribeFreeCloudStorageNum", req, cb);
    }
    async SetForwardAuth(req, cb) {
        return this.request("SetForwardAuth", req, cb);
    }
    async DescribeCloudStorageUsers(req, cb) {
        return this.request("DescribeCloudStorageUsers", req, cb);
    }
    async TransferCloudStorage(req, cb) {
        return this.request("TransferCloudStorage", req, cb);
    }
    async RetryDeviceFirmwareTask(req, cb) {
        return this.request("RetryDeviceFirmwareTask", req, cb);
    }
    async ModifyDevice(req, cb) {
        return this.request("ModifyDevice", req, cb);
    }
    async ModifyDataForward(req, cb) {
        return this.request("ModifyDataForward", req, cb);
    }
    async BatchUpdateFirmware(req, cb) {
        return this.request("BatchUpdateFirmware", req, cb);
    }
    async CreateProduct(req, cb) {
        return this.request("CreateProduct", req, cb);
    }
    async ChangeP2PRoute(req, cb) {
        return this.request("ChangeP2PRoute", req, cb);
    }
    async InheritCloudStorageUser(req, cb) {
        return this.request("InheritCloudStorageUser", req, cb);
    }
    async GetFirmwareURL(req, cb) {
        return this.request("GetFirmwareURL", req, cb);
    }
    async DescribeBatch(req, cb) {
        return this.request("DescribeBatch", req, cb);
    }
    async ListFirmwares(req, cb) {
        return this.request("ListFirmwares", req, cb);
    }
    async DescribeCategory(req, cb) {
        return this.request("DescribeCategory", req, cb);
    }
    async DeleteProduct(req, cb) {
        return this.request("DeleteProduct", req, cb);
    }
    async ModifyDataForwardStatus(req, cb) {
        return this.request("ModifyDataForwardStatus", req, cb);
    }
    async DescribeFirmwareTask(req, cb) {
        return this.request("DescribeFirmwareTask", req, cb);
    }
    async ResetCloudStorage(req, cb) {
        return this.request("ResetCloudStorage", req, cb);
    }
    async DescribeFirmwareTaskDevices(req, cb) {
        return this.request("DescribeFirmwareTaskDevices", req, cb);
    }
    async DescribeDataForwardList(req, cb) {
        return this.request("DescribeDataForwardList", req, cb);
    }
    async DescribeCloudStorageTime(req, cb) {
        return this.request("DescribeCloudStorageTime", req, cb);
    }
    async UpdateAIModelChannel(req, cb) {
        return this.request("UpdateAIModelChannel", req, cb);
    }
    async DescribeCloudStorageThumbnail(req, cb) {
        return this.request("DescribeCloudStorageThumbnail", req, cb);
    }
    async DescribeCloudStorageMultiThumbnail(req, cb) {
        return this.request("DescribeCloudStorageMultiThumbnail", req, cb);
    }
    async DeleteFirmware(req, cb) {
        return this.request("DeleteFirmware", req, cb);
    }
    async CallDeviceActionAsync(req, cb) {
        return this.request("CallDeviceActionAsync", req, cb);
    }
    async CheckForwardAuth(req, cb) {
        return this.request("CheckForwardAuth", req, cb);
    }
    async DescribeDeviceData(req, cb) {
        return this.request("DescribeDeviceData", req, cb);
    }
    async ModifyProduct(req, cb) {
        return this.request("ModifyProduct", req, cb);
    }
    async DescribeAIModelUsage(req, cb) {
        return this.request("DescribeAIModelUsage", req, cb);
    }
    async ModifyForwardRule(req, cb) {
        return this.request("ModifyForwardRule", req, cb);
    }
    async CancelAIModelApplication(req, cb) {
        return this.request("CancelAIModelApplication", req, cb);
    }
    async DescribeCloudStorage(req, cb) {
        return this.request("DescribeCloudStorage", req, cb);
    }
    async DescribeBatchs(req, cb) {
        return this.request("DescribeBatchs", req, cb);
    }
    async DescribeDeviceActionHistory(req, cb) {
        return this.request("DescribeDeviceActionHistory", req, cb);
    }
    async CreateCOSCredentials(req, cb) {
        return this.request("CreateCOSCredentials", req, cb);
    }
    async CreateFreeCloudStorage(req, cb) {
        return this.request("CreateFreeCloudStorage", req, cb);
    }
    async CreateBatch(req, cb) {
        return this.request("CreateBatch", req, cb);
    }
    async DescribePushChannel(req, cb) {
        return this.request("DescribePushChannel", req, cb);
    }
    async CreateCloudStorage(req, cb) {
        return this.request("CreateCloudStorage", req, cb);
    }
    async DescribeProductDynamicRegister(req, cb) {
        return this.request("DescribeProductDynamicRegister", req, cb);
    }
    async DescribeDeviceDataStats(req, cb) {
        return this.request("DescribeDeviceDataStats", req, cb);
    }
    async WakeUpDevice(req, cb) {
        return this.request("WakeUpDevice", req, cb);
    }
    async DescribeDeviceStatusLog(req, cb) {
        return this.request("DescribeDeviceStatusLog", req, cb);
    }
    async CreateForwardRule(req, cb) {
        return this.request("CreateForwardRule", req, cb);
    }
    async DescribeAIModelChannel(req, cb) {
        return this.request("DescribeAIModelChannel", req, cb);
    }
    async DescribeBalance(req, cb) {
        return this.request("DescribeBalance", req, cb);
    }
    async DescribeSDKLog(req, cb) {
        return this.request("DescribeSDKLog", req, cb);
    }
    async BindCloudStorageUser(req, cb) {
        return this.request("BindCloudStorageUser", req, cb);
    }
    async DescribeDevice(req, cb) {
        return this.request("DescribeDevice", req, cb);
    }
    async DescribeMessageDataStats(req, cb) {
        return this.request("DescribeMessageDataStats", req, cb);
    }
    async DeleteCloudStorageEvent(req, cb) {
        return this.request("DeleteCloudStorageEvent", req, cb);
    }
    async CreateDeviceChannel(req, cb) {
        return this.request("CreateDeviceChannel", req, cb);
    }
    async DescribeP2PInfo(req, cb) {
        return this.request("DescribeP2PInfo", req, cb);
    }
    async DescribeCloudStorageOrder(req, cb) {
        return this.request("DescribeCloudStorageOrder", req, cb);
    }
    async DescribeBalanceTransactions(req, cb) {
        return this.request("DescribeBalanceTransactions", req, cb);
    }
    async DeleteForwardRule(req, cb) {
        return this.request("DeleteForwardRule", req, cb);
    }
    async ModifyProductDynamicRegister(req, cb) {
        return this.request("ModifyProductDynamicRegister", req, cb);
    }
    async DescribeDeviceDataHistory(req, cb) {
        return this.request("DescribeDeviceDataHistory", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async DescribePackageConsumeTask(req, cb) {
        return this.request("DescribePackageConsumeTask", req, cb);
    }
    async ResetCloudStorageEvent(req, cb) {
        return this.request("ResetCloudStorageEvent", req, cb);
    }
    async DescribeFirmwareTaskDistribution(req, cb) {
        return this.request("DescribeFirmwareTaskDistribution", req, cb);
    }
    async GenSingleDeviceSignatureOfPublic(req, cb) {
        return this.request("GenSingleDeviceSignatureOfPublic", req, cb);
    }
    async CreateTaskFileUrl(req, cb) {
        return this.request("CreateTaskFileUrl", req, cb);
    }
    async DescribeCloudStorageStreamData(req, cb) {
        return this.request("DescribeCloudStorageStreamData", req, cb);
    }
    async UploadFirmware(req, cb) {
        return this.request("UploadFirmware", req, cb);
    }
    async CreateDataForward(req, cb) {
        return this.request("CreateDataForward", req, cb);
    }
    async DescribeBonuses(req, cb) {
        return this.request("DescribeBonuses", req, cb);
    }
    async DescribeCsReportCountDataInfo(req, cb) {
        return this.request("DescribeCsReportCountDataInfo", req, cb);
    }
    async DescribeCloudStorageEvents(req, cb) {
        return this.request("DescribeCloudStorageEvents", req, cb);
    }
    async ModifyModelDefinition(req, cb) {
        return this.request("ModifyModelDefinition", req, cb);
    }
    async ApplyAIModel(req, cb) {
        return this.request("ApplyAIModel", req, cb);
    }
    async DescribeModelDefinition(req, cb) {
        return this.request("DescribeModelDefinition", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async DescribeCloudStoragePackageConsumeDetails(req, cb) {
        return this.request("DescribeCloudStoragePackageConsumeDetails", req, cb);
    }
}
