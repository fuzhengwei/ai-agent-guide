import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vm.tencentcloudapi.com", "2020-07-09", clientConfig);
    }
    async DescribeTaskDetail(req, cb) {
        return this.request("DescribeTaskDetail", req, cb);
    }
    async CreateVideoModerationTask(req, cb) {
        return this.request("CreateVideoModerationTask", req, cb);
    }
    async DescribeVideoStat(req, cb) {
        return this.request("DescribeVideoStat", req, cb);
    }
    async CreateBizConfig(req, cb) {
        return this.request("CreateBizConfig", req, cb);
    }
    async CancelTask(req, cb) {
        return this.request("CancelTask", req, cb);
    }
}
