import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("acp.tencentcloudapi.com", "2022-01-05", clientConfig);
    }
    async CreateAppScanTask(req, cb) {
        return this.request("CreateAppScanTask", req, cb);
    }
    async CreateAppScanTaskRepeat(req, cb) {
        return this.request("CreateAppScanTaskRepeat", req, cb);
    }
    async DescribeChannelTaskReportUrl(req, cb) {
        return this.request("DescribeChannelTaskReportUrl", req, cb);
    }
    async DescribeResourceUsageInfo(req, cb) {
        return this.request("DescribeResourceUsageInfo", req, cb);
    }
    async DescribeScanTaskStatus(req, cb) {
        return this.request("DescribeScanTaskStatus", req, cb);
    }
    async DescribeScanTaskReportUrl(req, cb) {
        return this.request("DescribeScanTaskReportUrl", req, cb);
    }
    async DescribeFileTicket(req, cb) {
        return this.request("DescribeFileTicket", req, cb);
    }
    async DescribeScanTaskList(req, cb) {
        return this.request("DescribeScanTaskList", req, cb);
    }
}
