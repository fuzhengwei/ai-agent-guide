import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cws.tencentcloudapi.com", "2018-03-12", clientConfig);
    }
    async CreateVulsReport(req, cb) {
        return this.request("CreateVulsReport", req, cb);
    }
    async DescribeVuls(req, cb) {
        return this.request("DescribeVuls", req, cb);
    }
    async ModifyMonitorAttribute(req, cb) {
        return this.request("ModifyMonitorAttribute", req, cb);
    }
    async CreateSitesScans(req, cb) {
        return this.request("CreateSitesScans", req, cb);
    }
    async CreateSites(req, cb) {
        return this.request("CreateSites", req, cb);
    }
    async CreateVulsMisinformation(req, cb) {
        return this.request("CreateVulsMisinformation", req, cb);
    }
    async DescribeConfig(req, cb) {
        return this.request("DescribeConfig", req, cb);
    }
    async DescribeSites(req, cb) {
        return this.request("DescribeSites", req, cb);
    }
    async DescribeSitesVerification(req, cb) {
        return this.request("DescribeSitesVerification", req, cb);
    }
    async ModifySiteAttribute(req, cb) {
        return this.request("ModifySiteAttribute", req, cb);
    }
    async ModifyConfigAttribute(req, cb) {
        return this.request("ModifyConfigAttribute", req, cb);
    }
    async DescribeVulsNumberTimeline(req, cb) {
        return this.request("DescribeVulsNumberTimeline", req, cb);
    }
    async VerifySites(req, cb) {
        return this.request("VerifySites", req, cb);
    }
    async DeleteMonitors(req, cb) {
        return this.request("DeleteMonitors", req, cb);
    }
    async CreateMonitors(req, cb) {
        return this.request("CreateMonitors", req, cb);
    }
    async DeleteSites(req, cb) {
        return this.request("DeleteSites", req, cb);
    }
    async DescribeVulsNumber(req, cb) {
        return this.request("DescribeVulsNumber", req, cb);
    }
    async DescribeMonitors(req, cb) {
        return this.request("DescribeMonitors", req, cb);
    }
    async DescribeSiteQuota(req, cb) {
        return this.request("DescribeSiteQuota", req, cb);
    }
}
