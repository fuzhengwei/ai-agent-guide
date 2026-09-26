import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ctem.tencentcloudapi.com", "2023-11-28", clientConfig);
    }
    async CreateWechatApplet(req, cb) {
        return this.request("CreateWechatApplet", req, cb);
    }
    async DescribeNetDisks(req, cb) {
        return this.request("DescribeNetDisks", req, cb);
    }
    async CreateManage(req, cb) {
        return this.request("CreateManage", req, cb);
    }
    async DescribeManages(req, cb) {
        return this.request("DescribeManages", req, cb);
    }
    async DescribeLeakageDatas(req, cb) {
        return this.request("DescribeLeakageDatas", req, cb);
    }
    async DescribeHttps(req, cb) {
        return this.request("DescribeHttps", req, cb);
    }
    async ModifyCustomer(req, cb) {
        return this.request("ModifyCustomer", req, cb);
    }
    async CreateAsset(req, cb) {
        return this.request("CreateAsset", req, cb);
    }
    async DeleteManages(req, cb) {
        return this.request("DeleteManages", req, cb);
    }
    async DeleteHttps(req, cb) {
        return this.request("DeleteHttps", req, cb);
    }
    async CreateSuspiciousAsset(req, cb) {
        return this.request("CreateSuspiciousAsset", req, cb);
    }
    async DeleteSuspiciousAssets(req, cb) {
        return this.request("DeleteSuspiciousAssets", req, cb);
    }
    async DescribeApiSecs(req, cb) {
        return this.request("DescribeApiSecs", req, cb);
    }
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    async DescribeAssets(req, cb) {
        return this.request("DescribeAssets", req, cb);
    }
    async DeleteSubDomains(req, cb) {
        return this.request("DeleteSubDomains", req, cb);
    }
    async DescribeVuls(req, cb) {
        return this.request("DescribeVuls", req, cb);
    }
    async DescribeSeeds(req, cb) {
        return this.request("DescribeSeeds", req, cb);
    }
    async DescribeConfigs(req, cb) {
        return this.request("DescribeConfigs", req, cb);
    }
    async DeleteWechatOfficialAccounts(req, cb) {
        return this.request("DeleteWechatOfficialAccounts", req, cb);
    }
    async DeleteWechatApplets(req, cb) {
        return this.request("DeleteWechatApplets", req, cb);
    }
    async DescribeFakeWebsites(req, cb) {
        return this.request("DescribeFakeWebsites", req, cb);
    }
    async IgnoreData(req, cb) {
        return this.request("IgnoreData", req, cb);
    }
    async DescribeSensitiveInfos(req, cb) {
        return this.request("DescribeSensitiveInfos", req, cb);
    }
    async CreateSubDomain(req, cb) {
        return this.request("CreateSubDomain", req, cb);
    }
    async DescribeFakeMiniPrograms(req, cb) {
        return this.request("DescribeFakeMiniPrograms", req, cb);
    }
    async DescribeSubDomains(req, cb) {
        return this.request("DescribeSubDomains", req, cb);
    }
    async DescribeCustomers(req, cb) {
        return this.request("DescribeCustomers", req, cb);
    }
    async DescribeLeakageEmails(req, cb) {
        return this.request("DescribeLeakageEmails", req, cb);
    }
    async DeletePorts(req, cb) {
        return this.request("DeletePorts", req, cb);
    }
    async CreatePort(req, cb) {
        return this.request("CreatePort", req, cb);
    }
    async DescribeFakeApps(req, cb) {
        return this.request("DescribeFakeApps", req, cb);
    }
    async ModifyLabel(req, cb) {
        return this.request("ModifyLabel", req, cb);
    }
    async DescribeApps(req, cb) {
        return this.request("DescribeApps", req, cb);
    }
    async CreateWechatOfficialAccount(req, cb) {
        return this.request("CreateWechatOfficialAccount", req, cb);
    }
    async DescribeFakeWechatOfficials(req, cb) {
        return this.request("DescribeFakeWechatOfficials", req, cb);
    }
    async DescribeJobRecordDetails(req, cb) {
        return this.request("DescribeJobRecordDetails", req, cb);
    }
    async DescribeSuspiciousAssets(req, cb) {
        return this.request("DescribeSuspiciousAssets", req, cb);
    }
    async DescribeGithubs(req, cb) {
        return this.request("DescribeGithubs", req, cb);
    }
    async DescribePorts(req, cb) {
        return this.request("DescribePorts", req, cb);
    }
    async CreateJobRecord(req, cb) {
        return this.request("CreateJobRecord", req, cb);
    }
    async CreateHttp(req, cb) {
        return this.request("CreateHttp", req, cb);
    }
    async DeleteApps(req, cb) {
        return this.request("DeleteApps", req, cb);
    }
    async CreateSeeds(req, cb) {
        return this.request("CreateSeeds", req, cb);
    }
    async DeleteEnterprises(req, cb) {
        return this.request("DeleteEnterprises", req, cb);
    }
    async ModifySeedStatus(req, cb) {
        return this.request("ModifySeedStatus", req, cb);
    }
    async DeleteDomains(req, cb) {
        return this.request("DeleteDomains", req, cb);
    }
    async DeleteAssets(req, cb) {
        return this.request("DeleteAssets", req, cb);
    }
    async CreateApp(req, cb) {
        return this.request("CreateApp", req, cb);
    }
    async DescribeDarkWebs(req, cb) {
        return this.request("DescribeDarkWebs", req, cb);
    }
    async CreateDomain(req, cb) {
        return this.request("CreateDomain", req, cb);
    }
    async DescribeLeakageCodes(req, cb) {
        return this.request("DescribeLeakageCodes", req, cb);
    }
    async DescribeWechatOfficialAccounts(req, cb) {
        return this.request("DescribeWechatOfficialAccounts", req, cb);
    }
    async DescribeEnterprises(req, cb) {
        return this.request("DescribeEnterprises", req, cb);
    }
    async CreateEnterprise(req, cb) {
        return this.request("CreateEnterprise", req, cb);
    }
    async CreateCustomer(req, cb) {
        return this.request("CreateCustomer", req, cb);
    }
    async StopJobRecord(req, cb) {
        return this.request("StopJobRecord", req, cb);
    }
    async DescribeJobRecords(req, cb) {
        return this.request("DescribeJobRecords", req, cb);
    }
    async DescribeWeakPasswords(req, cb) {
        return this.request("DescribeWeakPasswords", req, cb);
    }
    async DescribeWechatApplets(req, cb) {
        return this.request("DescribeWechatApplets", req, cb);
    }
    async DeleteSeeds(req, cb) {
        return this.request("DeleteSeeds", req, cb);
    }
}
