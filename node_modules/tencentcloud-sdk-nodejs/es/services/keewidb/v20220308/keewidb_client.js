import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("keewidb.tencentcloudapi.com", "2022-03-08", clientConfig);
    }
    async DescribeInstanceNodeInfo(req, cb) {
        return this.request("DescribeInstanceNodeInfo", req, cb);
    }
    async ModifyMaintenanceWindow(req, cb) {
        return this.request("ModifyMaintenanceWindow", req, cb);
    }
    async DescribeTaskList(req, cb) {
        return this.request("DescribeTaskList", req, cb);
    }
    async CleanUpInstance(req, cb) {
        return this.request("CleanUpInstance", req, cb);
    }
    async DescribeMaintenanceWindow(req, cb) {
        return this.request("DescribeMaintenanceWindow", req, cb);
    }
    async DescribeInstanceBackups(req, cb) {
        return this.request("DescribeInstanceBackups", req, cb);
    }
    async ModifyNetworkConfig(req, cb) {
        return this.request("ModifyNetworkConfig", req, cb);
    }
    async ModifyAutoBackupConfig(req, cb) {
        return this.request("ModifyAutoBackupConfig", req, cb);
    }
    async ResetPassword(req, cb) {
        return this.request("ResetPassword", req, cb);
    }
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
    async DescribeConnectionConfig(req, cb) {
        return this.request("DescribeConnectionConfig", req, cb);
    }
    async DescribeInstanceBinlogs(req, cb) {
        return this.request("DescribeInstanceBinlogs", req, cb);
    }
    async DescribeAutoBackupConfig(req, cb) {
        return this.request("DescribeAutoBackupConfig", req, cb);
    }
    async ChangeInstanceMaster(req, cb) {
        return this.request("ChangeInstanceMaster", req, cb);
    }
    async CreateInstances(req, cb) {
        return this.request("CreateInstances", req, cb);
    }
    async RenewInstance(req, cb) {
        return this.request("RenewInstance", req, cb);
    }
    async DescribeTaskInfo(req, cb) {
        return this.request("DescribeTaskInfo", req, cb);
    }
    async DescribeProxySlowLog(req, cb) {
        return this.request("DescribeProxySlowLog", req, cb);
    }
    async DescribeProjectSecurityGroups(req, cb) {
        return this.request("DescribeProjectSecurityGroups", req, cb);
    }
    async DescribeTendisSlowLog(req, cb) {
        return this.request("DescribeTendisSlowLog", req, cb);
    }
    async AssociateSecurityGroups(req, cb) {
        return this.request("AssociateSecurityGroups", req, cb);
    }
    async ModifyInstanceParams(req, cb) {
        return this.request("ModifyInstanceParams", req, cb);
    }
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    async DescribeInstanceParams(req, cb) {
        return this.request("DescribeInstanceParams", req, cb);
    }
    async DescribeInstanceReplicas(req, cb) {
        return this.request("DescribeInstanceReplicas", req, cb);
    }
    async ModifyConnectionConfig(req, cb) {
        return this.request("ModifyConnectionConfig", req, cb);
    }
    async DescribeProductInfo(req, cb) {
        return this.request("DescribeProductInfo", req, cb);
    }
    async UpgradeInstance(req, cb) {
        return this.request("UpgradeInstance", req, cb);
    }
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    async CreateBackupManually(req, cb) {
        return this.request("CreateBackupManually", req, cb);
    }
    async DestroyPrepaidInstance(req, cb) {
        return this.request("DestroyPrepaidInstance", req, cb);
    }
    async DescribeInstanceParamRecords(req, cb) {
        return this.request("DescribeInstanceParamRecords", req, cb);
    }
    async ClearInstance(req, cb) {
        return this.request("ClearInstance", req, cb);
    }
    async DescribeInstanceDealDetail(req, cb) {
        return this.request("DescribeInstanceDealDetail", req, cb);
    }
    async DestroyPostpaidInstance(req, cb) {
        return this.request("DestroyPostpaidInstance", req, cb);
    }
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
    async ModifyInstance(req, cb) {
        return this.request("ModifyInstance", req, cb);
    }
    async StartUpInstance(req, cb) {
        return this.request("StartUpInstance", req, cb);
    }
}
