import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("mariadb.tencentcloudapi.com", "2017-03-12", clientConfig);
    }
    async DescribeAccountPrivileges(req, cb) {
        return this.request("DescribeAccountPrivileges", req, cb);
    }
    async DescribeRenewalPrice(req, cb) {
        return this.request("DescribeRenewalPrice", req, cb);
    }
    async CreateHourDBInstance(req, cb) {
        return this.request("CreateHourDBInstance", req, cb);
    }
    async DescribeInstanceNodeInfo(req, cb) {
        return this.request("DescribeInstanceNodeInfo", req, cb);
    }
    async DescribeDatabaseObjects(req, cb) {
        return this.request("DescribeDatabaseObjects", req, cb);
    }
    async ModifyBackupTime(req, cb) {
        return this.request("ModifyBackupTime", req, cb);
    }
    async ModifyInstanceVport(req, cb) {
        return this.request("ModifyInstanceVport", req, cb);
    }
    async DescribeSaleInfo(req, cb) {
        return this.request("DescribeSaleInfo", req, cb);
    }
    async ModifyAccountDescription(req, cb) {
        return this.request("ModifyAccountDescription", req, cb);
    }
    async DestroyDBInstance(req, cb) {
        return this.request("DestroyDBInstance", req, cb);
    }
    async SwitchDBInstanceHA(req, cb) {
        return this.request("SwitchDBInstanceHA", req, cb);
    }
    async DescribeFileDownloadUrl(req, cb) {
        return this.request("DescribeFileDownloadUrl", req, cb);
    }
    async DescribeBackupTime(req, cb) {
        return this.request("DescribeBackupTime", req, cb);
    }
    async DescribeInstanceSSLAttributes(req, cb) {
        return this.request("DescribeInstanceSSLAttributes", req, cb);
    }
    async ActivateHourDBInstance(req, cb) {
        return this.request("ActivateHourDBInstance", req, cb);
    }
    async ResetAccountPassword(req, cb) {
        return this.request("ResetAccountPassword", req, cb);
    }
    async ModifyDBParameters(req, cb) {
        return this.request("ModifyDBParameters", req, cb);
    }
    async KillSession(req, cb) {
        return this.request("KillSession", req, cb);
    }
    async ModifyInstanceSSLAttributes(req, cb) {
        return this.request("ModifyInstanceSSLAttributes", req, cb);
    }
    async DescribeDBSlowLogs(req, cb) {
        return this.request("DescribeDBSlowLogs", req, cb);
    }
    async DescribeFlow(req, cb) {
        return this.request("DescribeFlow", req, cb);
    }
    async CreateDedicatedClusterDBInstance(req, cb) {
        return this.request("CreateDedicatedClusterDBInstance", req, cb);
    }
    async ModifyDBInstanceName(req, cb) {
        return this.request("ModifyDBInstanceName", req, cb);
    }
    async IsolateDedicatedDBInstance(req, cb) {
        return this.request("IsolateDedicatedDBInstance", req, cb);
    }
    async DescribeOrders(req, cb) {
        return this.request("DescribeOrders", req, cb);
    }
    async ModifySyncTaskAttribute(req, cb) {
        return this.request("ModifySyncTaskAttribute", req, cb);
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
    async RestartDBInstances(req, cb) {
        return this.request("RestartDBInstances", req, cb);
    }
    async ModifyInstanceVip(req, cb) {
        return this.request("ModifyInstanceVip", req, cb);
    }
    async IsolateDBInstance(req, cb) {
        return this.request("IsolateDBInstance", req, cb);
    }
    async DescribeDBLogFiles(req, cb) {
        return this.request("DescribeDBLogFiles", req, cb);
    }
    async ModifyRealServerAccessStrategy(req, cb) {
        return this.request("ModifyRealServerAccessStrategy", req, cb);
    }
    async ModifyInstanceProtectedProperty(req, cb) {
        return this.request("ModifyInstanceProtectedProperty", req, cb);
    }
    async ModifyInstanceNetwork(req, cb) {
        return this.request("ModifyInstanceNetwork", req, cb);
    }
    async DestroyHourDBInstance(req, cb) {
        return this.request("DestroyHourDBInstance", req, cb);
    }
    async DescribeDBInstanceSpecs(req, cb) {
        return this.request("DescribeDBInstanceSpecs", req, cb);
    }
    async DescribeDBInstances(req, cb) {
        return this.request("DescribeDBInstances", req, cb);
    }
    async RenewDBInstance(req, cb) {
        return this.request("RenewDBInstance", req, cb);
    }
    async DescribeUpgradePrice(req, cb) {
        return this.request("DescribeUpgradePrice", req, cb);
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
    async OpenDBExtranetAccess(req, cb) {
        return this.request("OpenDBExtranetAccess", req, cb);
    }
    async InitDBInstances(req, cb) {
        return this.request("InitDBInstances", req, cb);
    }
    async UpgradeDedicatedDBInstance(req, cb) {
        return this.request("UpgradeDedicatedDBInstance", req, cb);
    }
    async CreateDBInstance(req, cb) {
        return this.request("CreateDBInstance", req, cb);
    }
    async ModifyAccountPrivileges(req, cb) {
        return this.request("ModifyAccountPrivileges", req, cb);
    }
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    async ModifyDBSyncMode(req, cb) {
        return this.request("ModifyDBSyncMode", req, cb);
    }
    async CloseDBExtranetAccess(req, cb) {
        return this.request("CloseDBExtranetAccess", req, cb);
    }
    async CreateTmpInstances(req, cb) {
        return this.request("CreateTmpInstances", req, cb);
    }
    async DescribeBackupFiles(req, cb) {
        return this.request("DescribeBackupFiles", req, cb);
    }
    async ModifyDBEncryptAttributes(req, cb) {
        return this.request("ModifyDBEncryptAttributes", req, cb);
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
    async CopyAccountPrivileges(req, cb) {
        return this.request("CopyAccountPrivileges", req, cb);
    }
    async DescribeDBTmpInstances(req, cb) {
        return this.request("DescribeDBTmpInstances", req, cb);
    }
    async DescribeDBSyncMode(req, cb) {
        return this.request("DescribeDBSyncMode", req, cb);
    }
    async DescribeDatabases(req, cb) {
        return this.request("DescribeDatabases", req, cb);
    }
    async DescribePrice(req, cb) {
        return this.request("DescribePrice", req, cb);
    }
    async DescribeBinlogTime(req, cb) {
        return this.request("DescribeBinlogTime", req, cb);
    }
    async TerminateDedicatedDBInstance(req, cb) {
        return this.request("TerminateDedicatedDBInstance", req, cb);
    }
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    async UpgradeHourDBInstance(req, cb) {
        return this.request("UpgradeHourDBInstance", req, cb);
    }
    async DescribeDatabaseTable(req, cb) {
        return this.request("DescribeDatabaseTable", req, cb);
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
    async IsolateHourDBInstance(req, cb) {
        return this.request("IsolateHourDBInstance", req, cb);
    }
    async UpgradeDBInstance(req, cb) {
        return this.request("UpgradeDBInstance", req, cb);
    }
    async DescribeProcessList(req, cb) {
        return this.request("DescribeProcessList", req, cb);
    }
    async ModifyBackupConfigs(req, cb) {
        return this.request("ModifyBackupConfigs", req, cb);
    }
    async DescribeDBInstanceDetail(req, cb) {
        return this.request("DescribeDBInstanceDetail", req, cb);
    }
    async DescribeLogFileRetentionPeriod(req, cb) {
        return this.request("DescribeLogFileRetentionPeriod", req, cb);
    }
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
    async DescribeDBEncryptAttributes(req, cb) {
        return this.request("DescribeDBEncryptAttributes", req, cb);
    }
    async ModifyLogFileRetentionPeriod(req, cb) {
        return this.request("ModifyLogFileRetentionPeriod", req, cb);
    }
}
