import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ctsdb.tencentcloudapi.com", "2023-02-02", clientConfig);
    }
    async DescribeClusters(req, cb) {
        return this.request("DescribeClusters", req, cb);
    }
    async DescribeClusterDetail(req, cb) {
        return this.request("DescribeClusterDetail", req, cb);
    }
    async DescribeDatabases(req, cb) {
        return this.request("DescribeDatabases", req, cb);
    }
}
