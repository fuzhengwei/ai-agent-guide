import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdwpg.tencentcloudapi.com", "2020-12-30", clientConfig);
    }
    async DescribeUserHbaConfig(req, cb) {
        return this.request("DescribeUserHbaConfig", req, cb);
    }
    async ResetAccountPassword(req, cb) {
        return this.request("ResetAccountPassword", req, cb);
    }
    async ModifyDBParameters(req, cb) {
        return this.request("ModifyDBParameters", req, cb);
    }
    async ScaleOutInstance(req, cb) {
        return this.request("ScaleOutInstance", req, cb);
    }
    async ScaleUpInstance(req, cb) {
        return this.request("ScaleUpInstance", req, cb);
    }
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
    async DescribeInstanceState(req, cb) {
        return this.request("DescribeInstanceState", req, cb);
    }
    async DestroyInstanceByApi(req, cb) {
        return this.request("DestroyInstanceByApi", req, cb);
    }
    async DescribeInstanceInfo(req, cb) {
        return this.request("DescribeInstanceInfo", req, cb);
    }
    async RestartInstance(req, cb) {
        return this.request("RestartInstance", req, cb);
    }
    async DescribeDBConfigHistory(req, cb) {
        return this.request("DescribeDBConfigHistory", req, cb);
    }
    async DescribeDBParams(req, cb) {
        return this.request("DescribeDBParams", req, cb);
    }
    async DescribeInstanceOperations(req, cb) {
        return this.request("DescribeInstanceOperations", req, cb);
    }
    async ModifyUserHba(req, cb) {
        return this.request("ModifyUserHba", req, cb);
    }
    async DescribeInstance(req, cb) {
        return this.request("DescribeInstance", req, cb);
    }
    async DescribeInstanceNodes(req, cb) {
        return this.request("DescribeInstanceNodes", req, cb);
    }
    async CreateInstanceByApi(req, cb) {
        return this.request("CreateInstanceByApi", req, cb);
    }
    async DescribeUpgradeList(req, cb) {
        return this.request("DescribeUpgradeList", req, cb);
    }
    async DescribeAccounts(req, cb) {
        return this.request("DescribeAccounts", req, cb);
    }
    async UpgradeInstance(req, cb) {
        return this.request("UpgradeInstance", req, cb);
    }
    async DescribeSlowLog(req, cb) {
        return this.request("DescribeSlowLog", req, cb);
    }
    async DescribeErrorLog(req, cb) {
        return this.request("DescribeErrorLog", req, cb);
    }
    async DescribeSimpleInstances(req, cb) {
        return this.request("DescribeSimpleInstances", req, cb);
    }
    async ModifyInstance(req, cb) {
        return this.request("ModifyInstance", req, cb);
    }
}
