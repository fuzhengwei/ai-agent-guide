import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("sslpod.tencentcloudapi.com", "2019-06-05", clientConfig);
    }
    async DescribeNoticeInfo(req, cb) {
        return this.request("DescribeNoticeInfo", req, cb);
    }
    async RefreshDomain(req, cb) {
        return this.request("RefreshDomain", req, cb);
    }
    async ModifyDomainTags(req, cb) {
        return this.request("ModifyDomainTags", req, cb);
    }
    async DescribeDomainTags(req, cb) {
        return this.request("DescribeDomainTags", req, cb);
    }
    async DescribeDomainCerts(req, cb) {
        return this.request("DescribeDomainCerts", req, cb);
    }
    async DescribeDashboard(req, cb) {
        return this.request("DescribeDashboard", req, cb);
    }
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    async DeleteDomain(req, cb) {
        return this.request("DeleteDomain", req, cb);
    }
    async CreateDomain(req, cb) {
        return this.request("CreateDomain", req, cb);
    }
    async ResolveDomain(req, cb) {
        return this.request("ResolveDomain", req, cb);
    }
}
