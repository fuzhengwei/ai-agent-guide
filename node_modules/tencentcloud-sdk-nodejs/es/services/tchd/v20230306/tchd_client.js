import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tchd.tencentcloudapi.com", "2023-03-06", clientConfig);
    }
    async DescribeEvents(req, cb) {
        return this.request("DescribeEvents", req, cb);
    }
    async DescribeEventStatistics(req, cb) {
        return this.request("DescribeEventStatistics", req, cb);
    }
}
