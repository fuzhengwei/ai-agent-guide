import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("antiddos.tencentcloudapi.com", "2020-03-09", clientConfig);
    }
    async ModifyCCReqLimitPolicy(req, cb) {
        return this.request("ModifyCCReqLimitPolicy", req, cb);
    }
    async ModifyDDoSBlackWhiteIpList(req, cb) {
        return this.request("ModifyDDoSBlackWhiteIpList", req, cb);
    }
    async DescribePendingRiskInfo(req, cb) {
        return this.request("DescribePendingRiskInfo", req, cb);
    }
    async DescribeL7RulesBySSLCertId(req, cb) {
        return this.request("DescribeL7RulesBySSLCertId", req, cb);
    }
    async DescribeBGPIPL7Rules(req, cb) {
        return this.request("DescribeBGPIPL7Rules", req, cb);
    }
    async DescribeListProtectThresholdConfigNew(req, cb) {
        return this.request("DescribeListProtectThresholdConfigNew", req, cb);
    }
    async DescribeListIPAlarmConfig(req, cb) {
        return this.request("DescribeListIPAlarmConfig", req, cb);
    }
    async DescribeDefaultAlarmThreshold(req, cb) {
        return this.request("DescribeDefaultAlarmThreshold", req, cb);
    }
    async DescribeDDoSConnectLimitList(req, cb) {
        return this.request("DescribeDDoSConnectLimitList", req, cb);
    }
    async DescribeNewL7RulesErrHealth(req, cb) {
        return this.request("DescribeNewL7RulesErrHealth", req, cb);
    }
    async DescribeCcBlackWhiteIpList(req, cb) {
        return this.request("DescribeCcBlackWhiteIpList", req, cb);
    }
    async DescribeCCLevelList(req, cb) {
        return this.request("DescribeCCLevelList", req, cb);
    }
    async CreateCCPrecisionPolicy(req, cb) {
        return this.request("CreateCCPrecisionPolicy", req, cb);
    }
    async DescribeCCThresholdList(req, cb) {
        return this.request("DescribeCCThresholdList", req, cb);
    }
    async CreateIPAlarmThresholdConfig(req, cb) {
        return this.request("CreateIPAlarmThresholdConfig", req, cb);
    }
    async DescribeListPacketFilterConfig(req, cb) {
        return this.request("DescribeListPacketFilterConfig", req, cb);
    }
    async CreatePortAclConfig(req, cb) {
        return this.request("CreatePortAclConfig", req, cb);
    }
    async DescribeBasicDeviceStatus(req, cb) {
        return this.request("DescribeBasicDeviceStatus", req, cb);
    }
    async AssociateDDoSEipLoadBalancer(req, cb) {
        return this.request("AssociateDDoSEipLoadBalancer", req, cb);
    }
    async CreateNewL7Rules(req, cb) {
        return this.request("CreateNewL7Rules", req, cb);
    }
    async DeleteWaterPrintConfig(req, cb) {
        return this.request("DeleteWaterPrintConfig", req, cb);
    }
    async CreateCCReqLimitPolicy(req, cb) {
        return this.request("CreateCCReqLimitPolicy", req, cb);
    }
    async SwitchWaterPrintConfig(req, cb) {
        return this.request("SwitchWaterPrintConfig", req, cb);
    }
    async DescribeListProtocolBlockConfig(req, cb) {
        return this.request("DescribeListProtocolBlockConfig", req, cb);
    }
    async CreateSchedulingDomain(req, cb) {
        return this.request("CreateSchedulingDomain", req, cb);
    }
    async DisassociateDDoSEipAddress(req, cb) {
        return this.request("DisassociateDDoSEipAddress", req, cb);
    }
    async CreateProtocolBlockConfig(req, cb) {
        return this.request("CreateProtocolBlockConfig", req, cb);
    }
    async DeleteDDoSBlackWhiteIpList(req, cb) {
        return this.request("DeleteDDoSBlackWhiteIpList", req, cb);
    }
    async CreateL7RuleCerts(req, cb) {
        return this.request("CreateL7RuleCerts", req, cb);
    }
    async AssociateDDoSEipAddress(req, cb) {
        return this.request("AssociateDDoSEipAddress", req, cb);
    }
    async ModifyDomainUsrName(req, cb) {
        return this.request("ModifyDomainUsrName", req, cb);
    }
    async DescribeOverviewDDoSTrend(req, cb) {
        return this.request("DescribeOverviewDDoSTrend", req, cb);
    }
    async DeleteDDoSSpeedLimitConfig(req, cb) {
        return this.request("DeleteDDoSSpeedLimitConfig", req, cb);
    }
    async DescribeNewL7Rules(req, cb) {
        return this.request("DescribeNewL7Rules", req, cb);
    }
    async DescribeIpBlockList(req, cb) {
        return this.request("DescribeIpBlockList", req, cb);
    }
    async ModifyCCLevelPolicy(req, cb) {
        return this.request("ModifyCCLevelPolicy", req, cb);
    }
    async DescribeListBGPIPInstances(req, cb) {
        return this.request("DescribeListBGPIPInstances", req, cb);
    }
    async ModifyNewDomainRules(req, cb) {
        return this.request("ModifyNewDomainRules", req, cb);
    }
    async DescribeOverviewCCTrend(req, cb) {
        return this.request("DescribeOverviewCCTrend", req, cb);
    }
    async DescribeCCLevelPolicy(req, cb) {
        return this.request("DescribeCCLevelPolicy", req, cb);
    }
    async DescribeListSchedulingDomain(req, cb) {
        return this.request("DescribeListSchedulingDomain", req, cb);
    }
    async CreateDDoSGeoIPBlockConfig(req, cb) {
        return this.request("CreateDDoSGeoIPBlockConfig", req, cb);
    }
    async DescribeBgpBizTrend(req, cb) {
        return this.request("DescribeBgpBizTrend", req, cb);
    }
    async DescribeCCReqLimitPolicyList(req, cb) {
        return this.request("DescribeCCReqLimitPolicyList", req, cb);
    }
    async DeleteCCLevelPolicy(req, cb) {
        return this.request("DeleteCCLevelPolicy", req, cb);
    }
    async DescribeOverviewIndex(req, cb) {
        return this.request("DescribeOverviewIndex", req, cb);
    }
    async CreateDDoSSpeedLimitConfig(req, cb) {
        return this.request("CreateDDoSSpeedLimitConfig", req, cb);
    }
    async DescribeBizHttpStatus(req, cb) {
        return this.request("DescribeBizHttpStatus", req, cb);
    }
    async DescribeListBGPInstances(req, cb) {
        return this.request("DescribeListBGPInstances", req, cb);
    }
    async DeletePortAclConfig(req, cb) {
        return this.request("DeletePortAclConfig", req, cb);
    }
    async DescribeListWaterPrintConfig(req, cb) {
        return this.request("DescribeListWaterPrintConfig", req, cb);
    }
    async CreateBgpInstance(req, cb) {
        return this.request("CreateBgpInstance", req, cb);
    }
    async DescribeListDDoSGeoIPBlockConfig(req, cb) {
        return this.request("DescribeListDDoSGeoIPBlockConfig", req, cb);
    }
    async DeleteCcGeoIPBlockConfig(req, cb) {
        return this.request("DeleteCcGeoIPBlockConfig", req, cb);
    }
    async DescribeListPortAclList(req, cb) {
        return this.request("DescribeListPortAclList", req, cb);
    }
    async DescribeListListener(req, cb) {
        return this.request("DescribeListListener", req, cb);
    }
    async ModifyDDoSThreshold(req, cb) {
        return this.request("ModifyDDoSThreshold", req, cb);
    }
    async ModifyPacketFilterConfig(req, cb) {
        return this.request("ModifyPacketFilterConfig", req, cb);
    }
    async CreatePacketFilterConfig(req, cb) {
        return this.request("CreatePacketFilterConfig", req, cb);
    }
    async DescribeBgpInstances(req, cb) {
        return this.request("DescribeBgpInstances", req, cb);
    }
    async DescribeListBlackWhiteIpList(req, cb) {
        return this.request("DescribeListBlackWhiteIpList", req, cb);
    }
    async ModifyCcBlackWhiteIpList(req, cb) {
        return this.request("ModifyCcBlackWhiteIpList", req, cb);
    }
    async DescribeBizMonitorTrend(req, cb) {
        return this.request("DescribeBizMonitorTrend", req, cb);
    }
    async CreateBoundIP(req, cb) {
        return this.request("CreateBoundIP", req, cb);
    }
    async DescribeOverviewDDoSEventList(req, cb) {
        return this.request("DescribeOverviewDDoSEventList", req, cb);
    }
    async CreateDefaultAlarmThreshold(req, cb) {
        return this.request("CreateDefaultAlarmThreshold", req, cb);
    }
    async CreateWaterPrintConfig(req, cb) {
        return this.request("CreateWaterPrintConfig", req, cb);
    }
    async DescribeListDDoSAI(req, cb) {
        return this.request("DescribeListDDoSAI", req, cb);
    }
    async DescribeListDDoSSpeedLimitConfig(req, cb) {
        return this.request("DescribeListDDoSSpeedLimitConfig", req, cb);
    }
    async DescribeOverviewAttackTrend(req, cb) {
        return this.request("DescribeOverviewAttackTrend", req, cb);
    }
    async CreateBlackWhiteIpList(req, cb) {
        return this.request("CreateBlackWhiteIpList", req, cb);
    }
    async DescribeDDoSTrend(req, cb) {
        return this.request("DescribeDDoSTrend", req, cb);
    }
    async CreateDDoSAI(req, cb) {
        return this.request("CreateDDoSAI", req, cb);
    }
    async DeletePacketFilterConfig(req, cb) {
        return this.request("DeletePacketFilterConfig", req, cb);
    }
    async ModifyDDoSLevel(req, cb) {
        return this.request("ModifyDDoSLevel", req, cb);
    }
    async CreatePortAclConfigList(req, cb) {
        return this.request("CreatePortAclConfigList", req, cb);
    }
    async CreateCcGeoIPBlockConfig(req, cb) {
        return this.request("CreateCcGeoIPBlockConfig", req, cb);
    }
    async CreateCcBlackWhiteIpList(req, cb) {
        return this.request("CreateCcBlackWhiteIpList", req, cb);
    }
    async ModifyDDoSSpeedLimitConfig(req, cb) {
        return this.request("ModifyDDoSSpeedLimitConfig", req, cb);
    }
    async DescribeBizTrend(req, cb) {
        return this.request("DescribeBizTrend", req, cb);
    }
    async DeleteDDoSGeoIPBlockConfig(req, cb) {
        return this.request("DeleteDDoSGeoIPBlockConfig", req, cb);
    }
    async DescribeCCPrecisionPlyList(req, cb) {
        return this.request("DescribeCCPrecisionPlyList", req, cb);
    }
    async ModifyPortAclConfig(req, cb) {
        return this.request("ModifyPortAclConfig", req, cb);
    }
    async ModifyCCThresholdPolicy(req, cb) {
        return this.request("ModifyCCThresholdPolicy", req, cb);
    }
    async DeleteCCThresholdPolicy(req, cb) {
        return this.request("DeleteCCThresholdPolicy", req, cb);
    }
    async DeleteWaterPrintKey(req, cb) {
        return this.request("DeleteWaterPrintKey", req, cb);
    }
    async CreateDDoSBlackWhiteIpList(req, cb) {
        return this.request("CreateDDoSBlackWhiteIpList", req, cb);
    }
    async DescribeCCTrend(req, cb) {
        return this.request("DescribeCCTrend", req, cb);
    }
    async DeleteCcBlackWhiteIpList(req, cb) {
        return this.request("DeleteCcBlackWhiteIpList", req, cb);
    }
    async DeleteCCPrecisionPolicy(req, cb) {
        return this.request("DeleteCCPrecisionPolicy", req, cb);
    }
    async DescribeDDoSBlackWhiteIpList(req, cb) {
        return this.request("DescribeDDoSBlackWhiteIpList", req, cb);
    }
    async CreateDDoSConnectLimit(req, cb) {
        return this.request("CreateDDoSConnectLimit", req, cb);
    }
    async ModifyCCPrecisionPolicy(req, cb) {
        return this.request("ModifyCCPrecisionPolicy", req, cb);
    }
    async DescribeCcGeoIPBlockConfigList(req, cb) {
        return this.request("DescribeCcGeoIPBlockConfigList", req, cb);
    }
    async CreateWaterPrintKey(req, cb) {
        return this.request("CreateWaterPrintKey", req, cb);
    }
    async ModifyDDoSGeoIPBlockConfig(req, cb) {
        return this.request("ModifyDDoSGeoIPBlockConfig", req, cb);
    }
    async DeleteCCRequestLimitPolicy(req, cb) {
        return this.request("DeleteCCRequestLimitPolicy", req, cb);
    }
}
