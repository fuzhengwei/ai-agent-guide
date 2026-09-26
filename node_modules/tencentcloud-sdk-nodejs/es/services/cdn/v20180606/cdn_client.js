import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cdn.tencentcloudapi.com", "2018-06-06", clientConfig);
    }
    async AddCLSTopicDomains(req, cb) {
        return this.request("AddCLSTopicDomains", req, cb);
    }
    async CreateEdgePackTask(req, cb) {
        return this.request("CreateEdgePackTask", req, cb);
    }
    async ModifyDomainConfig(req, cb) {
        return this.request("ModifyDomainConfig", req, cb);
    }
    async DescribeIpStatus(req, cb) {
        return this.request("DescribeIpStatus", req, cb);
    }
    async DescribeMapInfo(req, cb) {
        return this.request("DescribeMapInfo", req, cb);
    }
    async DeleteCdnDomain(req, cb) {
        return this.request("DeleteCdnDomain", req, cb);
    }
    async VerifyDomainRecord(req, cb) {
        return this.request("VerifyDomainRecord", req, cb);
    }
    async DescribeEdgePackTaskStatus(req, cb) {
        return this.request("DescribeEdgePackTaskStatus", req, cb);
    }
    async DescribePayType(req, cb) {
        return this.request("DescribePayType", req, cb);
    }
    async DescribeDomainsConfig(req, cb) {
        return this.request("DescribeDomainsConfig", req, cb);
    }
    async AddCdnDomain(req, cb) {
        return this.request("AddCdnDomain", req, cb);
    }
    async DescribeIpVisit(req, cb) {
        return this.request("DescribeIpVisit", req, cb);
    }
    async DescribeCdnData(req, cb) {
        return this.request("DescribeCdnData", req, cb);
    }
    async DescribeHttpsPackages(req, cb) {
        return this.request("DescribeHttpsPackages", req, cb);
    }
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    async CreateVerifyRecord(req, cb) {
        return this.request("CreateVerifyRecord", req, cb);
    }
    async ManageClsTopicDomains(req, cb) {
        return this.request("ManageClsTopicDomains", req, cb);
    }
    async StartCdnDomain(req, cb) {
        return this.request("StartCdnDomain", req, cb);
    }
    async DuplicateDomainConfig(req, cb) {
        return this.request("DuplicateDomainConfig", req, cb);
    }
    async ListTopClsLogData(req, cb) {
        return this.request("ListTopClsLogData", req, cb);
    }
    async DescribePurgeQuota(req, cb) {
        return this.request("DescribePurgeQuota", req, cb);
    }
    async DescribeImageConfig(req, cb) {
        return this.request("DescribeImageConfig", req, cb);
    }
    async DescribeTopData(req, cb) {
        return this.request("DescribeTopData", req, cb);
    }
    async SearchClsLog(req, cb) {
        return this.request("SearchClsLog", req, cb);
    }
    async StopCdnDomain(req, cb) {
        return this.request("StopCdnDomain", req, cb);
    }
    async ListTopData(req, cb) {
        return this.request("ListTopData", req, cb);
    }
    async DescribeOriginData(req, cb) {
        return this.request("DescribeOriginData", req, cb);
    }
    async DescribeCdnIp(req, cb) {
        return this.request("DescribeCdnIp", req, cb);
    }
    async PurgePathCache(req, cb) {
        return this.request("PurgePathCache", req, cb);
    }
    async DescribePurgeTasks(req, cb) {
        return this.request("DescribePurgeTasks", req, cb);
    }
    async DescribeUrlViolations(req, cb) {
        return this.request("DescribeUrlViolations", req, cb);
    }
    async PurgeUrlsCache(req, cb) {
        return this.request("PurgeUrlsCache", req, cb);
    }
    async DescribeTrafficPackages(req, cb) {
        return this.request("DescribeTrafficPackages", req, cb);
    }
    async UpdateDomainConfig(req, cb) {
        return this.request("UpdateDomainConfig", req, cb);
    }
    async DescribeCdnDomainLogs(req, cb) {
        return this.request("DescribeCdnDomainLogs", req, cb);
    }
    async DescribePushTasks(req, cb) {
        return this.request("DescribePushTasks", req, cb);
    }
    async DescribeCertDomains(req, cb) {
        return this.request("DescribeCertDomains", req, cb);
    }
    async CreateClsLogTopic(req, cb) {
        return this.request("CreateClsLogTopic", req, cb);
    }
    async PushUrlsCache(req, cb) {
        return this.request("PushUrlsCache", req, cb);
    }
    async UpdateImageConfig(req, cb) {
        return this.request("UpdateImageConfig", req, cb);
    }
    async ModifyPurgeFetchTaskStatus(req, cb) {
        return this.request("ModifyPurgeFetchTaskStatus", req, cb);
    }
    async DisableClsLogTopic(req, cb) {
        return this.request("DisableClsLogTopic", req, cb);
    }
    async ListClsTopicDomains(req, cb) {
        return this.request("ListClsTopicDomains", req, cb);
    }
    async ListClsLogTopics(req, cb) {
        return this.request("ListClsLogTopics", req, cb);
    }
    async DeleteClsLogTopic(req, cb) {
        return this.request("DeleteClsLogTopic", req, cb);
    }
    async DescribeCdnOriginIp(req, cb) {
        return this.request("DescribeCdnOriginIp", req, cb);
    }
    async DescribeBillingData(req, cb) {
        return this.request("DescribeBillingData", req, cb);
    }
    async DescribePushQuota(req, cb) {
        return this.request("DescribePushQuota", req, cb);
    }
    async EnableClsLogTopic(req, cb) {
        return this.request("EnableClsLogTopic", req, cb);
    }
    async DescribeReportData(req, cb) {
        return this.request("DescribeReportData", req, cb);
    }
    async DescribeDistrictIspData(req, cb) {
        return this.request("DescribeDistrictIspData", req, cb);
    }
    async UpdatePayType(req, cb) {
        return this.request("UpdatePayType", req, cb);
    }
}
