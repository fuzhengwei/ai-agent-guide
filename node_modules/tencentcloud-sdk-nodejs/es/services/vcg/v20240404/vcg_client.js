import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vcg.tencentcloudapi.com", "2024-04-04", clientConfig);
    }
    async SubmitVideoStylizationJob(req, cb) {
        return this.request("SubmitVideoStylizationJob", req, cb);
    }
    async DescribeVideoStylizationJob(req, cb) {
        return this.request("DescribeVideoStylizationJob", req, cb);
    }
}
