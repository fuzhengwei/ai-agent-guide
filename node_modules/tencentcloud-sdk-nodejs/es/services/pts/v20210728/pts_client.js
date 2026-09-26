import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("pts.tencentcloudapi.com", "2021-07-28", clientConfig);
    }
    async DescribeScenarioWithJobs(req, cb) {
        return this.request("DescribeScenarioWithJobs", req, cb);
    }
    async DeleteEnvironments(req, cb) {
        return this.request("DeleteEnvironments", req, cb);
    }
    async UpdateJob(req, cb) {
        return this.request("UpdateJob", req, cb);
    }
    async UpdateCronJob(req, cb) {
        return this.request("UpdateCronJob", req, cb);
    }
    async StartJob(req, cb) {
        return this.request("StartJob", req, cb);
    }
    async UpdateScenario(req, cb) {
        return this.request("UpdateScenario", req, cb);
    }
    async DescribeFiles(req, cb) {
        return this.request("DescribeFiles", req, cb);
    }
    async DeleteProjects(req, cb) {
        return this.request("DeleteProjects", req, cb);
    }
    async DescribeSampleQuery(req, cb) {
        return this.request("DescribeSampleQuery", req, cb);
    }
    async DescribeJobs(req, cb) {
        return this.request("DescribeJobs", req, cb);
    }
    async CreateScenario(req, cb) {
        return this.request("CreateScenario", req, cb);
    }
    async DeleteFiles(req, cb) {
        return this.request("DeleteFiles", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async DescribeCheckSummary(req, cb) {
        return this.request("DescribeCheckSummary", req, cb);
    }
    async DescribeSampleMatrixBatchQuery(req, cb) {
        return this.request("DescribeSampleMatrixBatchQuery", req, cb);
    }
    async DescribeSampleMatrixQuery(req, cb) {
        return this.request("DescribeSampleMatrixQuery", req, cb);
    }
    async DescribeRequestSummary(req, cb) {
        return this.request("DescribeRequestSummary", req, cb);
    }
    async DeleteScenarios(req, cb) {
        return this.request("DeleteScenarios", req, cb);
    }
    async DescribeProjects(req, cb) {
        return this.request("DescribeProjects", req, cb);
    }
    async DescribeAlertRecords(req, cb) {
        return this.request("DescribeAlertRecords", req, cb);
    }
    async DescribeSampleBatchQuery(req, cb) {
        return this.request("DescribeSampleBatchQuery", req, cb);
    }
    async DescribeAlertChannels(req, cb) {
        return this.request("DescribeAlertChannels", req, cb);
    }
    async DescribeAvailableMetrics(req, cb) {
        return this.request("DescribeAvailableMetrics", req, cb);
    }
    async DescribeLabelValues(req, cb) {
        return this.request("DescribeLabelValues", req, cb);
    }
    async AbortCronJobs(req, cb) {
        return this.request("AbortCronJobs", req, cb);
    }
    async UpdateFileScenarioRelation(req, cb) {
        return this.request("UpdateFileScenarioRelation", req, cb);
    }
    async RestartCronJobs(req, cb) {
        return this.request("RestartCronJobs", req, cb);
    }
    async UpdateEnvironment(req, cb) {
        return this.request("UpdateEnvironment", req, cb);
    }
    async CreateAlertChannel(req, cb) {
        return this.request("CreateAlertChannel", req, cb);
    }
    async DescribeEnvironments(req, cb) {
        return this.request("DescribeEnvironments", req, cb);
    }
    async DeleteJobs(req, cb) {
        return this.request("DeleteJobs", req, cb);
    }
    async DescribeErrorSummary(req, cb) {
        return this.request("DescribeErrorSummary", req, cb);
    }
    async DescribeNormalLogs(req, cb) {
        return this.request("DescribeNormalLogs", req, cb);
    }
    async CopyScenario(req, cb) {
        return this.request("CopyScenario", req, cb);
    }
    async DescribeSampleLogs(req, cb) {
        return this.request("DescribeSampleLogs", req, cb);
    }
    async CreateEnvironment(req, cb) {
        return this.request("CreateEnvironment", req, cb);
    }
    async DescribeScenarios(req, cb) {
        return this.request("DescribeScenarios", req, cb);
    }
    async DeleteCronJobs(req, cb) {
        return this.request("DeleteCronJobs", req, cb);
    }
    async DescribeCronJobs(req, cb) {
        return this.request("DescribeCronJobs", req, cb);
    }
    async DeleteAlertChannel(req, cb) {
        return this.request("DeleteAlertChannel", req, cb);
    }
    async CreateFile(req, cb) {
        return this.request("CreateFile", req, cb);
    }
    async AdjustJobSpeed(req, cb) {
        return this.request("AdjustJobSpeed", req, cb);
    }
    async CreateProject(req, cb) {
        return this.request("CreateProject", req, cb);
    }
    async AbortJob(req, cb) {
        return this.request("AbortJob", req, cb);
    }
    async UpdateProject(req, cb) {
        return this.request("UpdateProject", req, cb);
    }
    async GenerateTmpKey(req, cb) {
        return this.request("GenerateTmpKey", req, cb);
    }
    async DescribeMetricLabelWithValues(req, cb) {
        return this.request("DescribeMetricLabelWithValues", req, cb);
    }
    async CreateCronJob(req, cb) {
        return this.request("CreateCronJob", req, cb);
    }
}
