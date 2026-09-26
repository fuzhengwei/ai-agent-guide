import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dcdb.tencentcloudapi.com", "2018-04-11", clientConfig);
    }
    async DescribeAccountPrivileges(req, cb) {
        return this.request("DescribeAccountPrivileges", req, cb);
    }
    async ModifyAccountConfig(req, cb) {
        return this.request("ModifyAccountConfig", req, cb);
    }
    async UpgradeDedicatedDCDBInstance(req, cb) {
        return this.request("UpgradeDedicatedDCDBInstance", req, cb);
    }
    async ActiveHourDCDBInstance(req, cb) {
        return this.request("ActiveHourDCDBInstance", req, cb);
    }
    async DescribeDatabaseObjects(req, cb) {
        return this.request("DescribeDatabaseObjects", req, cb);
    }
    async DescribeDatabaseTable(req, cb) {
        return this.request("DescribeDatabaseTable", req, cb);
    }
    async DescribeShardSpec(req, cb) {
        return this.request("DescribeShardSpec", req, cb);
    }
    async ResetAccountPassword(req, cb) {
        return this.request("ResetAccountPassword", req, cb);
    }
    async ModifyInstanceVip(req, cb) {
        return this.request("ModifyInstanceVip", req, cb);
    }
    async DescribeDCDBInstances(req, cb) {
        return this.request("DescribeDCDBInstances", req, cb);
    }
    async ModifyRealServerAccessStrategy(req, cb) {
        return this.request("ModifyRealServerAccessStrategy", req, cb);
    }
    async DescribeFileDownloadUrl(req, cb) {
        return this.request("DescribeFileDownloadUrl", req, cb);
    }
    async ModifyAccountDescription(req, cb) {
        return this.request("ModifyAccountDescription", req, cb);
    }
    async DescribeInstanceSSLAttributes(req, cb) {
        return this.request("DescribeInstanceSSLAttributes", req, cb);
    }
    async DescribeUserTasks(req, cb) {
        return this.request("DescribeUserTasks", req, cb);
    }
    async DescribeDCDBPrice(req, cb) {
        return this.request("DescribeDCDBPrice", req, cb);
    }
    async ModifyDBParameters(req, cb) {
        return this.request("ModifyDBParameters", req, cb);
    }
    async DescribeDCDBSaleInfo(req, cb) {
        return this.request("DescribeDCDBSaleInfo", req, cb);
    }
    async DescribeDBSlowLogs(req, cb) {
        return this.request("DescribeDBSlowLogs", req, cb);
    }
    async DescribeFlow(req, cb) {
        return this.request("DescribeFlow", req, cb);
    }
    async SwitchDBInstanceHA(req, cb) {
        return this.request("SwitchDBInstanceHA", req, cb);
    }
    async InitDCDBInstances(req, cb) {
        return this.request("InitDCDBInstances", req, cb);
    }
    async DescribeDCDBInstanceDetail(req, cb) {
        return this.request("DescribeDCDBInstanceDetail", req, cb);
    }
    async CreateDedicatedClusterDCDBInstance(req, cb) {
        return this.request("CreateDedicatedClusterDCDBInstance", req, cb);
    }
    async RenewDCDBInstance(req, cb) {
        return this.request("RenewDCDBInstance", req, cb);
    }
    async DeleteAccount(req, cb) {
        return this.request("DeleteAccount", req, cb);
    }
    async DescribeDBParameters(req, cb) {
        return this.request("DescribeDBParameters", req, cb);
    }
    async ModifyDBInstancesProject(req, cb) {
        return this.request("ModifyDBInstancesProject", req, cb);
    }
    async CreateTmpDCDBInstance(req, cb) {
        return this.request("CreateTmpDCDBInstance", req, cb);
    }
    async DescribeOnlineDDLJob(req, cb) {
        return this.request("DescribeOnlineDDLJob", req, cb);
    }
    async DescribeDBLogFiles(req, cb) {
        return this.request("DescribeDBLogFiles", req, cb);
    }
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    async ModifyInstanceProtectedProperty(req, cb) {
        return this.request("ModifyInstanceProtectedProperty", req, cb);
    }
    async IsolateHourDCDBInstance(req, cb) {
        return this.request("IsolateHourDCDBInstance", req, cb);
    }
    async UpgradeHourDCDBInstance(req, cb) {
        return this.request("UpgradeHourDCDBInstance", req, cb);
    }
    async DescribeDBSyncMode(req, cb) {
        return this.request("DescribeDBSyncMode", req, cb);
    }
    async UpgradeDCDBInstance(req, cb) {
        return this.request("UpgradeDCDBInstance", req, cb);
    }
    async DescribeDCDBBinlogTime(req, cb) {
        return this.request("DescribeDCDBBinlogTime", req, cb);
    }
    async DescribeProjectSecurityGroups(req, cb) {
        return this.request("DescribeProjectSecurityGroups", req, cb);
    }
    async AssociateSecurityGroups(req, cb) {
        return this.request("AssociateSecurityGroups", req, cb);
    }
    async CreateAccount(req, cb) {
        return this.request("CreateAccount", req, cb);
    }
    async ModifyInstanceNetwork(req, cb) {
        return this.request("ModifyInstanceNetwork", req, cb);
    }
    async KillSession(req, cb) {
        return this.request("KillSession", req, cb);
    }
    async OpenDBExtranetAccess(req, cb) {
        return this.request("OpenDBExtranetAccess", req, cb);
    }
    async ModifyAccountPrivileges(req, cb) {
        return this.request("ModifyAccountPrivileges", req, cb);
    }
    async DestroyDCDBInstance(req, cb) {
        return this.request("DestroyDCDBInstance", req, cb);
    }
    async DescribeDCDBInstanceNodeInfo(req, cb) {
        return this.request("DescribeDCDBInstanceNodeInfo", req, cb);
    }
    async ModifyDBSyncMode(req, cb) {
        return this.request("ModifyDBSyncMode", req, cb);
    }
    async DescribeLogFileRetentionPeriod(req, cb) {
        return this.request("DescribeLogFileRetentionPeriod", req, cb);
    }
    async CloseDBExtranetAccess(req, cb) {
        return this.request("CloseDBExtranetAccess", req, cb);
    }
    async ModifyInstanceSSLAttributes(req, cb) {
        return this.request("ModifyInstanceSSLAttributes", req, cb);
    }
    async DescribeBackupFiles(req, cb) {
        return this.request("DescribeBackupFiles", req, cb);
    }
    async ModifyDBEncryptAttributes(req, cb) {
        return this.request("ModifyDBEncryptAttributes", req, cb);
    }
    async DestroyHourDCDBInstance(req, cb) {
        return this.request("DestroyHourDCDBInstance", req, cb);
    }
    async DescribeAccounts(req, cb) {
        return this.request("DescribeAccounts", req, cb);
    }
    async DescribeDcnDetail(req, cb) {
        return this.request("DescribeDcnDetail", req, cb);
    }
    async FlushBinlog(req, cb) {
        return this.request("FlushBinlog", req, cb);
    }
    async GrantAccountPrivileges(req, cb) {
        return this.request("GrantAccountPrivileges", req, cb);
    }
    async CancelOnlineDDLJob(req, cb) {
        return this.request("CancelOnlineDDLJob", req, cb);
    }
    async CopyAccountPrivileges(req, cb) {
        return this.request("CopyAccountPrivileges", req, cb);
    }
    async DescribeDBTmpInstances(req, cb) {
        return this.request("DescribeDBTmpInstances", req, cb);
    }
    async DescribeDCDBShards(req, cb) {
        return this.request("DescribeDCDBShards", req, cb);
    }
    async DescribeDatabases(req, cb) {
        return this.request("DescribeDatabases", req, cb);
    }
    async CreateDCDBInstance(req, cb) {
        return this.request("CreateDCDBInstance", req, cb);
    }
    async DescribeProjects(req, cb) {
        return this.request("DescribeProjects", req, cb);
    }
    async IsolateDCDBInstance(req, cb) {
        return this.request("IsolateDCDBInstance", req, cb);
    }
    async ModifyInstanceVport(req, cb) {
        return this.request("ModifyInstanceVport", req, cb);
    }
    async TerminateDedicatedDBInstance(req, cb) {
        return this.request("TerminateDedicatedDBInstance", req, cb);
    }
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    async IsolateDedicatedDBInstance(req, cb) {
        return this.request("IsolateDedicatedDBInstance", req, cb);
    }
    async DescribeDCDBUpgradePrice(req, cb) {
        return this.request("DescribeDCDBUpgradePrice", req, cb);
    }
    async CancelDcnJob(req, cb) {
        return this.request("CancelDcnJob", req, cb);
    }
    async DescribeBackupConfigs(req, cb) {
        return this.request("DescribeBackupConfigs", req, cb);
    }
    async CloneAccount(req, cb) {
        return this.request("CloneAccount", req, cb);
    }
    async CreateOnlineDDLJob(req, cb) {
        return this.request("CreateOnlineDDLJob", req, cb);
    }
    async DescribeProcessList(req, cb) {
        return this.request("DescribeProcessList", req, cb);
    }
    async ModifyBackupConfigs(req, cb) {
        return this.request("ModifyBackupConfigs", req, cb);
    }
    async ModifyDBInstanceName(req, cb) {
        return this.request("ModifyDBInstanceName", req, cb);
    }
    async CreateHourDCDBInstance(req, cb) {
        return this.request("CreateHourDCDBInstance", req, cb);
    }
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
    async DescribeDBEncryptAttributes(req, cb) {
        return this.request("DescribeDBEncryptAttributes", req, cb);
    }
    async DescribeDCDBRenewalPrice(req, cb) {
        return this.request("DescribeDCDBRenewalPrice", req, cb);
    }
    async DescribeOrders(req, cb) {
        return this.request("DescribeOrders", req, cb);
    }
}
