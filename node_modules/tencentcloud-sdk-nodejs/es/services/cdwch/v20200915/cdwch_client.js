import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdwch.tencentcloudapi.com", "2020-09-15", clientConfig);
    }
    async CreateBackUpSchedule(req, cb) {
        return this.request("CreateBackUpSchedule", req, cb);
    }
    async DescribeBackUpJob(req, cb) {
        return this.request("DescribeBackUpJob", req, cb);
    }
    async DestroyInstance(req, cb) {
        return this.request("DestroyInstance", req, cb);
    }
    async DescribeInstanceKeyValConfigs(req, cb) {
        return this.request("DescribeInstanceKeyValConfigs", req, cb);
    }
    async OpenBackUp(req, cb) {
        return this.request("OpenBackUp", req, cb);
    }
    async ModifyInstanceKeyValConfigs(req, cb) {
        return this.request("ModifyInstanceKeyValConfigs", req, cb);
    }
    async ScaleUpInstance(req, cb) {
        return this.request("ScaleUpInstance", req, cb);
    }
    async DescribeBackUpTables(req, cb) {
        return this.request("DescribeBackUpTables", req, cb);
    }
    async ScaleOutInstance(req, cb) {
        return this.request("ScaleOutInstance", req, cb);
    }
    async DescribeInstanceShards(req, cb) {
        return this.request("DescribeInstanceShards", req, cb);
    }
    async DescribeInstancesNew(req, cb) {
        return this.request("DescribeInstancesNew", req, cb);
    }
    async DeleteBackUpData(req, cb) {
        return this.request("DeleteBackUpData", req, cb);
    }
    async ActionAlterCkUser(req, cb) {
        return this.request("ActionAlterCkUser", req, cb);
    }
    async DescribeInstanceState(req, cb) {
        return this.request("DescribeInstanceState", req, cb);
    }
    async DescribeClusterConfigs(req, cb) {
        return this.request("DescribeClusterConfigs", req, cb);
    }
    async ModifyClusterConfigs(req, cb) {
        return this.request("ModifyClusterConfigs", req, cb);
    }
    async RestartInstance(req, cb) {
        return this.request("RestartInstance", req, cb);
    }
    async ScaleCNOutUpInstance(req, cb) {
        return this.request("ScaleCNOutUpInstance", req, cb);
    }
    async RecoverBackUpJob(req, cb) {
        return this.request("RecoverBackUpJob", req, cb);
    }
    async DescribeCkSqlApis(req, cb) {
        return this.request("DescribeCkSqlApis", req, cb);
    }
    async DescribeSpec(req, cb) {
        return this.request("DescribeSpec", req, cb);
    }
    async CreateInstanceNew(req, cb) {
        return this.request("CreateInstanceNew", req, cb);
    }
    async DescribeBackUpSchedule(req, cb) {
        return this.request("DescribeBackUpSchedule", req, cb);
    }
    async DescribeBackUpJobDetail(req, cb) {
        return this.request("DescribeBackUpJobDetail", req, cb);
    }
    async DescribeInstanceClusters(req, cb) {
        return this.request("DescribeInstanceClusters", req, cb);
    }
    async DescribeInstance(req, cb) {
        return this.request("DescribeInstance", req, cb);
    }
    async DescribeEventTasks(req, cb) {
        return this.request("DescribeEventTasks", req, cb);
    }
    async DescribeInstanceNodes(req, cb) {
        return this.request("DescribeInstanceNodes", req, cb);
    }
    async ModifyUserNewPrivilege(req, cb) {
        return this.request("ModifyUserNewPrivilege", req, cb);
    }
    async DescribeCNInstances(req, cb) {
        return this.request("DescribeCNInstances", req, cb);
    }
    async ResizeDisk(req, cb) {
        return this.request("ResizeDisk", req, cb);
    }
}
