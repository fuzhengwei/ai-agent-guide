import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vtc.tencentcloudapi.com", "2024-02-23", clientConfig);
    }
    async SubmitVideoTranslateJob(req, cb) {
        return this.request("SubmitVideoTranslateJob", req, cb);
    }
    async DescribeVideoTranslateJob(req, cb) {
        return this.request("DescribeVideoTranslateJob", req, cb);
    }
    async ConfirmVideoTranslateJob(req, cb) {
        return this.request("ConfirmVideoTranslateJob", req, cb);
    }
}
