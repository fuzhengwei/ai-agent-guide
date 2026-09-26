import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("batch.tencentcloudapi.com", "2017-03-12", clientConfig);
    }
    async DescribeJobMonitorData(req, cb) {
        return this.request("DescribeJobMonitorData", req, cb);
    }
    async DescribeComputeEnv(req, cb) {
        return this.request("DescribeComputeEnv", req, cb);
    }
    async CreateTaskTemplate(req, cb) {
        return this.request("CreateTaskTemplate", req, cb);
    }
    async TerminateComputeNode(req, cb) {
        return this.request("TerminateComputeNode", req, cb);
    }
    async DescribeJobs(req, cb) {
        return this.request("DescribeJobs", req, cb);
    }
    async DescribeAvailableCvmInstanceTypes(req, cb) {
        return this.request("DescribeAvailableCvmInstanceTypes", req, cb);
    }
    async AttachInstances(req, cb) {
        return this.request("AttachInstances", req, cb);
    }
    async CreateComputeEnv(req, cb) {
        return this.request("CreateComputeEnv", req, cb);
    }
    async DeleteComputeEnv(req, cb) {
        return this.request("DeleteComputeEnv", req, cb);
    }
    async DetachInstances(req, cb) {
        return this.request("DetachInstances", req, cb);
    }
    async DescribeTaskLogs(req, cb) {
        return this.request("DescribeTaskLogs", req, cb);
    }
    async TerminateJob(req, cb) {
        return this.request("TerminateJob", req, cb);
    }
    async DescribeTask(req, cb) {
        return this.request("DescribeTask", req, cb);
    }
    async DescribeCvmZoneInstanceConfigInfos(req, cb) {
        return this.request("DescribeCvmZoneInstanceConfigInfos", req, cb);
    }
    async DescribeJob(req, cb) {
        return this.request("DescribeJob", req, cb);
    }
    async SubmitJob(req, cb) {
        return this.request("SubmitJob", req, cb);
    }
    async TerminateComputeNodes(req, cb) {
        return this.request("TerminateComputeNodes", req, cb);
    }
    async DescribeTaskTemplates(req, cb) {
        return this.request("DescribeTaskTemplates", req, cb);
    }
    async DescribeInstanceCategories(req, cb) {
        return this.request("DescribeInstanceCategories", req, cb);
    }
    async DeleteTaskTemplates(req, cb) {
        return this.request("DeleteTaskTemplates", req, cb);
    }
    async TerminateTaskInstance(req, cb) {
        return this.request("TerminateTaskInstance", req, cb);
    }
    async ModifyComputeEnv(req, cb) {
        return this.request("ModifyComputeEnv", req, cb);
    }
    async DescribeJobSubmitInfo(req, cb) {
        return this.request("DescribeJobSubmitInfo", req, cb);
    }
    async DescribeComputeEnvCreateInfo(req, cb) {
        return this.request("DescribeComputeEnvCreateInfo", req, cb);
    }
    async DescribeComputeEnvActivities(req, cb) {
        return this.request("DescribeComputeEnvActivities", req, cb);
    }
    async DescribeComputeEnvCreateInfos(req, cb) {
        return this.request("DescribeComputeEnvCreateInfos", req, cb);
    }
    async DeleteJob(req, cb) {
        return this.request("DeleteJob", req, cb);
    }
    async DescribeComputeEnvs(req, cb) {
        return this.request("DescribeComputeEnvs", req, cb);
    }
    async ModifyTaskTemplate(req, cb) {
        return this.request("ModifyTaskTemplate", req, cb);
    }
    async RetryJobs(req, cb) {
        return this.request("RetryJobs", req, cb);
    }
}
