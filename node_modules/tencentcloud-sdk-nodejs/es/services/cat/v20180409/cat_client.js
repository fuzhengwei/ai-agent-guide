import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cat.tencentcloudapi.com", "2018-04-09", clientConfig);
    }
    async SuspendProbeTask(req, cb) {
        return this.request("SuspendProbeTask", req, cb);
    }
    async DescribeProbeMetricData(req, cb) {
        return this.request("DescribeProbeMetricData", req, cb);
    }
    async DescribeProbeTasks(req, cb) {
        return this.request("DescribeProbeTasks", req, cb);
    }
    async UpdateProbeTaskAttributes(req, cb) {
        return this.request("UpdateProbeTaskAttributes", req, cb);
    }
    async DescribeProbeNodes(req, cb) {
        return this.request("DescribeProbeNodes", req, cb);
    }
    async DescribeProbeMetricTagValues(req, cb) {
        return this.request("DescribeProbeMetricTagValues", req, cb);
    }
    async DescribeNodes(req, cb) {
        return this.request("DescribeNodes", req, cb);
    }
    async DescribeInstantTasks(req, cb) {
        return this.request("DescribeInstantTasks", req, cb);
    }
    async UpdateProbeTaskConfigurationList(req, cb) {
        return this.request("UpdateProbeTaskConfigurationList", req, cb);
    }
    async CreateProbeTasks(req, cb) {
        return this.request("CreateProbeTasks", req, cb);
    }
    async DescribeNodeGroups(req, cb) {
        return this.request("DescribeNodeGroups", req, cb);
    }
    async DescribeDetailedSingleProbeData(req, cb) {
        return this.request("DescribeDetailedSingleProbeData", req, cb);
    }
    async DeleteProbeTask(req, cb) {
        return this.request("DeleteProbeTask", req, cb);
    }
    async ResumeProbeTask(req, cb) {
        return this.request("ResumeProbeTask", req, cb);
    }
}
