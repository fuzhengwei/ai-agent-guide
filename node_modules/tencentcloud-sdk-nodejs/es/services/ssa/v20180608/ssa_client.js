import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ssa.tencentcloudapi.com", "2018-06-08", clientConfig);
    }
    async DescribeAssetDetailList(req, cb) {
        return this.request("DescribeAssetDetailList", req, cb);
    }
    async DescribeConfigList(req, cb) {
        return this.request("DescribeConfigList", req, cb);
    }
    async DescribeLeakDetectionList(req, cb) {
        return this.request("DescribeLeakDetectionList", req, cb);
    }
    async DescribeMappingResults(req, cb) {
        return this.request("DescribeMappingResults", req, cb);
    }
    async DescribeEventDetail(req, cb) {
        return this.request("DescribeEventDetail", req, cb);
    }
    async DescribeComplianceAssetList(req, cb) {
        return this.request("DescribeComplianceAssetList", req, cb);
    }
    async DescribeDomainList(req, cb) {
        return this.request("DescribeDomainList", req, cb);
    }
    async DescribeSocCheckItemList(req, cb) {
        return this.request("DescribeSocCheckItemList", req, cb);
    }
    async DescribeAssetDetail(req, cb) {
        return this.request("DescribeAssetDetail", req, cb);
    }
    async SaEventPub(req, cb) {
        return this.request("SaEventPub", req, cb);
    }
    async SaDivulgeScanRuleMutate(req, cb) {
        return this.request("SaDivulgeScanRuleMutate", req, cb);
    }
    async DescribeComplianceList(req, cb) {
        return this.request("DescribeComplianceList", req, cb);
    }
    async DescribeAssetList(req, cb) {
        return this.request("DescribeAssetList", req, cb);
    }
    async DescribeCheckConfigAssetList(req, cb) {
        return this.request("DescribeCheckConfigAssetList", req, cb);
    }
    async DescribeVulList(req, cb) {
        return this.request("DescribeVulList", req, cb);
    }
    async DescribeSocCheckResultList(req, cb) {
        return this.request("DescribeSocCheckResultList", req, cb);
    }
    async DescribeSocAlertDetails(req, cb) {
        return this.request("DescribeSocAlertDetails", req, cb);
    }
    async DescribeAlarmStat(req, cb) {
        return this.request("DescribeAlarmStat", req, cb);
    }
    async DescribeSocCspmCompliance(req, cb) {
        return this.request("DescribeSocCspmCompliance", req, cb);
    }
    async DescribeSocAlertList(req, cb) {
        return this.request("DescribeSocAlertList", req, cb);
    }
    async DescribeCheckConfigDetail(req, cb) {
        return this.request("DescribeCheckConfigDetail", req, cb);
    }
    async DescribeComplianceDetail(req, cb) {
        return this.request("DescribeComplianceDetail", req, cb);
    }
    async DescribeVulDetail(req, cb) {
        return this.request("DescribeVulDetail", req, cb);
    }
}
