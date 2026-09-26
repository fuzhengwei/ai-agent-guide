import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdz.tencentcloudapi.com", "2022-11-23", clientConfig);
    }
    async DescribeCloudDedicatedZoneResourceSummary(req, cb) {
        return this.request("DescribeCloudDedicatedZoneResourceSummary", req, cb);
    }
    async DescribeCloudDedicatedZoneHosts(req, cb) {
        return this.request("DescribeCloudDedicatedZoneHosts", req, cb);
    }
}
