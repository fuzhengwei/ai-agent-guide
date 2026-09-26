import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("habo.tencentcloudapi.com", "2018-12-03", clientConfig);
    }
    async StartAnalyse(req, cb) {
        return this.request("StartAnalyse", req, cb);
    }
    async DescribeStatus(req, cb) {
        return this.request("DescribeStatus", req, cb);
    }
}
