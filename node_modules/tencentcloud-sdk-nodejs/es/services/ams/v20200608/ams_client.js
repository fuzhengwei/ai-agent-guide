import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ams.tencentcloudapi.com", "2020-06-08", clientConfig);
    }
    async DescribeAudioStat(req, cb) {
        return this.request("DescribeAudioStat", req, cb);
    }
    async DescribeTaskDetail(req, cb) {
        return this.request("DescribeTaskDetail", req, cb);
    }
    async CreateBizConfig(req, cb) {
        return this.request("CreateBizConfig", req, cb);
    }
    async DescribeBizConfig(req, cb) {
        return this.request("DescribeBizConfig", req, cb);
    }
    async CancelTask(req, cb) {
        return this.request("CancelTask", req, cb);
    }
    async CreateAudioModerationTask(req, cb) {
        return this.request("CreateAudioModerationTask", req, cb);
    }
    async DescribeAmsList(req, cb) {
        return this.request("DescribeAmsList", req, cb);
    }
}
