import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("mmps.tencentcloudapi.com", "2020-07-10", clientConfig);
    }
    async CreateAppScanTask(req, cb) {
        return this.request("CreateAppScanTask", req, cb);
    }
    async CreateFlySecMiniAppProfessionalScanTask(req, cb) {
        return this.request("CreateFlySecMiniAppProfessionalScanTask", req, cb);
    }
    async DescribeFlySecMiniAppScanReportList(req, cb) {
        return this.request("DescribeFlySecMiniAppScanReportList", req, cb);
    }
    async DescribeFlySecMiniAppReportUrl(req, cb) {
        return this.request("DescribeFlySecMiniAppReportUrl", req, cb);
    }
    async DescribeFlySecMiniAppScanTaskStatus(req, cb) {
        return this.request("DescribeFlySecMiniAppScanTaskStatus", req, cb);
    }
    async DescribeResourceUsageInfo(req, cb) {
        return this.request("DescribeResourceUsageInfo", req, cb);
    }
    async CreateFlySecMiniAppScanTask(req, cb) {
        return this.request("CreateFlySecMiniAppScanTask", req, cb);
    }
    async CreateFlySecMiniAppScanTaskRepeat(req, cb) {
        return this.request("CreateFlySecMiniAppScanTaskRepeat", req, cb);
    }
    async DescribeScanTaskReportUrl(req, cb) {
        return this.request("DescribeScanTaskReportUrl", req, cb);
    }
    async DescribeScanTaskList(req, cb) {
        return this.request("DescribeScanTaskList", req, cb);
    }
    async DescribeFlySecMiniAppScanTaskList(req, cb) {
        return this.request("DescribeFlySecMiniAppScanTaskList", req, cb);
    }
    async DescribeScanTaskStatus(req, cb) {
        return this.request("DescribeScanTaskStatus", req, cb);
    }
    async DescribeBasicDiagnosisResourceUsageInfo(req, cb) {
        return this.request("DescribeBasicDiagnosisResourceUsageInfo", req, cb);
    }
    async CreateAppScanTaskRepeat(req, cb) {
        return this.request("CreateAppScanTaskRepeat", req, cb);
    }
    async DescribeFlySecMiniAppScanTaskParam(req, cb) {
        return this.request("DescribeFlySecMiniAppScanTaskParam", req, cb);
    }
}
