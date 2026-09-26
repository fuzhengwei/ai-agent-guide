import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dasb.tencentcloudapi.com", "2019-10-18", clientConfig);
    }
    async ModifyDeviceGroup(req, cb) {
        return this.request("ModifyDeviceGroup", req, cb);
    }
    async DescribeDeviceGroupMembers(req, cb) {
        return this.request("DescribeDeviceGroupMembers", req, cb);
    }
    async ModifyOAuthSetting(req, cb) {
        return this.request("ModifyOAuthSetting", req, cb);
    }
    async ModifyCmdTemplate(req, cb) {
        return this.request("ModifyCmdTemplate", req, cb);
    }
    async DescribeLoginEvent(req, cb) {
        return this.request("DescribeLoginEvent", req, cb);
    }
    async CreateDeviceGroup(req, cb) {
        return this.request("CreateDeviceGroup", req, cb);
    }
    async DescribeDeviceAccounts(req, cb) {
        return this.request("DescribeDeviceAccounts", req, cb);
    }
    async ResetUser(req, cb) {
        return this.request("ResetUser", req, cb);
    }
    async DeleteDevices(req, cb) {
        return this.request("DeleteDevices", req, cb);
    }
    async CreateChangePwdTask(req, cb) {
        return this.request("CreateChangePwdTask", req, cb);
    }
    async DescribeUserGroups(req, cb) {
        return this.request("DescribeUserGroups", req, cb);
    }
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    async DeployResource(req, cb) {
        return this.request("DeployResource", req, cb);
    }
    async ModifyDevice(req, cb) {
        return this.request("ModifyDevice", req, cb);
    }
    async BindDeviceResource(req, cb) {
        return this.request("BindDeviceResource", req, cb);
    }
    async BindDeviceAccountPassword(req, cb) {
        return this.request("BindDeviceAccountPassword", req, cb);
    }
    async SearchFile(req, cb) {
        return this.request("SearchFile", req, cb);
    }
    async SearchSession(req, cb) {
        return this.request("SearchSession", req, cb);
    }
    async DeleteAcls(req, cb) {
        return this.request("DeleteAcls", req, cb);
    }
    async DescribeResources(req, cb) {
        return this.request("DescribeResources", req, cb);
    }
    async DeleteUserGroupMembers(req, cb) {
        return this.request("DeleteUserGroupMembers", req, cb);
    }
    async ModifyChangePwdTask(req, cb) {
        return this.request("ModifyChangePwdTask", req, cb);
    }
    async CreateAssetSyncJob(req, cb) {
        return this.request("CreateAssetSyncJob", req, cb);
    }
    async DescribeAcls(req, cb) {
        return this.request("DescribeAcls", req, cb);
    }
    async RunChangePwdTask(req, cb) {
        return this.request("RunChangePwdTask", req, cb);
    }
    async ResetDeviceAccountPassword(req, cb) {
        return this.request("ResetDeviceAccountPassword", req, cb);
    }
    async ModifyUserGroup(req, cb) {
        return this.request("ModifyUserGroup", req, cb);
    }
    async SearchCommandBySid(req, cb) {
        return this.request("SearchCommandBySid", req, cb);
    }
    async DeleteDeviceGroups(req, cb) {
        return this.request("DeleteDeviceGroups", req, cb);
    }
    async ModifyAcl(req, cb) {
        return this.request("ModifyAcl", req, cb);
    }
    async DeleteUsers(req, cb) {
        return this.request("DeleteUsers", req, cb);
    }
    async CreateAcl(req, cb) {
        return this.request("CreateAcl", req, cb);
    }
    async DescribeDasbImageIds(req, cb) {
        return this.request("DescribeDasbImageIds", req, cb);
    }
    async ResetDeviceAccountPrivateKey(req, cb) {
        return this.request("ResetDeviceAccountPrivateKey", req, cb);
    }
    async DescribeAssetSyncStatus(req, cb) {
        return this.request("DescribeAssetSyncStatus", req, cb);
    }
    async CreateDeviceAccount(req, cb) {
        return this.request("CreateDeviceAccount", req, cb);
    }
    async DescribeChangePwdTaskDetail(req, cb) {
        return this.request("DescribeChangePwdTaskDetail", req, cb);
    }
    async DeleteDeviceGroupMembers(req, cb) {
        return this.request("DeleteDeviceGroupMembers", req, cb);
    }
    async DeleteChangePwdTask(req, cb) {
        return this.request("DeleteChangePwdTask", req, cb);
    }
    async DescribeOperationEvent(req, cb) {
        return this.request("DescribeOperationEvent", req, cb);
    }
    async DeleteDeviceAccounts(req, cb) {
        return this.request("DeleteDeviceAccounts", req, cb);
    }
    async DeleteUserGroups(req, cb) {
        return this.request("DeleteUserGroups", req, cb);
    }
    async CreateCmdTemplate(req, cb) {
        return this.request("CreateCmdTemplate", req, cb);
    }
    async ModifyResource(req, cb) {
        return this.request("ModifyResource", req, cb);
    }
    async SearchAuditLog(req, cb) {
        return this.request("SearchAuditLog", req, cb);
    }
    async ModifyUser(req, cb) {
        return this.request("ModifyUser", req, cb);
    }
    async DescribeCmdTemplates(req, cb) {
        return this.request("DescribeCmdTemplates", req, cb);
    }
    async DeleteCmdTemplates(req, cb) {
        return this.request("DeleteCmdTemplates", req, cb);
    }
    async AddUserGroupMembers(req, cb) {
        return this.request("AddUserGroupMembers", req, cb);
    }
    async DescribeDeviceGroups(req, cb) {
        return this.request("DescribeDeviceGroups", req, cb);
    }
    async DescribeUsers(req, cb) {
        return this.request("DescribeUsers", req, cb);
    }
    async DescribeDevices(req, cb) {
        return this.request("DescribeDevices", req, cb);
    }
    async DescribeUserGroupMembers(req, cb) {
        return this.request("DescribeUserGroupMembers", req, cb);
    }
    async SearchFileBySid(req, cb) {
        return this.request("SearchFileBySid", req, cb);
    }
    async ImportExternalDevice(req, cb) {
        return this.request("ImportExternalDevice", req, cb);
    }
    async DescribeChangePwdTask(req, cb) {
        return this.request("DescribeChangePwdTask", req, cb);
    }
    async AddDeviceGroupMembers(req, cb) {
        return this.request("AddDeviceGroupMembers", req, cb);
    }
    async CreateUserGroup(req, cb) {
        return this.request("CreateUserGroup", req, cb);
    }
    async CreateResource(req, cb) {
        return this.request("CreateResource", req, cb);
    }
    async CreateUser(req, cb) {
        return this.request("CreateUser", req, cb);
    }
    async BindDeviceAccountPrivateKey(req, cb) {
        return this.request("BindDeviceAccountPrivateKey", req, cb);
    }
    async SearchCommand(req, cb) {
        return this.request("SearchCommand", req, cb);
    }
    async SearchSessionCommand(req, cb) {
        return this.request("SearchSessionCommand", req, cb);
    }
}
