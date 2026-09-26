import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("memcached.tencentcloudapi.com", "2019-03-18", clientConfig);
    }
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
}
