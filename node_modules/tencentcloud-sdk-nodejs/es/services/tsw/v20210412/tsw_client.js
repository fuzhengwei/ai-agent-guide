import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tsw.tencentcloudapi.com", "2021-04-12", clientConfig);
    }
    async DescribeToken(req, cb) {
        return this.request("DescribeToken", req, cb);
    }
    async DescribeServiceAlertObject(req, cb) {
        return this.request("DescribeServiceAlertObject", req, cb);
    }
    async DescribeComponentAlertObject(req, cb) {
        return this.request("DescribeComponentAlertObject", req, cb);
    }
}
