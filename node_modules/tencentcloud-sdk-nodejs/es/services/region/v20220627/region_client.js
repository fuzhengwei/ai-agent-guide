import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("region.tencentcloudapi.com", "2022-06-27", clientConfig);
    }
    async DescribeProducts(req, cb) {
        return this.request("DescribeProducts", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async DescribeZones(req, cb) {
        return this.request("DescribeZones", req, cb);
    }
}
