import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dayu.tencentcloudapi.com", "2018-07-09", clientConfig);
    }
    async ModifyCCIpAllowDeny(req, cb) {
        return this.request("ModifyCCIpAllowDeny", req, cb);
    }
    async DescribeDDoSCount(req, cb) {
        return this.request("DescribeDDoSCount", req, cb);
    }
    async DeleteNewL4Rules(req, cb) {
        return this.request("DeleteNewL4Rules", req, cb);
    }
    async DescribeRuleSets(req, cb) {
        return this.request("DescribeRuleSets", req, cb);
    }
    async CreateNewL7RulesUpload(req, cb) {
        return this.request("CreateNewL7RulesUpload", req, cb);
    }
    async CreateL7CCRule(req, cb) {
        return this.request("CreateL7CCRule", req, cb);
    }
    async CreateCCSelfDefinePolicy(req, cb) {
        return this.request("CreateCCSelfDefinePolicy", req, cb);
    }
    async CreateNewL7Rules(req, cb) {
        return this.request("CreateNewL7Rules", req, cb);
    }
    async ModifyCCPolicySwitch(req, cb) {
        return this.request("ModifyCCPolicySwitch", req, cb);
    }
    async DescribeNewL7RulesErrHealth(req, cb) {
        return this.request("DescribeNewL7RulesErrHealth", req, cb);
    }
    async CreateDDoSPolicyCase(req, cb) {
        return this.request("CreateDDoSPolicyCase", req, cb);
    }
    async DescribeDDoSNetTrend(req, cb) {
        return this.request("DescribeDDoSNetTrend", req, cb);
    }
    async ModifyDDoSPolicyName(req, cb) {
        return this.request("ModifyDDoSPolicyName", req, cb);
    }
    async ModifyL4Health(req, cb) {
        return this.request("ModifyL4Health", req, cb);
    }
    async DescribeDDoSUsedStatis(req, cb) {
        return this.request("DescribeDDoSUsedStatis", req, cb);
    }
    async DescribeDDoSDefendStatus(req, cb) {
        return this.request("DescribeDDoSDefendStatus", req, cb);
    }
    async DescribeCCAlarmThreshold(req, cb) {
        return this.request("DescribeCCAlarmThreshold", req, cb);
    }
    async DescribePcap(req, cb) {
        return this.request("DescribePcap", req, cb);
    }
    async DescribeNewL4Rules(req, cb) {
        return this.request("DescribeNewL4Rules", req, cb);
    }
    async ModifyElasticLimit(req, cb) {
        return this.request("ModifyElasticLimit", req, cb);
    }
    async DescribeDDoSNetIpLog(req, cb) {
        return this.request("DescribeDDoSNetIpLog", req, cb);
    }
    async ModifyCCAlarmThreshold(req, cb) {
        return this.request("ModifyCCAlarmThreshold", req, cb);
    }
    async DescribeDDoSEvList(req, cb) {
        return this.request("DescribeDDoSEvList", req, cb);
    }
    async DescribeIpBlockList(req, cb) {
        return this.request("DescribeIpBlockList", req, cb);
    }
    async DescribeL4HealthConfig(req, cb) {
        return this.request("DescribeL4HealthConfig", req, cb);
    }
    async DescribeSecIndex(req, cb) {
        return this.request("DescribeSecIndex", req, cb);
    }
    async DescribeSchedulingDomainList(req, cb) {
        return this.request("DescribeSchedulingDomainList", req, cb);
    }
    async DescribeCCFrequencyRules(req, cb) {
        return this.request("DescribeCCFrequencyRules", req, cb);
    }
    async DeleteDDoSPolicyCase(req, cb) {
        return this.request("DeleteDDoSPolicyCase", req, cb);
    }
    async DeleteL7Rules(req, cb) {
        return this.request("DeleteL7Rules", req, cb);
    }
    async CreateNewL4Rules(req, cb) {
        return this.request("CreateNewL4Rules", req, cb);
    }
    async CreateL4Rules(req, cb) {
        return this.request("CreateL4Rules", req, cb);
    }
    async DescribeBaradData(req, cb) {
        return this.request("DescribeBaradData", req, cb);
    }
    async ModifyCCFrequencyRules(req, cb) {
        return this.request("ModifyCCFrequencyRules", req, cb);
    }
    async DescribleL7Rules(req, cb) {
        return this.request("DescribleL7Rules", req, cb);
    }
    async CreateDDoSPolicy(req, cb) {
        return this.request("CreateDDoSPolicy", req, cb);
    }
    async ModifyResBindDDoSPolicy(req, cb) {
        return this.request("ModifyResBindDDoSPolicy", req, cb);
    }
    async ModifyNetReturnSwitch(req, cb) {
        return this.request("ModifyNetReturnSwitch", req, cb);
    }
    async DescribeNewL4RulesErrHealth(req, cb) {
        return this.request("DescribeNewL4RulesErrHealth", req, cb);
    }
    async DescribeSourceIpSegment(req, cb) {
        return this.request("DescribeSourceIpSegment", req, cb);
    }
    async ModifyCCUrlAllow(req, cb) {
        return this.request("ModifyCCUrlAllow", req, cb);
    }
    async DescribeBasicDeviceThreshold(req, cb) {
        return this.request("DescribeBasicDeviceThreshold", req, cb);
    }
    async CreateUnblockIp(req, cb) {
        return this.request("CreateUnblockIp", req, cb);
    }
    async DeleteDDoSPolicy(req, cb) {
        return this.request("DeleteDDoSPolicy", req, cb);
    }
    async ModifyNewL4Rule(req, cb) {
        return this.request("ModifyNewL4Rule", req, cb);
    }
    async DescribeResourceList(req, cb) {
        return this.request("DescribeResourceList", req, cb);
    }
    async DescribeBizHttpStatus(req, cb) {
        return this.request("DescribeBizHttpStatus", req, cb);
    }
    async DeleteCCSelfDefinePolicy(req, cb) {
        return this.request("DeleteCCSelfDefinePolicy", req, cb);
    }
    async DescribePolicyCase(req, cb) {
        return this.request("DescribePolicyCase", req, cb);
    }
    async DescribeActionLog(req, cb) {
        return this.request("DescribeActionLog", req, cb);
    }
    async ModifyL4Rules(req, cb) {
        return this.request("ModifyL4Rules", req, cb);
    }
    async DescribeDDoSIpLog(req, cb) {
        return this.request("DescribeDDoSIpLog", req, cb);
    }
    async DescribeDDoSAlarmThreshold(req, cb) {
        return this.request("DescribeDDoSAlarmThreshold", req, cb);
    }
    async DescribePackIndex(req, cb) {
        return this.request("DescribePackIndex", req, cb);
    }
    async DescribleNewL7Rules(req, cb) {
        return this.request("DescribleNewL7Rules", req, cb);
    }
    async CreateBasicDDoSAlarmThreshold(req, cb) {
        return this.request("CreateBasicDDoSAlarmThreshold", req, cb);
    }
    async ModifyDDoSThreshold(req, cb) {
        return this.request("ModifyDDoSThreshold", req, cb);
    }
    async CreateL7RuleCert(req, cb) {
        return this.request("CreateL7RuleCert", req, cb);
    }
    async ModifyDDoSAIStatus(req, cb) {
        return this.request("ModifyDDoSAIStatus", req, cb);
    }
    async DescribeCCIpAllowDeny(req, cb) {
        return this.request("DescribeCCIpAllowDeny", req, cb);
    }
    async CreateL4HealthConfig(req, cb) {
        return this.request("CreateL4HealthConfig", req, cb);
    }
    async DescribeDDoSNetCount(req, cb) {
        return this.request("DescribeDDoSNetCount", req, cb);
    }
    async CreateBoundIP(req, cb) {
        return this.request("CreateBoundIP", req, cb);
    }
    async ModifyDDoSPolicy(req, cb) {
        return this.request("ModifyDDoSPolicy", req, cb);
    }
    async ModifyDDoSPolicyCase(req, cb) {
        return this.request("ModifyDDoSPolicyCase", req, cb);
    }
    async ModifyDDoSAlarmThreshold(req, cb) {
        return this.request("ModifyDDoSAlarmThreshold", req, cb);
    }
    async DescribeDDoSNetEvInfo(req, cb) {
        return this.request("DescribeDDoSNetEvInfo", req, cb);
    }
    async DeleteCCFrequencyRules(req, cb) {
        return this.request("DeleteCCFrequencyRules", req, cb);
    }
    async ModifyL4KeepTime(req, cb) {
        return this.request("ModifyL4KeepTime", req, cb);
    }
    async DescribeL4RulesErrHealth(req, cb) {
        return this.request("DescribeL4RulesErrHealth", req, cb);
    }
    async CreateL7RulesUpload(req, cb) {
        return this.request("CreateL7RulesUpload", req, cb);
    }
    async DescribeDDoSPolicy(req, cb) {
        return this.request("DescribeDDoSPolicy", req, cb);
    }
    async DescribeTransmitStatis(req, cb) {
        return this.request("DescribeTransmitStatis", req, cb);
    }
    async ModifyCCLevel(req, cb) {
        return this.request("ModifyCCLevel", req, cb);
    }
    async ModifyDDoSDefendStatus(req, cb) {
        return this.request("ModifyDDoSDefendStatus", req, cb);
    }
    async DescribeUnBlockStatis(req, cb) {
        return this.request("DescribeUnBlockStatis", req, cb);
    }
    async DescribeDDoSTrend(req, cb) {
        return this.request("DescribeDDoSTrend", req, cb);
    }
    async CreateNetReturn(req, cb) {
        return this.request("CreateNetReturn", req, cb);
    }
    async ModifyDDoSSwitch(req, cb) {
        return this.request("ModifyDDoSSwitch", req, cb);
    }
    async ModifyDDoSLevel(req, cb) {
        return this.request("ModifyDDoSLevel", req, cb);
    }
    async DescribeDDoSAttackSource(req, cb) {
        return this.request("DescribeDDoSAttackSource", req, cb);
    }
    async DeleteNewL7Rules(req, cb) {
        return this.request("DeleteNewL7Rules", req, cb);
    }
    async DescribeCCEvList(req, cb) {
        return this.request("DescribeCCEvList", req, cb);
    }
    async ModifyDDoSWaterKey(req, cb) {
        return this.request("ModifyDDoSWaterKey", req, cb);
    }
    async DescribeInsurePacks(req, cb) {
        return this.request("DescribeInsurePacks", req, cb);
    }
    async DeleteL4Rules(req, cb) {
        return this.request("DeleteL4Rules", req, cb);
    }
    async DescribeDDoSNetEvList(req, cb) {
        return this.request("DescribeDDoSNetEvList", req, cb);
    }
    async ModifyCCHostProtection(req, cb) {
        return this.request("ModifyCCHostProtection", req, cb);
    }
    async DescribeBizTrend(req, cb) {
        return this.request("DescribeBizTrend", req, cb);
    }
    async DescribleRegionCount(req, cb) {
        return this.request("DescribleRegionCount", req, cb);
    }
    async CreateL7Rules(req, cb) {
        return this.request("CreateL7Rules", req, cb);
    }
    async DescribeIpUnBlockList(req, cb) {
        return this.request("DescribeIpUnBlockList", req, cb);
    }
    async DescribeIPProductInfo(req, cb) {
        return this.request("DescribeIPProductInfo", req, cb);
    }
    async DescribeCCSelfDefinePolicy(req, cb) {
        return this.request("DescribeCCSelfDefinePolicy", req, cb);
    }
    async ModifyCCFrequencyRulesStatus(req, cb) {
        return this.request("ModifyCCFrequencyRulesStatus", req, cb);
    }
    async ModifyCCThreshold(req, cb) {
        return this.request("ModifyCCThreshold", req, cb);
    }
    async DescribleL4Rules(req, cb) {
        return this.request("DescribleL4Rules", req, cb);
    }
    async ModifyNewDomainRules(req, cb) {
        return this.request("ModifyNewDomainRules", req, cb);
    }
    async DescribeCCUrlAllow(req, cb) {
        return this.request("DescribeCCUrlAllow", req, cb);
    }
    async DescribeL7HealthConfig(req, cb) {
        return this.request("DescribeL7HealthConfig", req, cb);
    }
    async DescribeCCTrend(req, cb) {
        return this.request("DescribeCCTrend", req, cb);
    }
    async CreateCCFrequencyRules(req, cb) {
        return this.request("CreateCCFrequencyRules", req, cb);
    }
    async ModifyL7Rules(req, cb) {
        return this.request("ModifyL7Rules", req, cb);
    }
    async DescribeBasicCCThreshold(req, cb) {
        return this.request("DescribeBasicCCThreshold", req, cb);
    }
    async CreateL7HealthConfig(req, cb) {
        return this.request("CreateL7HealthConfig", req, cb);
    }
    async DescribeResIpList(req, cb) {
        return this.request("DescribeResIpList", req, cb);
    }
    async CreateInstanceName(req, cb) {
        return this.request("CreateInstanceName", req, cb);
    }
    async DescribeBGPIPL7RuleMaxCnt(req, cb) {
        return this.request("DescribeBGPIPL7RuleMaxCnt", req, cb);
    }
    async ModifyResourceRenewFlag(req, cb) {
        return this.request("ModifyResourceRenewFlag", req, cb);
    }
    async ModifyCCSelfDefinePolicy(req, cb) {
        return this.request("ModifyCCSelfDefinePolicy", req, cb);
    }
    async DescribeDDoSEvInfo(req, cb) {
        return this.request("DescribeDDoSEvInfo", req, cb);
    }
    async DescribeDDoSAttackIPRegionMap(req, cb) {
        return this.request("DescribeDDoSAttackIPRegionMap", req, cb);
    }
}
