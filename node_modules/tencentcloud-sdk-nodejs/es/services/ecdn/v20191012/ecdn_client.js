import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ecdn.tencentcloudapi.com", "2019-10-12", clientConfig);
    }
    async DescribeIpStatus(req, cb) {
        return this.request("DescribeIpStatus", req, cb);
    }
    async DescribeEcdnDomainLogs(req, cb) {
        return this.request("DescribeEcdnDomainLogs", req, cb);
    }
    async DescribeDomainsConfig(req, cb) {
        return this.request("DescribeDomainsConfig", req, cb);
    }
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    async DescribeEcdnStatistics(req, cb) {
        return this.request("DescribeEcdnStatistics", req, cb);
    }
    async DescribeEcdnDomainStatistics(req, cb) {
        return this.request("DescribeEcdnDomainStatistics", req, cb);
    }
}
