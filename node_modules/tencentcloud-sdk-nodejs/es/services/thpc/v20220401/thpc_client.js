import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("thpc.tencentcloudapi.com", "2022-04-01", clientConfig);
    }
    async DescribeClusterStorageOption(req, cb) {
        return this.request("DescribeClusterStorageOption", req, cb);
    }
    async DeleteNodes(req, cb) {
        return this.request("DeleteNodes", req, cb);
    }
    async BindAutoScalingGroup(req, cb) {
        return this.request("BindAutoScalingGroup", req, cb);
    }
    async CreateCluster(req, cb) {
        return this.request("CreateCluster", req, cb);
    }
    async DeleteCluster(req, cb) {
        return this.request("DeleteCluster", req, cb);
    }
    async SetAutoScalingConfiguration(req, cb) {
        return this.request("SetAutoScalingConfiguration", req, cb);
    }
    async AddQueue(req, cb) {
        return this.request("AddQueue", req, cb);
    }
    async DescribeNodes(req, cb) {
        return this.request("DescribeNodes", req, cb);
    }
    async DeleteQueue(req, cb) {
        return this.request("DeleteQueue", req, cb);
    }
    async DeleteClusterStorageOption(req, cb) {
        return this.request("DeleteClusterStorageOption", req, cb);
    }
    async AddNodes(req, cb) {
        return this.request("AddNodes", req, cb);
    }
    async DescribeAutoScalingConfiguration(req, cb) {
        return this.request("DescribeAutoScalingConfiguration", req, cb);
    }
    async DescribeClusters(req, cb) {
        return this.request("DescribeClusters", req, cb);
    }
    async AddClusterStorageOption(req, cb) {
        return this.request("AddClusterStorageOption", req, cb);
    }
    async DescribeClusterActivities(req, cb) {
        return this.request("DescribeClusterActivities", req, cb);
    }
    async DescribeQueues(req, cb) {
        return this.request("DescribeQueues", req, cb);
    }
}
