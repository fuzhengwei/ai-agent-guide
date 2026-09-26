import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("gaap.tencentcloudapi.com", "2018-05-29", clientConfig);
    }
    async ModifyGlobalDomainDns(req, cb) {
        return this.request("ModifyGlobalDomainDns", req, cb);
    }
    async DescribeCertificates(req, cb) {
        return this.request("DescribeCertificates", req, cb);
    }
    async CreateSecurityRules(req, cb) {
        return this.request("CreateSecurityRules", req, cb);
    }
    async DescribeHTTPSListeners(req, cb) {
        return this.request("DescribeHTTPSListeners", req, cb);
    }
    async DeleteSecurityPolicy(req, cb) {
        return this.request("DeleteSecurityPolicy", req, cb);
    }
    async DescribeBlackHeader(req, cb) {
        return this.request("DescribeBlackHeader", req, cb);
    }
    async DescribeCountryAreaMapping(req, cb) {
        return this.request("DescribeCountryAreaMapping", req, cb);
    }
    async ModifyHTTPListenerAttribute(req, cb) {
        return this.request("ModifyHTTPListenerAttribute", req, cb);
    }
    async ModifyCertificateAttributes(req, cb) {
        return this.request("ModifyCertificateAttributes", req, cb);
    }
    async DescribeGlobalDomainDns(req, cb) {
        return this.request("DescribeGlobalDomainDns", req, cb);
    }
    async CreateGlobalDomain(req, cb) {
        return this.request("CreateGlobalDomain", req, cb);
    }
    async CreateCustomHeader(req, cb) {
        return this.request("CreateCustomHeader", req, cb);
    }
    async DescribeCrossBorderProxies(req, cb) {
        return this.request("DescribeCrossBorderProxies", req, cb);
    }
    async DescribeGroupAndStatisticsProxy(req, cb) {
        return this.request("DescribeGroupAndStatisticsProxy", req, cb);
    }
    async CloseSecurityPolicy(req, cb) {
        return this.request("CloseSecurityPolicy", req, cb);
    }
    async CreateProxyGroupDomain(req, cb) {
        return this.request("CreateProxyGroupDomain", req, cb);
    }
    async SetTlsVersion(req, cb) {
        return this.request("SetTlsVersion", req, cb);
    }
    async CreateUDPListeners(req, cb) {
        return this.request("CreateUDPListeners", req, cb);
    }
    async DescribeProxyDetail(req, cb) {
        return this.request("DescribeProxyDetail", req, cb);
    }
    async DescribeRuleRealServers(req, cb) {
        return this.request("DescribeRuleRealServers", req, cb);
    }
    async DescribeDestRegions(req, cb) {
        return this.request("DescribeDestRegions", req, cb);
    }
    async DescribeRulesByRuleIds(req, cb) {
        return this.request("DescribeRulesByRuleIds", req, cb);
    }
    async DescribeProxyGroupList(req, cb) {
        return this.request("DescribeProxyGroupList", req, cb);
    }
    async OpenSecurityPolicy(req, cb) {
        return this.request("OpenSecurityPolicy", req, cb);
    }
    async DeleteDomainErrorPageInfo(req, cb) {
        return this.request("DeleteDomainErrorPageInfo", req, cb);
    }
    async ModifyCertificate(req, cb) {
        return this.request("ModifyCertificate", req, cb);
    }
    async CreateDomainErrorPageInfo(req, cb) {
        return this.request("CreateDomainErrorPageInfo", req, cb);
    }
    async DescribeProxyGroupStatistics(req, cb) {
        return this.request("DescribeProxyGroupStatistics", req, cb);
    }
    async ModifyRealServerName(req, cb) {
        return this.request("ModifyRealServerName", req, cb);
    }
    async BindListenerRealServers(req, cb) {
        return this.request("BindListenerRealServers", req, cb);
    }
    async DeleteSecurityRules(req, cb) {
        return this.request("DeleteSecurityRules", req, cb);
    }
    async DeleteCertificate(req, cb) {
        return this.request("DeleteCertificate", req, cb);
    }
    async DescribeAccessRegionsByDestRegion(req, cb) {
        return this.request("DescribeAccessRegionsByDestRegion", req, cb);
    }
    async ModifyGroupDomainConfig(req, cb) {
        return this.request("ModifyGroupDomainConfig", req, cb);
    }
    async DescribeTCPListeners(req, cb) {
        return this.request("DescribeTCPListeners", req, cb);
    }
    async DescribeRealServers(req, cb) {
        return this.request("DescribeRealServers", req, cb);
    }
    async DescribeProxyAndStatisticsListeners(req, cb) {
        return this.request("DescribeProxyAndStatisticsListeners", req, cb);
    }
    async ModifyGlobalDomainAttribute(req, cb) {
        return this.request("ModifyGlobalDomainAttribute", req, cb);
    }
    async DescribeUDPListeners(req, cb) {
        return this.request("DescribeUDPListeners", req, cb);
    }
    async ModifyProxyConfiguration(req, cb) {
        return this.request("ModifyProxyConfiguration", req, cb);
    }
    async CloseProxyGroup(req, cb) {
        return this.request("CloseProxyGroup", req, cb);
    }
    async ModifyTCPListenerAttribute(req, cb) {
        return this.request("ModifyTCPListenerAttribute", req, cb);
    }
    async CreateHTTPListener(req, cb) {
        return this.request("CreateHTTPListener", req, cb);
    }
    async DescribeRealServerStatistics(req, cb) {
        return this.request("DescribeRealServerStatistics", req, cb);
    }
    async DescribeHTTPListeners(req, cb) {
        return this.request("DescribeHTTPListeners", req, cb);
    }
    async CreateProxyGroup(req, cb) {
        return this.request("CreateProxyGroup", req, cb);
    }
    async CreateCertificate(req, cb) {
        return this.request("CreateCertificate", req, cb);
    }
    async DescribeCustomHeader(req, cb) {
        return this.request("DescribeCustomHeader", req, cb);
    }
    async DeleteGlobalDomainDns(req, cb) {
        return this.request("DeleteGlobalDomainDns", req, cb);
    }
    async DestroyProxies(req, cb) {
        return this.request("DestroyProxies", req, cb);
    }
    async CreateProxy(req, cb) {
        return this.request("CreateProxy", req, cb);
    }
    async DeleteDomain(req, cb) {
        return this.request("DeleteDomain", req, cb);
    }
    async DescribeSecurityPolicyDetail(req, cb) {
        return this.request("DescribeSecurityPolicyDetail", req, cb);
    }
    async RemoveRealServers(req, cb) {
        return this.request("RemoveRealServers", req, cb);
    }
    async DeleteGlobalDomain(req, cb) {
        return this.request("DeleteGlobalDomain", req, cb);
    }
    async DescribeSecurityRules(req, cb) {
        return this.request("DescribeSecurityRules", req, cb);
    }
    async CreateSecurityPolicy(req, cb) {
        return this.request("CreateSecurityPolicy", req, cb);
    }
    async DeleteRule(req, cb) {
        return this.request("DeleteRule", req, cb);
    }
    async CreateRule(req, cb) {
        return this.request("CreateRule", req, cb);
    }
    async ModifyDomain(req, cb) {
        return this.request("ModifyDomain", req, cb);
    }
    async OpenProxies(req, cb) {
        return this.request("OpenProxies", req, cb);
    }
    async ModifyUDPListenerAttribute(req, cb) {
        return this.request("ModifyUDPListenerAttribute", req, cb);
    }
    async DescribeProxyGroupDetails(req, cb) {
        return this.request("DescribeProxyGroupDetails", req, cb);
    }
    async DescribeProxies(req, cb) {
        return this.request("DescribeProxies", req, cb);
    }
    async DeleteProxyGroup(req, cb) {
        return this.request("DeleteProxyGroup", req, cb);
    }
    async ModifyProxiesProject(req, cb) {
        return this.request("ModifyProxiesProject", req, cb);
    }
    async AddRealServers(req, cb) {
        return this.request("AddRealServers", req, cb);
    }
    async CreateDomain(req, cb) {
        return this.request("CreateDomain", req, cb);
    }
    async DescribeCertificateDetail(req, cb) {
        return this.request("DescribeCertificateDetail", req, cb);
    }
    async DescribeTaskStatus(req, cb) {
        return this.request("DescribeTaskStatus", req, cb);
    }
    async DisableGlobalDomain(req, cb) {
        return this.request("DisableGlobalDomain", req, cb);
    }
    async DescribeRegionAndPrice(req, cb) {
        return this.request("DescribeRegionAndPrice", req, cb);
    }
    async DescribeGlobalDomains(req, cb) {
        return this.request("DescribeGlobalDomains", req, cb);
    }
    async DescribeRealServersStatus(req, cb) {
        return this.request("DescribeRealServersStatus", req, cb);
    }
    async DescribeRules(req, cb) {
        return this.request("DescribeRules", req, cb);
    }
    async EnableGlobalDomain(req, cb) {
        return this.request("EnableGlobalDomain", req, cb);
    }
    async DescribeListenerRealServers(req, cb) {
        return this.request("DescribeListenerRealServers", req, cb);
    }
    async SetAuthentication(req, cb) {
        return this.request("SetAuthentication", req, cb);
    }
    async CreateHTTPSListener(req, cb) {
        return this.request("CreateHTTPSListener", req, cb);
    }
    async CheckProxyCreate(req, cb) {
        return this.request("CheckProxyCreate", req, cb);
    }
    async OpenProxyGroup(req, cb) {
        return this.request("OpenProxyGroup", req, cb);
    }
    async DescribeAccessRegions(req, cb) {
        return this.request("DescribeAccessRegions", req, cb);
    }
    async ModifyRuleAttribute(req, cb) {
        return this.request("ModifyRuleAttribute", req, cb);
    }
    async DescribeGroupDomainConfig(req, cb) {
        return this.request("DescribeGroupDomainConfig", req, cb);
    }
    async ModifyProxiesAttribute(req, cb) {
        return this.request("ModifyProxiesAttribute", req, cb);
    }
    async ModifyHTTPSListenerAttribute(req, cb) {
        return this.request("ModifyHTTPSListenerAttribute", req, cb);
    }
    async DescribeListenerStatistics(req, cb) {
        return this.request("DescribeListenerStatistics", req, cb);
    }
    async DeleteListeners(req, cb) {
        return this.request("DeleteListeners", req, cb);
    }
    async DescribeProxyStatistics(req, cb) {
        return this.request("DescribeProxyStatistics", req, cb);
    }
    async DescribeDomainErrorPageInfo(req, cb) {
        return this.request("DescribeDomainErrorPageInfo", req, cb);
    }
    async DescribeAuthSignature(req, cb) {
        return this.request("DescribeAuthSignature", req, cb);
    }
    async BanAndRecoverProxy(req, cb) {
        return this.request("BanAndRecoverProxy", req, cb);
    }
    async ModifyProxyGroupAttribute(req, cb) {
        return this.request("ModifyProxyGroupAttribute", req, cb);
    }
    async InquiryPriceCreateProxy(req, cb) {
        return this.request("InquiryPriceCreateProxy", req, cb);
    }
    async CreateGlobalDomainDns(req, cb) {
        return this.request("CreateGlobalDomainDns", req, cb);
    }
    async ModifySecurityRule(req, cb) {
        return this.request("ModifySecurityRule", req, cb);
    }
    async CloseProxies(req, cb) {
        return this.request("CloseProxies", req, cb);
    }
    async DescribeDomainErrorPageInfoByIds(req, cb) {
        return this.request("DescribeDomainErrorPageInfoByIds", req, cb);
    }
    async DescribeProxiesStatus(req, cb) {
        return this.request("DescribeProxiesStatus", req, cb);
    }
    async CreateTCPListeners(req, cb) {
        return this.request("CreateTCPListeners", req, cb);
    }
    async BindRuleRealServers(req, cb) {
        return this.request("BindRuleRealServers", req, cb);
    }
    async DescribeResourcesByTag(req, cb) {
        return this.request("DescribeResourcesByTag", req, cb);
    }
}
