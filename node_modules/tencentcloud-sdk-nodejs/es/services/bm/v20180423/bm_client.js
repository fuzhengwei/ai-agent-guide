import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bm.tencentcloudapi.com", "2018-04-23", clientConfig);
    }
    async DescribeUserCmds(req, cb) {
        return this.request("DescribeUserCmds", req, cb);
    }
    async RebootDevices(req, cb) {
        return this.request("RebootDevices", req, cb);
    }
    async ModifyPsaRegulation(req, cb) {
        return this.request("ModifyPsaRegulation", req, cb);
    }
    async DescribePsaRegulations(req, cb) {
        return this.request("DescribePsaRegulations", req, cb);
    }
    async ModifyDeviceAutoRenewFlag(req, cb) {
        return this.request("ModifyDeviceAutoRenewFlag", req, cb);
    }
    async OfflineDevices(req, cb) {
        return this.request("OfflineDevices", req, cb);
    }
    async ModifyLanIp(req, cb) {
        return this.request("ModifyLanIp", req, cb);
    }
    async RunUserCmd(req, cb) {
        return this.request("RunUserCmd", req, cb);
    }
    async DescribeCustomImageProcess(req, cb) {
        return this.request("DescribeCustomImageProcess", req, cb);
    }
    async StartDevices(req, cb) {
        return this.request("StartDevices", req, cb);
    }
    async ReloadDeviceOs(req, cb) {
        return this.request("ReloadDeviceOs", req, cb);
    }
    async DescribeDeviceHardwareInfo(req, cb) {
        return this.request("DescribeDeviceHardwareInfo", req, cb);
    }
    async DescribeUserCmdTasks(req, cb) {
        return this.request("DescribeUserCmdTasks", req, cb);
    }
    async CreatePsaRegulation(req, cb) {
        return this.request("CreatePsaRegulation", req, cb);
    }
    async DescribeDeviceClass(req, cb) {
        return this.request("DescribeDeviceClass", req, cb);
    }
    async BuyDevices(req, cb) {
        return this.request("BuyDevices", req, cb);
    }
    async ModifyUserCmd(req, cb) {
        return this.request("ModifyUserCmd", req, cb);
    }
    async DeleteUserCmds(req, cb) {
        return this.request("DeleteUserCmds", req, cb);
    }
    async DescribeHostedDeviceOutBandInfo(req, cb) {
        return this.request("DescribeHostedDeviceOutBandInfo", req, cb);
    }
    async BindPsaTag(req, cb) {
        return this.request("BindPsaTag", req, cb);
    }
    async DeleteCustomImages(req, cb) {
        return this.request("DeleteCustomImages", req, cb);
    }
    async DeletePsaRegulation(req, cb) {
        return this.request("DeletePsaRegulation", req, cb);
    }
    async CreateUserCmd(req, cb) {
        return this.request("CreateUserCmd", req, cb);
    }
    async DescribeHardwareSpecification(req, cb) {
        return this.request("DescribeHardwareSpecification", req, cb);
    }
    async DetachCamRole(req, cb) {
        return this.request("DetachCamRole", req, cb);
    }
    async AttachCamRole(req, cb) {
        return this.request("AttachCamRole", req, cb);
    }
    async DescribeOsInfo(req, cb) {
        return this.request("DescribeOsInfo", req, cb);
    }
    async DescribeOperationResult(req, cb) {
        return this.request("DescribeOperationResult", req, cb);
    }
    async ModifyCustomImageAttribute(req, cb) {
        return this.request("ModifyCustomImageAttribute", req, cb);
    }
    async DescribeDevicePosition(req, cb) {
        return this.request("DescribeDevicePosition", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async DescribeUserCmdTaskInfo(req, cb) {
        return this.request("DescribeUserCmdTaskInfo", req, cb);
    }
    async DescribeDevicePriceInfo(req, cb) {
        return this.request("DescribeDevicePriceInfo", req, cb);
    }
    async ReturnDevices(req, cb) {
        return this.request("ReturnDevices", req, cb);
    }
    async DescribeTaskOperationLog(req, cb) {
        return this.request("DescribeTaskOperationLog", req, cb);
    }
    async ModifyPayModePre2Post(req, cb) {
        return this.request("ModifyPayModePre2Post", req, cb);
    }
    async UnbindPsaTag(req, cb) {
        return this.request("UnbindPsaTag", req, cb);
    }
    async CreateSpotDevice(req, cb) {
        return this.request("CreateSpotDevice", req, cb);
    }
    async ModifyDeviceAliases(req, cb) {
        return this.request("ModifyDeviceAliases", req, cb);
    }
    async DescribeDeviceInventory(req, cb) {
        return this.request("DescribeDeviceInventory", req, cb);
    }
    async DescribeDeviceOperationLog(req, cb) {
        return this.request("DescribeDeviceOperationLog", req, cb);
    }
    async DescribeTaskInfo(req, cb) {
        return this.request("DescribeTaskInfo", req, cb);
    }
    async RepairTaskControl(req, cb) {
        return this.request("RepairTaskControl", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async DescribeRepairTaskConstant(req, cb) {
        return this.request("DescribeRepairTaskConstant", req, cb);
    }
    async SetOutBandVpnAuthPassword(req, cb) {
        return this.request("SetOutBandVpnAuthPassword", req, cb);
    }
    async DescribeCustomImages(req, cb) {
        return this.request("DescribeCustomImages", req, cb);
    }
    async RecoverDevices(req, cb) {
        return this.request("RecoverDevices", req, cb);
    }
    async DescribeDevicePartition(req, cb) {
        return this.request("DescribeDevicePartition", req, cb);
    }
    async ShutdownDevices(req, cb) {
        return this.request("ShutdownDevices", req, cb);
    }
    async ResetDevicePassword(req, cb) {
        return this.request("ResetDevicePassword", req, cb);
    }
    async DescribeDeviceClassPartition(req, cb) {
        return this.request("DescribeDeviceClassPartition", req, cb);
    }
    async CreateCustomImage(req, cb) {
        return this.request("CreateCustomImage", req, cb);
    }
}
