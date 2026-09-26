import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("af.tencentcloudapi.com", "2020-02-26", clientConfig);
    }
    async QueryAntiFraud(req, cb) {
        return this.request("QueryAntiFraud", req, cb);
    }
    async GetAntiFraud(req, cb) {
        return this.request("GetAntiFraud", req, cb);
    }
    async DescribeAntiFraud(req, cb) {
        return this.request("DescribeAntiFraud", req, cb);
    }
}
