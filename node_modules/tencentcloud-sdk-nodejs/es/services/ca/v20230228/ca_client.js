import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ca.tencentcloudapi.com", "2023-02-28", clientConfig);
    }
    async DescribeVerifyReport(req, cb) {
        return this.request("DescribeVerifyReport", req, cb);
    }
    async UploadFile(req, cb) {
        return this.request("UploadFile", req, cb);
    }
    async CreateVerifyReport(req, cb) {
        return this.request("CreateVerifyReport", req, cb);
    }
}
