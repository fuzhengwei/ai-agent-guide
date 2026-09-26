import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tdcpg.tencentcloudapi.com", "2021-11-18", clientConfig);
    }
    async ModifyClusterInstancesSpec(req, cb) {
        return this.request("ModifyClusterInstancesSpec", req, cb);
    }
    async CreateCluster(req, cb) {
        return this.request("CreateCluster", req, cb);
    }
    async ModifyAccountDescription(req, cb) {
        return this.request("ModifyAccountDescription", req, cb);
    }
    async ModifyClusterName(req, cb) {
        return this.request("ModifyClusterName", req, cb);
    }
    async TransformClusterPayMode(req, cb) {
        return this.request("TransformClusterPayMode", req, cb);
    }
    async ModifyClustersAutoRenewFlag(req, cb) {
        return this.request("ModifyClustersAutoRenewFlag", req, cb);
    }
    async ResetAccountPassword(req, cb) {
        return this.request("ResetAccountPassword", req, cb);
    }
    async CreateClusterInstances(req, cb) {
        return this.request("CreateClusterInstances", req, cb);
    }
    async DeleteCluster(req, cb) {
        return this.request("DeleteCluster", req, cb);
    }
    async DescribeClusterInstances(req, cb) {
        return this.request("DescribeClusterInstances", req, cb);
    }
    async DescribeClusterRecoveryTimeRange(req, cb) {
        return this.request("DescribeClusterRecoveryTimeRange", req, cb);
    }
    async IsolateCluster(req, cb) {
        return this.request("IsolateCluster", req, cb);
    }
    async DescribeClusters(req, cb) {
        return this.request("DescribeClusters", req, cb);
    }
    async RestartClusterInstances(req, cb) {
        return this.request("RestartClusterInstances", req, cb);
    }
    async RecoverClusterInstances(req, cb) {
        return this.request("RecoverClusterInstances", req, cb);
    }
    async ModifyClusterEndpointWanStatus(req, cb) {
        return this.request("ModifyClusterEndpointWanStatus", req, cb);
    }
    async RecoverCluster(req, cb) {
        return this.request("RecoverCluster", req, cb);
    }
    async CloneClusterToPointInTime(req, cb) {
        return this.request("CloneClusterToPointInTime", req, cb);
    }
    async DescribeAccounts(req, cb) {
        return this.request("DescribeAccounts", req, cb);
    }
    async DescribeResourcesByDealName(req, cb) {
        return this.request("DescribeResourcesByDealName", req, cb);
    }
    async DeleteClusterInstances(req, cb) {
        return this.request("DeleteClusterInstances", req, cb);
    }
    async DescribeClusterEndpoints(req, cb) {
        return this.request("DescribeClusterEndpoints", req, cb);
    }
    async DescribeClusterBackups(req, cb) {
        return this.request("DescribeClusterBackups", req, cb);
    }
    async RenewCluster(req, cb) {
        return this.request("RenewCluster", req, cb);
    }
    async IsolateClusterInstances(req, cb) {
        return this.request("IsolateClusterInstances", req, cb);
    }
}
