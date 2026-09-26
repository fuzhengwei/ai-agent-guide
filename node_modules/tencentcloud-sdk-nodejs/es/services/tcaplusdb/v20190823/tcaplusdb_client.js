import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tcaplusdb.tencentcloudapi.com", "2019-08-23", clientConfig);
    }
    async DeleteTableIndex(req, cb) {
        return this.request("DeleteTableIndex", req, cb);
    }
    async DescribeTableTags(req, cb) {
        return this.request("DescribeTableTags", req, cb);
    }
    async UpdateApply(req, cb) {
        return this.request("UpdateApply", req, cb);
    }
    async ModifyTableTags(req, cb) {
        return this.request("ModifyTableTags", req, cb);
    }
    async CreateCluster(req, cb) {
        return this.request("CreateCluster", req, cb);
    }
    async DescribeMachine(req, cb) {
        return this.request("DescribeMachine", req, cb);
    }
    async MergeTablesData(req, cb) {
        return this.request("MergeTablesData", req, cb);
    }
    async DescribeUinInWhitelist(req, cb) {
        return this.request("DescribeUinInWhitelist", req, cb);
    }
    async DescribeTablesInRecycle(req, cb) {
        return this.request("DescribeTablesInRecycle", req, cb);
    }
    async ModifyClusterName(req, cb) {
        return this.request("ModifyClusterName", req, cb);
    }
    async DisableRestProxy(req, cb) {
        return this.request("DisableRestProxy", req, cb);
    }
    async DeleteBackupRecords(req, cb) {
        return this.request("DeleteBackupRecords", req, cb);
    }
    async SetTableDataFlow(req, cb) {
        return this.request("SetTableDataFlow", req, cb);
    }
    async DeleteCluster(req, cb) {
        return this.request("DeleteCluster", req, cb);
    }
    async ModifyClusterPassword(req, cb) {
        return this.request("ModifyClusterPassword", req, cb);
    }
    async SetTableIndex(req, cb) {
        return this.request("SetTableIndex", req, cb);
    }
    async DeleteIdlFiles(req, cb) {
        return this.request("DeleteIdlFiles", req, cb);
    }
    async CreateSnapshots(req, cb) {
        return this.request("CreateSnapshots", req, cb);
    }
    async EnableRestProxy(req, cb) {
        return this.request("EnableRestProxy", req, cb);
    }
    async SetBackupExpireRule(req, cb) {
        return this.request("SetBackupExpireRule", req, cb);
    }
    async CreateBackup(req, cb) {
        return this.request("CreateBackup", req, cb);
    }
    async ModifyCensorship(req, cb) {
        return this.request("ModifyCensorship", req, cb);
    }
    async CreateTables(req, cb) {
        return this.request("CreateTables", req, cb);
    }
    async ModifyTableQuotas(req, cb) {
        return this.request("ModifyTableQuotas", req, cb);
    }
    async DescribeClusters(req, cb) {
        return this.request("DescribeClusters", req, cb);
    }
    async ModifyClusterMachine(req, cb) {
        return this.request("ModifyClusterMachine", req, cb);
    }
    async DeleteTableGroup(req, cb) {
        return this.request("DeleteTableGroup", req, cb);
    }
    async ModifyTableGroupName(req, cb) {
        return this.request("ModifyTableGroupName", req, cb);
    }
    async DeleteSnapshots(req, cb) {
        return this.request("DeleteSnapshots", req, cb);
    }
    async CreateTableGroup(req, cb) {
        return this.request("CreateTableGroup", req, cb);
    }
    async RecoverRecycleTables(req, cb) {
        return this.request("RecoverRecycleTables", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async DescribeTasks(req, cb) {
        return this.request("DescribeTasks", req, cb);
    }
    async DescribeSnapshots(req, cb) {
        return this.request("DescribeSnapshots", req, cb);
    }
    async DescribeBackupRecords(req, cb) {
        return this.request("DescribeBackupRecords", req, cb);
    }
    async ModifyClusterTags(req, cb) {
        return this.request("ModifyClusterTags", req, cb);
    }
    async ModifyTableGroupTags(req, cb) {
        return this.request("ModifyTableGroupTags", req, cb);
    }
    async DescribeApplications(req, cb) {
        return this.request("DescribeApplications", req, cb);
    }
    async DescribeTableGroupTags(req, cb) {
        return this.request("DescribeTableGroupTags", req, cb);
    }
    async ImportSnapshots(req, cb) {
        return this.request("ImportSnapshots", req, cb);
    }
    async DescribeTableGroups(req, cb) {
        return this.request("DescribeTableGroups", req, cb);
    }
    async CompareIdlFiles(req, cb) {
        return this.request("CompareIdlFiles", req, cb);
    }
    async DescribeIdlFileInfos(req, cb) {
        return this.request("DescribeIdlFileInfos", req, cb);
    }
    async DeleteTables(req, cb) {
        return this.request("DeleteTables", req, cb);
    }
    async ModifyTableMemos(req, cb) {
        return this.request("ModifyTableMemos", req, cb);
    }
    async ModifySnapshots(req, cb) {
        return this.request("ModifySnapshots", req, cb);
    }
    async VerifyIdlFiles(req, cb) {
        return this.request("VerifyIdlFiles", req, cb);
    }
    async ClearTables(req, cb) {
        return this.request("ClearTables", req, cb);
    }
    async DeleteTableDataFlow(req, cb) {
        return this.request("DeleteTableDataFlow", req, cb);
    }
    async ModifyTables(req, cb) {
        return this.request("ModifyTables", req, cb);
    }
    async DescribeTables(req, cb) {
        return this.request("DescribeTables", req, cb);
    }
    async DescribeClusterTags(req, cb) {
        return this.request("DescribeClusterTags", req, cb);
    }
}
