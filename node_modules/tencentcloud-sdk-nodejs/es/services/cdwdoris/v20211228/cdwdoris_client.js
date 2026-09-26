import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdwdoris.tencentcloudapi.com", "2021-12-28", clientConfig);
    }
    async CreateBackUpSchedule(req, cb) {
        return this.request("CreateBackUpSchedule", req, cb);
    }
    async OpenCoolDownPolicy(req, cb) {
        return this.request("OpenCoolDownPolicy", req, cb);
    }
    async DescribeBackUpSchedules(req, cb) {
        return this.request("DescribeBackUpSchedules", req, cb);
    }
    async DescribeBackUpJob(req, cb) {
        return this.request("DescribeBackUpJob", req, cb);
    }
    async DestroyInstance(req, cb) {
        return this.request("DestroyInstance", req, cb);
    }
    async DescribeCoolDownTableData(req, cb) {
        return this.request("DescribeCoolDownTableData", req, cb);
    }
    async DescribeDatabaseAuditRecords(req, cb) {
        return this.request("DescribeDatabaseAuditRecords", req, cb);
    }
    async DescribeRestoreTaskDetail(req, cb) {
        return this.request("DescribeRestoreTaskDetail", req, cb);
    }
    async CreateWorkloadGroup(req, cb) {
        return this.request("CreateWorkloadGroup", req, cb);
    }
    async DescribeDatabaseAuditDownload(req, cb) {
        return this.request("DescribeDatabaseAuditDownload", req, cb);
    }
    async DescribeUserBindWorkloadGroup(req, cb) {
        return this.request("DescribeUserBindWorkloadGroup", req, cb);
    }
    async DescribeInstanceNodesInfo(req, cb) {
        return this.request("DescribeInstanceNodesInfo", req, cb);
    }
    async DescribeInstanceUsedSubnets(req, cb) {
        return this.request("DescribeInstanceUsedSubnets", req, cb);
    }
    async DescribeTableList(req, cb) {
        return this.request("DescribeTableList", req, cb);
    }
    async DescribeBackUpTables(req, cb) {
        return this.request("DescribeBackUpTables", req, cb);
    }
    async ScaleOutInstance(req, cb) {
        return this.request("ScaleOutInstance", req, cb);
    }
    async ModifyNodeStatus(req, cb) {
        return this.request("ModifyNodeStatus", req, cb);
    }
    async DescribeClusterConfigsHistory(req, cb) {
        return this.request("DescribeClusterConfigsHistory", req, cb);
    }
    async DescribeSlowQueryRecords(req, cb) {
        return this.request("DescribeSlowQueryRecords", req, cb);
    }
    async RecoverBackUpJob(req, cb) {
        return this.request("RecoverBackUpJob", req, cb);
    }
    async ModifyUserBindWorkloadGroup(req, cb) {
        return this.request("ModifyUserBindWorkloadGroup", req, cb);
    }
    async DeleteBackUpData(req, cb) {
        return this.request("DeleteBackUpData", req, cb);
    }
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
    async ResizeDisk(req, cb) {
        return this.request("ResizeDisk", req, cb);
    }
    async CreateCoolDownPolicy(req, cb) {
        return this.request("CreateCoolDownPolicy", req, cb);
    }
    async UpdateCoolDown(req, cb) {
        return this.request("UpdateCoolDown", req, cb);
    }
    async DescribeInstanceState(req, cb) {
        return this.request("DescribeInstanceState", req, cb);
    }
    async DescribeClusterConfigs(req, cb) {
        return this.request("DescribeClusterConfigs", req, cb);
    }
    async DeleteWorkloadGroup(req, cb) {
        return this.request("DeleteWorkloadGroup", req, cb);
    }
    async ModifyClusterConfigs(req, cb) {
        return this.request("ModifyClusterConfigs", req, cb);
    }
    async ModifySecurityGroups(req, cb) {
        return this.request("ModifySecurityGroups", req, cb);
    }
    async DescribeCoolDownBackends(req, cb) {
        return this.request("DescribeCoolDownBackends", req, cb);
    }
    async ScaleUpInstance(req, cb) {
        return this.request("ScaleUpInstance", req, cb);
    }
    async ReduceInstance(req, cb) {
        return this.request("ReduceInstance", req, cb);
    }
    async ModifyUserPrivilegesV3(req, cb) {
        return this.request("ModifyUserPrivilegesV3", req, cb);
    }
    async DescribeInstanceOperations(req, cb) {
        return this.request("DescribeInstanceOperations", req, cb);
    }
    async ModifyWorkloadGroupStatus(req, cb) {
        return this.request("ModifyWorkloadGroupStatus", req, cb);
    }
    async ModifyCoolDownPolicy(req, cb) {
        return this.request("ModifyCoolDownPolicy", req, cb);
    }
    async ActionAlterUser(req, cb) {
        return this.request("ActionAlterUser", req, cb);
    }
    async DescribeSqlApis(req, cb) {
        return this.request("DescribeSqlApis", req, cb);
    }
    async DescribeBackUpTaskDetail(req, cb) {
        return this.request("DescribeBackUpTaskDetail", req, cb);
    }
    async DescribeInstance(req, cb) {
        return this.request("DescribeInstance", req, cb);
    }
    async CreateInstanceNew(req, cb) {
        return this.request("CreateInstanceNew", req, cb);
    }
    async ModifyWorkloadGroup(req, cb) {
        return this.request("ModifyWorkloadGroup", req, cb);
    }
    async CancelBackupJob(req, cb) {
        return this.request("CancelBackupJob", req, cb);
    }
    async DescribeBackUpJobDetail(req, cb) {
        return this.request("DescribeBackUpJobDetail", req, cb);
    }
    async CheckCoolDownWorkingVariableConfigCorrect(req, cb) {
        return this.request("CheckCoolDownWorkingVariableConfigCorrect", req, cb);
    }
    async DescribeInstanceNodesRole(req, cb) {
        return this.request("DescribeInstanceNodesRole", req, cb);
    }
    async RestartClusterForConfigs(req, cb) {
        return this.request("RestartClusterForConfigs", req, cb);
    }
    async DescribeSpec(req, cb) {
        return this.request("DescribeSpec", req, cb);
    }
    async DescribeAreaRegion(req, cb) {
        return this.request("DescribeAreaRegion", req, cb);
    }
    async OpenCoolDown(req, cb) {
        return this.request("OpenCoolDown", req, cb);
    }
    async DescribeInstancesHealthState(req, cb) {
        return this.request("DescribeInstancesHealthState", req, cb);
    }
    async RestartClusterForNode(req, cb) {
        return this.request("RestartClusterForNode", req, cb);
    }
    async DescribeSlowQueryRecordsDownload(req, cb) {
        return this.request("DescribeSlowQueryRecordsDownload", req, cb);
    }
    async DescribeInstanceNodes(req, cb) {
        return this.request("DescribeInstanceNodes", req, cb);
    }
    async DescribeCoolDownPolicies(req, cb) {
        return this.request("DescribeCoolDownPolicies", req, cb);
    }
    async DescribeWorkloadGroup(req, cb) {
        return this.request("DescribeWorkloadGroup", req, cb);
    }
    async ModifyInstance(req, cb) {
        return this.request("ModifyInstance", req, cb);
    }
    async ModifyInstanceKeyValConfigs(req, cb) {
        return this.request("ModifyInstanceKeyValConfigs", req, cb);
    }
}
