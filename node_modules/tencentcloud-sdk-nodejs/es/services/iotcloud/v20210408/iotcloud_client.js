import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iotcloud.tencentcloudapi.com", "2021-04-08", clientConfig);
    }
    async GetCOSURL(req, cb) {
        return this.request("GetCOSURL", req, cb);
    }
    async ReplaceTopicRule(req, cb) {
        return this.request("ReplaceTopicRule", req, cb);
    }
    async PublishRRPCMessage(req, cb) {
        return this.request("PublishRRPCMessage", req, cb);
    }
    async UpdateDeviceLogLevel(req, cb) {
        return this.request("UpdateDeviceLogLevel", req, cb);
    }
    async DescribeGatewayBindDevices(req, cb) {
        return this.request("DescribeGatewayBindDevices", req, cb);
    }
    async ListLogPayload(req, cb) {
        return this.request("ListLogPayload", req, cb);
    }
    async UpdateTopicPolicy(req, cb) {
        return this.request("UpdateTopicPolicy", req, cb);
    }
    async DescribeFirmware(req, cb) {
        return this.request("DescribeFirmware", req, cb);
    }
    async DescribeDeviceShadow(req, cb) {
        return this.request("DescribeDeviceShadow", req, cb);
    }
    async DescribeDevice(req, cb) {
        return this.request("DescribeDevice", req, cb);
    }
    async PublishBroadcastMessage(req, cb) {
        return this.request("PublishBroadcastMessage", req, cb);
    }
    async UpdateDeviceAvailableState(req, cb) {
        return this.request("UpdateDeviceAvailableState", req, cb);
    }
    async DescribeProduct(req, cb) {
        return this.request("DescribeProduct", req, cb);
    }
    async CreateTopicRule(req, cb) {
        return this.request("CreateTopicRule", req, cb);
    }
    async RetryDeviceFirmwareTask(req, cb) {
        return this.request("RetryDeviceFirmwareTask", req, cb);
    }
    async CreateTopicPolicy(req, cb) {
        return this.request("CreateTopicPolicy", req, cb);
    }
    async UpdateProductPrivateCA(req, cb) {
        return this.request("UpdateProductPrivateCA", req, cb);
    }
    async DescribePrivateCABindedProducts(req, cb) {
        return this.request("DescribePrivateCABindedProducts", req, cb);
    }
    async BatchUpdateFirmware(req, cb) {
        return this.request("BatchUpdateFirmware", req, cb);
    }
    async CreateProduct(req, cb) {
        return this.request("CreateProduct", req, cb);
    }
    async GetUserResourceInfo(req, cb) {
        return this.request("GetUserResourceInfo", req, cb);
    }
    async SetProductsForbiddenStatus(req, cb) {
        return this.request("SetProductsForbiddenStatus", req, cb);
    }
    async DescribeProductCA(req, cb) {
        return this.request("DescribeProductCA", req, cb);
    }
    async DescribeDeviceClientKey(req, cb) {
        return this.request("DescribeDeviceClientKey", req, cb);
    }
    async DescribeProducts(req, cb) {
        return this.request("DescribeProducts", req, cb);
    }
    async CreateMultiDevicesTask(req, cb) {
        return this.request("CreateMultiDevicesTask", req, cb);
    }
    async DescribeResourceTasks(req, cb) {
        return this.request("DescribeResourceTasks", req, cb);
    }
    async DescribeFirmwareTaskStatistics(req, cb) {
        return this.request("DescribeFirmwareTaskStatistics", req, cb);
    }
    async DeleteProductPrivateCA(req, cb) {
        return this.request("DeleteProductPrivateCA", req, cb);
    }
    async DescribePushResourceTaskStatistics(req, cb) {
        return this.request("DescribePushResourceTaskStatistics", req, cb);
    }
    async DescribeProductTask(req, cb) {
        return this.request("DescribeProductTask", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async UpdateDevicesEnableState(req, cb) {
        return this.request("UpdateDevicesEnableState", req, cb);
    }
    async UpdateOtaTaskStatus(req, cb) {
        return this.request("UpdateOtaTaskStatus", req, cb);
    }
    async ListFirmwares(req, cb) {
        return this.request("ListFirmwares", req, cb);
    }
    async ListSDKLog(req, cb) {
        return this.request("ListSDKLog", req, cb);
    }
    async DescribeProductResource(req, cb) {
        return this.request("DescribeProductResource", req, cb);
    }
    async EditFirmware(req, cb) {
        return this.request("EditFirmware", req, cb);
    }
    async DeleteDeviceShadow(req, cb) {
        return this.request("DeleteDeviceShadow", req, cb);
    }
    async CreateDevice(req, cb) {
        return this.request("CreateDevice", req, cb);
    }
    async DescribeDeviceResource(req, cb) {
        return this.request("DescribeDeviceResource", req, cb);
    }
    async PublishMessage(req, cb) {
        return this.request("PublishMessage", req, cb);
    }
    async DescribeFirmwareTaskDistribution(req, cb) {
        return this.request("DescribeFirmwareTaskDistribution", req, cb);
    }
    async CreatePrivateCA(req, cb) {
        return this.request("CreatePrivateCA", req, cb);
    }
    async DeleteProduct(req, cb) {
        return this.request("DeleteProduct", req, cb);
    }
    async UpdatePrivateCA(req, cb) {
        return this.request("UpdatePrivateCA", req, cb);
    }
    async DownloadDeviceResource(req, cb) {
        return this.request("DownloadDeviceResource", req, cb);
    }
    async DeletePrivateCA(req, cb) {
        return this.request("DeletePrivateCA", req, cb);
    }
    async ResetDeviceState(req, cb) {
        return this.request("ResetDeviceState", req, cb);
    }
    async DescribeFirmwareTask(req, cb) {
        return this.request("DescribeFirmwareTask", req, cb);
    }
    async UploadFirmware(req, cb) {
        return this.request("UploadFirmware", req, cb);
    }
    async DescribeDeviceResources(req, cb) {
        return this.request("DescribeDeviceResources", req, cb);
    }
    async UpdateProductDynamicRegister(req, cb) {
        return this.request("UpdateProductDynamicRegister", req, cb);
    }
    async ListLog(req, cb) {
        return this.request("ListLog", req, cb);
    }
    async DescribeFirmwareTaskDevices(req, cb) {
        return this.request("DescribeFirmwareTaskDevices", req, cb);
    }
    async CancelDeviceFirmwareTask(req, cb) {
        return this.request("CancelDeviceFirmwareTask", req, cb);
    }
    async EnableTopicRule(req, cb) {
        return this.request("EnableTopicRule", req, cb);
    }
    async BindDevices(req, cb) {
        return this.request("BindDevices", req, cb);
    }
    async CreateTaskFileUrl(req, cb) {
        return this.request("CreateTaskFileUrl", req, cb);
    }
    async UnbindDevices(req, cb) {
        return this.request("UnbindDevices", req, cb);
    }
    async DescribePrivateCA(req, cb) {
        return this.request("DescribePrivateCA", req, cb);
    }
    async DescribeProductTasks(req, cb) {
        return this.request("DescribeProductTasks", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async GetAllVersion(req, cb) {
        return this.request("GetAllVersion", req, cb);
    }
    async DisableTopicRule(req, cb) {
        return this.request("DisableTopicRule", req, cb);
    }
    async UpdateDeviceShadow(req, cb) {
        return this.request("UpdateDeviceShadow", req, cb);
    }
    async DescribeFirmwareTasks(req, cb) {
        return this.request("DescribeFirmwareTasks", req, cb);
    }
    async ListTopicRules(req, cb) {
        return this.request("ListTopicRules", req, cb);
    }
    async DescribeProductResources(req, cb) {
        return this.request("DescribeProductResources", req, cb);
    }
    async DeleteDeviceResource(req, cb) {
        return this.request("DeleteDeviceResource", req, cb);
    }
    async DescribePrivateCAs(req, cb) {
        return this.request("DescribePrivateCAs", req, cb);
    }
    async UpdateDevicePSK(req, cb) {
        return this.request("UpdateDevicePSK", req, cb);
    }
    async DeleteTopicRule(req, cb) {
        return this.request("DeleteTopicRule", req, cb);
    }
}
