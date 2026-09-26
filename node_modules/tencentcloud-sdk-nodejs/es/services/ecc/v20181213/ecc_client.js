import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ecc.tencentcloudapi.com", "2018-12-13", clientConfig);
    }
    async EHOCR(req, cb) {
        return this.request("EHOCR", req, cb);
    }
    async ECC(req, cb) {
        return this.request("ECC", req, cb);
    }
    async DescribeTask(req, cb) {
        return this.request("DescribeTask", req, cb);
    }
    async CorrectMultiImage(req, cb) {
        return this.request("CorrectMultiImage", req, cb);
    }
}
