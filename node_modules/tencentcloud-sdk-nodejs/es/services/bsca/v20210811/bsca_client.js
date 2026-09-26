import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bsca.tencentcloudapi.com", "2021-08-11", clientConfig);
    }
    async SearchKBComponent(req, cb) {
        return this.request("SearchKBComponent", req, cb);
    }
    async DescribeKBComponentVersionList(req, cb) {
        return this.request("DescribeKBComponentVersionList", req, cb);
    }
    async DescribeKBComponent(req, cb) {
        return this.request("DescribeKBComponent", req, cb);
    }
    async DescribeKBLicense(req, cb) {
        return this.request("DescribeKBLicense", req, cb);
    }
    async MatchKBPURLList(req, cb) {
        return this.request("MatchKBPURLList", req, cb);
    }
    async DescribeKBComponentVulnerability(req, cb) {
        return this.request("DescribeKBComponentVulnerability", req, cb);
    }
    async DescribeKBVulnerability(req, cb) {
        return this.request("DescribeKBVulnerability", req, cb);
    }
}
