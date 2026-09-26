import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("sqlserver.tencentcloudapi.com", "2018-03-28", clientConfig);
    }
    async ModifyAccountPrivilege(req, cb) {
        return this.request("ModifyAccountPrivilege", req, cb);
    }
    async RecycleReadOnlyGroup(req, cb) {
        return this.request("RecycleReadOnlyGroup", req, cb);
    }
    async ModifyBackupName(req, cb) {
        return this.request("ModifyBackupName", req, cb);
    }
    async DescribeSpecSellStatus(req, cb) {
        return this.request("DescribeSpecSellStatus", req, cb);
    }
    async StartIncrementalMigration(req, cb) {
        return this.request("StartIncrementalMigration", req, cb);
    }
    async QueryMigrationCheckProcess(req, cb) {
        return this.request("QueryMigrationCheckProcess", req, cb);
    }
    async ModifyAccountRemark(req, cb) {
        return this.request("ModifyAccountRemark", req, cb);
    }
    async ModifyPublishSubscribe(req, cb) {
        return this.request("ModifyPublishSubscribe", req, cb);
    }
    async ModifyDBInstanceName(req, cb) {
        return this.request("ModifyDBInstanceName", req, cb);
    }
    async DescribeUploadIncrementalInfo(req, cb) {
        return this.request("DescribeUploadIncrementalInfo", req, cb);
    }
    async ModifyDatabaseMdf(req, cb) {
        return this.request("ModifyDatabaseMdf", req, cb);
    }
    async ModifyDBRemark(req, cb) {
        return this.request("ModifyDBRemark", req, cb);
    }
    async DeleteIncrementalMigration(req, cb) {
        return this.request("DeleteIncrementalMigration", req, cb);
    }
    async RunMigration(req, cb) {
        return this.request("RunMigration", req, cb);
    }
    async ModifyDBInstanceNetwork(req, cb) {
        return this.request("ModifyDBInstanceNetwork", req, cb);
    }
    async CreateCloudReadOnlyDBInstances(req, cb) {
        return this.request("CreateCloudReadOnlyDBInstances", req, cb);
    }
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    async ModifyMaintenanceSpan(req, cb) {
        return this.request("ModifyMaintenanceSpan", req, cb);
    }
    async DescribeRegularBackupPlan(req, cb) {
        return this.request("DescribeRegularBackupPlan", req, cb);
    }
    async DescribeReadOnlyGroupDetails(req, cb) {
        return this.request("DescribeReadOnlyGroupDetails", req, cb);
    }
    async CreatePublishSubscribe(req, cb) {
        return this.request("CreatePublishSubscribe", req, cb);
    }
    async DescribeBackupFiles(req, cb) {
        return this.request("DescribeBackupFiles", req, cb);
    }
    async DescribeMaintenanceSpan(req, cb) {
        return this.request("DescribeMaintenanceSpan", req, cb);
    }
    async DescribePublishSubscribe(req, cb) {
        return this.request("DescribePublishSubscribe", req, cb);
    }
    async DescribeDatabases(req, cb) {
        return this.request("DescribeDatabases", req, cb);
    }
    async CutXEvents(req, cb) {
        return this.request("CutXEvents", req, cb);
    }
    async DescribeReadOnlyGroupList(req, cb) {
        return this.request("DescribeReadOnlyGroupList", req, cb);
    }
    async DescribeMigrationDetail(req, cb) {
        return this.request("DescribeMigrationDetail", req, cb);
    }
    async DescribeZones(req, cb) {
        return this.request("DescribeZones", req, cb);
    }
    async DescribeUploadBackupInfo(req, cb) {
        return this.request("DescribeUploadBackupInfo", req, cb);
    }
    async DescribeProductConfig(req, cb) {
        return this.request("DescribeProductConfig", req, cb);
    }
    async DescribeUpgradeInstanceCheck(req, cb) {
        return this.request("DescribeUpgradeInstanceCheck", req, cb);
    }
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
    async DescribeLogs(req, cb) {
        return this.request("DescribeLogs", req, cb);
    }
    async TerminateDBInstance(req, cb) {
        return this.request("TerminateDBInstance", req, cb);
    }
    async ModifyDBInstanceNote(req, cb) {
        return this.request("ModifyDBInstanceNote", req, cb);
    }
    async DeleteDBInstance(req, cb) {
        return this.request("DeleteDBInstance", req, cb);
    }
    async CreateBusinessDBInstances(req, cb) {
        return this.request("CreateBusinessDBInstances", req, cb);
    }
    async ModifyDBName(req, cb) {
        return this.request("ModifyDBName", req, cb);
    }
    async InquiryPriceCreateDBInstances(req, cb) {
        return this.request("InquiryPriceCreateDBInstances", req, cb);
    }
    async DescribeCrossRegionZone(req, cb) {
        return this.request("DescribeCrossRegionZone", req, cb);
    }
    async ModifyDatabaseCT(req, cb) {
        return this.request("ModifyDatabaseCT", req, cb);
    }
    async DescribeBackups(req, cb) {
        return this.request("DescribeBackups", req, cb);
    }
    async ModifyPublishSubscribeName(req, cb) {
        return this.request("ModifyPublishSubscribeName", req, cb);
    }
    async RenewPostpaidDBInstance(req, cb) {
        return this.request("RenewPostpaidDBInstance", req, cb);
    }
    async DescribeIncrementalMigration(req, cb) {
        return this.request("DescribeIncrementalMigration", req, cb);
    }
    async DeleteExportTask(req, cb) {
        return this.request("DeleteExportTask", req, cb);
    }
    async CreateBackup(req, cb) {
        return this.request("CreateBackup", req, cb);
    }
    async DescribeDBRestoreTime(req, cb) {
        return this.request("DescribeDBRestoreTime", req, cb);
    }
    async DescribeBackupMigration(req, cb) {
        return this.request("DescribeBackupMigration", req, cb);
    }
    async BalanceReadOnlyGroup(req, cb) {
        return this.request("BalanceReadOnlyGroup", req, cb);
    }
    async ModifyDatabaseCDC(req, cb) {
        return this.request("ModifyDatabaseCDC", req, cb);
    }
    async DeleteRestoreTask(req, cb) {
        return this.request("DeleteRestoreTask", req, cb);
    }
    async CompleteMigration(req, cb) {
        return this.request("CompleteMigration", req, cb);
    }
    async DescribeProjectSecurityGroups(req, cb) {
        return this.request("DescribeProjectSecurityGroups", req, cb);
    }
    async CreateAccount(req, cb) {
        return this.request("CreateAccount", req, cb);
    }
    async StopMigration(req, cb) {
        return this.request("StopMigration", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async DescribeRestoreTask(req, cb) {
        return this.request("DescribeRestoreTask", req, cb);
    }
    async DescribeInstanceParams(req, cb) {
        return this.request("DescribeInstanceParams", req, cb);
    }
    async ModifyDatabasePrivilege(req, cb) {
        return this.request("ModifyDatabasePrivilege", req, cb);
    }
    async ModifyCloseWanIp(req, cb) {
        return this.request("ModifyCloseWanIp", req, cb);
    }
    async CompleteExpansion(req, cb) {
        return this.request("CompleteExpansion", req, cb);
    }
    async DescribeBackupStatistical(req, cb) {
        return this.request("DescribeBackupStatistical", req, cb);
    }
    async CreateDB(req, cb) {
        return this.request("CreateDB", req, cb);
    }
    async CreateCloudDBInstances(req, cb) {
        return this.request("CreateCloudDBInstances", req, cb);
    }
    async DescribeCollationTimeZone(req, cb) {
        return this.request("DescribeCollationTimeZone", req, cb);
    }
    async DescribeInstanceParamRecords(req, cb) {
        return this.request("DescribeInstanceParamRecords", req, cb);
    }
    async CreateBusinessIntelligenceFile(req, cb) {
        return this.request("CreateBusinessIntelligenceFile", req, cb);
    }
    async DescribeInstanceTasks(req, cb) {
        return this.request("DescribeInstanceTasks", req, cb);
    }
    async DescribeHASwitchLog(req, cb) {
        return this.request("DescribeHASwitchLog", req, cb);
    }
    async StartMigrationCheck(req, cb) {
        return this.request("StartMigrationCheck", req, cb);
    }
    async DescribeDBCharsets(req, cb) {
        return this.request("DescribeDBCharsets", req, cb);
    }
    async DeletePublishSubscribe(req, cb) {
        return this.request("DeletePublishSubscribe", req, cb);
    }
    async ModifyDatabaseShrinkMDF(req, cb) {
        return this.request("ModifyDatabaseShrinkMDF", req, cb);
    }
    async ResetAccountPassword(req, cb) {
        return this.request("ResetAccountPassword", req, cb);
    }
    async ModifyInstanceParam(req, cb) {
        return this.request("ModifyInstanceParam", req, cb);
    }
    async DescribeRestoreTimeRange(req, cb) {
        return this.request("DescribeRestoreTimeRange", req, cb);
    }
    async DescribeSlowlogs(req, cb) {
        return this.request("DescribeSlowlogs", req, cb);
    }
    async ModifyCrossBackupStrategy(req, cb) {
        return this.request("ModifyCrossBackupStrategy", req, cb);
    }
    async DeleteDB(req, cb) {
        return this.request("DeleteDB", req, cb);
    }
    async DescribeFlowStatus(req, cb) {
        return this.request("DescribeFlowStatus", req, cb);
    }
    async CreateBasicDBInstances(req, cb) {
        return this.request("CreateBasicDBInstances", req, cb);
    }
    async RestartDBInstance(req, cb) {
        return this.request("RestartDBInstance", req, cb);
    }
    async CreateDBInstances(req, cb) {
        return this.request("CreateDBInstances", req, cb);
    }
    async CreateMigration(req, cb) {
        return this.request("CreateMigration", req, cb);
    }
    async DeleteBusinessIntelligenceFile(req, cb) {
        return this.request("DeleteBusinessIntelligenceFile", req, cb);
    }
    async CreateBackupMigration(req, cb) {
        return this.request("CreateBackupMigration", req, cb);
    }
    async DescribeDBInstances(req, cb) {
        return this.request("DescribeDBInstances", req, cb);
    }
    async DescribeBusinessIntelligenceFile(req, cb) {
        return this.request("DescribeBusinessIntelligenceFile", req, cb);
    }
    async StartBackupMigration(req, cb) {
        return this.request("StartBackupMigration", req, cb);
    }
    async AssociateSecurityGroups(req, cb) {
        return this.request("AssociateSecurityGroups", req, cb);
    }
    async ModifyLog(req, cb) {
        return this.request("ModifyLog", req, cb);
    }
    async DescribeExportTasks(req, cb) {
        return this.request("DescribeExportTasks", req, cb);
    }
    async OpenInterCommunication(req, cb) {
        return this.request("OpenInterCommunication", req, cb);
    }
    async CreateIncrementalMigration(req, cb) {
        return this.request("CreateIncrementalMigration", req, cb);
    }
    async DescribeBackupUploadSize(req, cb) {
        return this.request("DescribeBackupUploadSize", req, cb);
    }
    async StartInstanceXEvent(req, cb) {
        return this.request("StartInstanceXEvent", req, cb);
    }
    async DeleteMigration(req, cb) {
        return this.request("DeleteMigration", req, cb);
    }
    async ModifyInstanceEncryptAttributes(req, cb) {
        return this.request("ModifyInstanceEncryptAttributes", req, cb);
    }
    async DescribeDatabaseNames(req, cb) {
        return this.request("DescribeDatabaseNames", req, cb);
    }
    async DescribeInstanceByOrders(req, cb) {
        return this.request("DescribeInstanceByOrders", req, cb);
    }
    async DescribeAccounts(req, cb) {
        return this.request("DescribeAccounts", req, cb);
    }
    async ModifyIncrementalMigration(req, cb) {
        return this.request("ModifyIncrementalMigration", req, cb);
    }
    async ModifyDBEncryptAttributes(req, cb) {
        return this.request("ModifyDBEncryptAttributes", req, cb);
    }
    async DescribeCrossRegions(req, cb) {
        return this.request("DescribeCrossRegions", req, cb);
    }
    async ModifyDReadable(req, cb) {
        return this.request("ModifyDReadable", req, cb);
    }
    async RemoveBackups(req, cb) {
        return this.request("RemoveBackups", req, cb);
    }
    async SwitchCloudInstanceHA(req, cb) {
        return this.request("SwitchCloudInstanceHA", req, cb);
    }
    async DescribeMigrationDatabases(req, cb) {
        return this.request("DescribeMigrationDatabases", req, cb);
    }
    async DescribeDBInstanceInter(req, cb) {
        return this.request("DescribeDBInstanceInter", req, cb);
    }
    async RecycleDBInstance(req, cb) {
        return this.request("RecycleDBInstance", req, cb);
    }
    async CreateReadOnlyDBInstances(req, cb) {
        return this.request("CreateReadOnlyDBInstances", req, cb);
    }
    async CloseLog(req, cb) {
        return this.request("CloseLog", req, cb);
    }
    async DescribeInquiryPriceParameter(req, cb) {
        return this.request("DescribeInquiryPriceParameter", req, cb);
    }
    async CloseInterCommunication(req, cb) {
        return this.request("CloseInterCommunication", req, cb);
    }
    async DescribeBackupSummary(req, cb) {
        return this.request("DescribeBackupSummary", req, cb);
    }
    async ModifyMigration(req, cb) {
        return this.request("ModifyMigration", req, cb);
    }
    async DescribeOrders(req, cb) {
        return this.request("DescribeOrders", req, cb);
    }
    async CreateExportTask(req, cb) {
        return this.request("CreateExportTask", req, cb);
    }
    async DescribeInstanceTradeParameter(req, cb) {
        return this.request("DescribeInstanceTradeParameter", req, cb);
    }
    async DescribeBackupMonitor(req, cb) {
        return this.request("DescribeBackupMonitor", req, cb);
    }
    async DescribeLogInstanceList(req, cb) {
        return this.request("DescribeLogInstanceList", req, cb);
    }
    async CloneDB(req, cb) {
        return this.request("CloneDB", req, cb);
    }
    async RestoreInstance(req, cb) {
        return this.request("RestoreInstance", req, cb);
    }
    async ModifyDBInstanceProject(req, cb) {
        return this.request("ModifyDBInstanceProject", req, cb);
    }
    async DescribeCrossBackupStatistical(req, cb) {
        return this.request("DescribeCrossBackupStatistical", req, cb);
    }
    async DeleteAccount(req, cb) {
        return this.request("DeleteAccount", req, cb);
    }
    async OpenLog(req, cb) {
        return this.request("OpenLog", req, cb);
    }
    async ModifyDBInstanceSSL(req, cb) {
        return this.request("ModifyDBInstanceSSL", req, cb);
    }
    async ModifyBackupStrategy(req, cb) {
        return this.request("ModifyBackupStrategy", req, cb);
    }
    async DescribeDBsNormal(req, cb) {
        return this.request("DescribeDBsNormal", req, cb);
    }
    async ModifyOpenWanIp(req, cb) {
        return this.request("ModifyOpenWanIp", req, cb);
    }
    async DescribeMigrations(req, cb) {
        return this.request("DescribeMigrations", req, cb);
    }
    async DescribeDatabasesNormal(req, cb) {
        return this.request("DescribeDatabasesNormal", req, cb);
    }
    async RollbackInstance(req, cb) {
        return this.request("RollbackInstance", req, cb);
    }
    async DescribeDBs(req, cb) {
        return this.request("DescribeDBs", req, cb);
    }
    async DescribeBackupCommand(req, cb) {
        return this.request("DescribeBackupCommand", req, cb);
    }
    async RenewDBInstance(req, cb) {
        return this.request("RenewDBInstance", req, cb);
    }
    async InquiryPriceUpgradeDBInstance(req, cb) {
        return this.request("InquiryPriceUpgradeDBInstance", req, cb);
    }
    async DescribeReadOnlyGroupAutoWeight(req, cb) {
        return this.request("DescribeReadOnlyGroupAutoWeight", req, cb);
    }
    async InquiryPriceRenewDBInstance(req, cb) {
        return this.request("InquiryPriceRenewDBInstance", req, cb);
    }
    async DescribeXEvents(req, cb) {
        return this.request("DescribeXEvents", req, cb);
    }
    async ModifyBackupMigration(req, cb) {
        return this.request("ModifyBackupMigration", req, cb);
    }
    async DescribeDBPrivilegeByAccount(req, cb) {
        return this.request("DescribeDBPrivilegeByAccount", req, cb);
    }
    async DescribeAccountPrivilegeByDB(req, cb) {
        return this.request("DescribeAccountPrivilegeByDB", req, cb);
    }
    async DescribeProductSpec(req, cb) {
        return this.request("DescribeProductSpec", req, cb);
    }
    async DescribeBackupByFlowId(req, cb) {
        return this.request("DescribeBackupByFlowId", req, cb);
    }
    async DescribeRollbackTime(req, cb) {
        return this.request("DescribeRollbackTime", req, cb);
    }
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    async ModifyReadOnlyGroupDetails(req, cb) {
        return this.request("ModifyReadOnlyGroupDetails", req, cb);
    }
    async DeleteBackupMigration(req, cb) {
        return this.request("DeleteBackupMigration", req, cb);
    }
    async DescribeDBInstancesAttribute(req, cb) {
        return this.request("DescribeDBInstancesAttribute", req, cb);
    }
    async UpgradeDBInstance(req, cb) {
        return this.request("UpgradeDBInstance", req, cb);
    }
    async ModifyDBInstanceRenewFlag(req, cb) {
        return this.request("ModifyDBInstanceRenewFlag", req, cb);
    }
    async DescribeReadOnlyGroupByReadOnlyInstance(req, cb) {
        return this.request("DescribeReadOnlyGroupByReadOnlyInstance", req, cb);
    }
}
