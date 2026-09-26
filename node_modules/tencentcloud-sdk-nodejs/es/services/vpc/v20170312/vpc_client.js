import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vpc.tencentcloudapi.com", "2017-03-12", clientConfig);
    }
    async AssociateDirectConnectGatewayNatGateway(req, cb) {
        return this.request("AssociateDirectConnectGatewayNatGateway", req, cb);
    }
    async ModifyNatGatewayAttribute(req, cb) {
        return this.request("ModifyNatGatewayAttribute", req, cb);
    }
    async DescribeTaskResult(req, cb) {
        return this.request("DescribeTaskResult", req, cb);
    }
    async DescribeRouteTables(req, cb) {
        return this.request("DescribeRouteTables", req, cb);
    }
    async RemoveBandwidthPackageResources(req, cb) {
        return this.request("RemoveBandwidthPackageResources", req, cb);
    }
    async DescribeInstanceJumbo(req, cb) {
        return this.request("DescribeInstanceJumbo", req, cb);
    }
    async ModifyServiceTemplateGroupAttribute(req, cb) {
        return this.request("ModifyServiceTemplateGroupAttribute", req, cb);
    }
    async ModifyAddressInternetChargeType(req, cb) {
        return this.request("ModifyAddressInternetChargeType", req, cb);
    }
    async ModifyIPv6AddressesAttributes(req, cb) {
        return this.request("ModifyIPv6AddressesAttributes", req, cb);
    }
    async AssociateHaVipInstance(req, cb) {
        return this.request("AssociateHaVipInstance", req, cb);
    }
    async ModifyTrafficMirrorFilterRules(req, cb) {
        return this.request("ModifyTrafficMirrorFilterRules", req, cb);
    }
    async AcceptVpcPeeringConnection(req, cb) {
        return this.request("AcceptVpcPeeringConnection", req, cb);
    }
    async EnableGatewayFlowMonitor(req, cb) {
        return this.request("EnableGatewayFlowMonitor", req, cb);
    }
    async CreateCcnPolicyBasedRoutingNextHop(req, cb) {
        return this.request("CreateCcnPolicyBasedRoutingNextHop", req, cb);
    }
    async DescribeAddresses(req, cb) {
        return this.request("DescribeAddresses", req, cb);
    }
    async CheckGatewayFlowMonitor(req, cb) {
        return this.request("CheckGatewayFlowMonitor", req, cb);
    }
    async CreateCcnRouteTables(req, cb) {
        return this.request("CreateCcnRouteTables", req, cb);
    }
    async ReplaceCcnRouteTableBroadcastPolicys(req, cb) {
        return this.request("ReplaceCcnRouteTableBroadcastPolicys", req, cb);
    }
    async ModifyVpnGatewaySslClientCert(req, cb) {
        return this.request("ModifyVpnGatewaySslClientCert", req, cb);
    }
    async ModifyVpnGatewaySslServer(req, cb) {
        return this.request("ModifyVpnGatewaySslServer", req, cb);
    }
    async DescribeSpecificTrafficPackageUsedDetails(req, cb) {
        return this.request("DescribeSpecificTrafficPackageUsedDetails", req, cb);
    }
    async ReplaceRouteTableAssociation(req, cb) {
        return this.request("ReplaceRouteTableAssociation", req, cb);
    }
    async DeleteTrafficPackages(req, cb) {
        return this.request("DeleteTrafficPackages", req, cb);
    }
    async DescribeTemplateLimits(req, cb) {
        return this.request("DescribeTemplateLimits", req, cb);
    }
    async CheckNetDetectState(req, cb) {
        return this.request("CheckNetDetectState", req, cb);
    }
    async InquiryPriceResetVpnGatewayInternetMaxBandwidth(req, cb) {
        return this.request("InquiryPriceResetVpnGatewayInternetMaxBandwidth", req, cb);
    }
    async DescribeNetworkAccountType(req, cb) {
        return this.request("DescribeNetworkAccountType", req, cb);
    }
    async ModifyAddressesBandwidth(req, cb) {
        return this.request("ModifyAddressesBandwidth", req, cb);
    }
    async CreateSubnet(req, cb) {
        return this.request("CreateSubnet", req, cb);
    }
    async CreateVpnGatewaySslClient(req, cb) {
        return this.request("CreateVpnGatewaySslClient", req, cb);
    }
    async AllocateIp6AddressesBandwidth(req, cb) {
        return this.request("AllocateIp6AddressesBandwidth", req, cb);
    }
    async LockCcnBandwidths(req, cb) {
        return this.request("LockCcnBandwidths", req, cb);
    }
    async DeleteServiceTemplateGroup(req, cb) {
        return this.request("DeleteServiceTemplateGroup", req, cb);
    }
    async AddBandwidthPackageResources(req, cb) {
        return this.request("AddBandwidthPackageResources", req, cb);
    }
    async ReplaceRoutePolicyEntries(req, cb) {
        return this.request("ReplaceRoutePolicyEntries", req, cb);
    }
    async AllocateAddresses(req, cb) {
        return this.request("AllocateAddresses", req, cb);
    }
    async DeleteCdcLDCXList(req, cb) {
        return this.request("DeleteCdcLDCXList", req, cb);
    }
    async DescribeIp6Addresses(req, cb) {
        return this.request("DescribeIp6Addresses", req, cb);
    }
    async CreatePrivateNatGateway(req, cb) {
        return this.request("CreatePrivateNatGateway", req, cb);
    }
    async DeleteNetworkAclQuintupleEntries(req, cb) {
        return this.request("DeleteNetworkAclQuintupleEntries", req, cb);
    }
    async DeleteDirectConnectGateway(req, cb) {
        return this.request("DeleteDirectConnectGateway", req, cb);
    }
    async CreateNetworkInterface(req, cb) {
        return this.request("CreateNetworkInterface", req, cb);
    }
    async DescribeNetDetectStates(req, cb) {
        return this.request("DescribeNetDetectStates", req, cb);
    }
    async ModifyCdcNetPlaneAttribute(req, cb) {
        return this.request("ModifyCdcNetPlaneAttribute", req, cb);
    }
    async DescribeCcns(req, cb) {
        return this.request("DescribeCcns", req, cb);
    }
    async DeleteCcn(req, cb) {
        return this.request("DeleteCcn", req, cb);
    }
    async ModifyNetworkAclEntries(req, cb) {
        return this.request("ModifyNetworkAclEntries", req, cb);
    }
    async DescribeCcnRouteTables(req, cb) {
        return this.request("DescribeCcnRouteTables", req, cb);
    }
    async DetachNetworkInterface(req, cb) {
        return this.request("DetachNetworkInterface", req, cb);
    }
    async ModifyNetworkAclQuintupleEntries(req, cb) {
        return this.request("ModifyNetworkAclQuintupleEntries", req, cb);
    }
    async DeleteAssistantCidr(req, cb) {
        return this.request("DeleteAssistantCidr", req, cb);
    }
    async DescribeRoutePolicyEntries(req, cb) {
        return this.request("DescribeRoutePolicyEntries", req, cb);
    }
    async DeleteCcnPolicyBasedRoutingNextHop(req, cb) {
        return this.request("DeleteCcnPolicyBasedRoutingNextHop", req, cb);
    }
    async DeleteRoutePolicyAssociations(req, cb) {
        return this.request("DeleteRoutePolicyAssociations", req, cb);
    }
    async DeleteHaVip(req, cb) {
        return this.request("DeleteHaVip", req, cb);
    }
    async DeleteNetworkInterface(req, cb) {
        return this.request("DeleteNetworkInterface", req, cb);
    }
    async ModifyLocalGateway(req, cb) {
        return this.request("ModifyLocalGateway", req, cb);
    }
    async DescribeSubnetResourceDashboard(req, cb) {
        return this.request("DescribeSubnetResourceDashboard", req, cb);
    }
    async DescribeFlowLog(req, cb) {
        return this.request("DescribeFlowLog", req, cb);
    }
    async AssociateInstancesToCcnRouteTable(req, cb) {
        return this.request("AssociateInstancesToCcnRouteTable", req, cb);
    }
    async RenewAddresses(req, cb) {
        return this.request("RenewAddresses", req, cb);
    }
    async DescribeCcnRegionBandwidthLimits(req, cb) {
        return this.request("DescribeCcnRegionBandwidthLimits", req, cb);
    }
    async AddIp6Rules(req, cb) {
        return this.request("AddIp6Rules", req, cb);
    }
    async DisassociateDirectConnectGatewayNatGateway(req, cb) {
        return this.request("DisassociateDirectConnectGatewayNatGateway", req, cb);
    }
    async DescribeUsedIpAddress(req, cb) {
        return this.request("DescribeUsedIpAddress", req, cb);
    }
    async DescribeCcnRoutes(req, cb) {
        return this.request("DescribeCcnRoutes", req, cb);
    }
    async ReplaceDirectConnectGatewayCcnRoutes(req, cb) {
        return this.request("ReplaceDirectConnectGatewayCcnRoutes", req, cb);
    }
    async GetCcnRegionBandwidthLimits(req, cb) {
        return this.request("GetCcnRegionBandwidthLimits", req, cb);
    }
    async AddTemplateMember(req, cb) {
        return this.request("AddTemplateMember", req, cb);
    }
    async DescribeAddressBandwidthRange(req, cb) {
        return this.request("DescribeAddressBandwidthRange", req, cb);
    }
    async DeleteAddressTemplate(req, cb) {
        return this.request("DeleteAddressTemplate", req, cb);
    }
    async MigrateBandwidthPackageResources(req, cb) {
        return this.request("MigrateBandwidthPackageResources", req, cb);
    }
    async WithdrawNotifyRoutes(req, cb) {
        return this.request("WithdrawNotifyRoutes", req, cb);
    }
    async CreateCdcNetPlanes(req, cb) {
        return this.request("CreateCdcNetPlanes", req, cb);
    }
    async DeleteRoutes(req, cb) {
        return this.request("DeleteRoutes", req, cb);
    }
    async InquiryPriceCreateVpnGateway(req, cb) {
        return this.request("InquiryPriceCreateVpnGateway", req, cb);
    }
    async DeleteHighPriorityRouteTables(req, cb) {
        return this.request("DeleteHighPriorityRouteTables", req, cb);
    }
    async DescribeCrossBorderCompliance(req, cb) {
        return this.request("DescribeCrossBorderCompliance", req, cb);
    }
    async CreateSecurityGroup(req, cb) {
        return this.request("CreateSecurityGroup", req, cb);
    }
    async ModifyNetworkInterfaceAttribute(req, cb) {
        return this.request("ModifyNetworkInterfaceAttribute", req, cb);
    }
    async ModifyRoutePolicyAttribute(req, cb) {
        return this.request("ModifyRoutePolicyAttribute", req, cb);
    }
    async ModifyVpcPeeringConnection(req, cb) {
        return this.request("ModifyVpcPeeringConnection", req, cb);
    }
    async DescribeTrafficMirrorFilterRules(req, cb) {
        return this.request("DescribeTrafficMirrorFilterRules", req, cb);
    }
    async DeleteRoutePolicyEntries(req, cb) {
        return this.request("DeleteRoutePolicyEntries", req, cb);
    }
    async DescribeVpcLimits(req, cb) {
        return this.request("DescribeVpcLimits", req, cb);
    }
    async DescribeSnapshotAttachedInstances(req, cb) {
        return this.request("DescribeSnapshotAttachedInstances", req, cb);
    }
    async DeleteTrafficMirror(req, cb) {
        return this.request("DeleteTrafficMirror", req, cb);
    }
    async ModifyCcnPolicyBasedRoutingNextHopAttribute(req, cb) {
        return this.request("ModifyCcnPolicyBasedRoutingNextHopAttribute", req, cb);
    }
    async DescribeProductQuota(req, cb) {
        return this.request("DescribeProductQuota", req, cb);
    }
    async ModifyBandwidthPackageAttribute(req, cb) {
        return this.request("ModifyBandwidthPackageAttribute", req, cb);
    }
    async CreateVpnGatewaySslServer(req, cb) {
        return this.request("CreateVpnGatewaySslServer", req, cb);
    }
    async ModifyVpnGatewayAttribute(req, cb) {
        return this.request("ModifyVpnGatewayAttribute", req, cb);
    }
    async DeleteVpc(req, cb) {
        return this.request("DeleteVpc", req, cb);
    }
    async DescribeSubnets(req, cb) {
        return this.request("DescribeSubnets", req, cb);
    }
    async DescribeGlobalRoutes(req, cb) {
        return this.request("DescribeGlobalRoutes", req, cb);
    }
    async ModifyPrivateNatGatewayTranslationAclRule(req, cb) {
        return this.request("ModifyPrivateNatGatewayTranslationAclRule", req, cb);
    }
    async DescribeDesignatedZones(req, cb) {
        return this.request("DescribeDesignatedZones", req, cb);
    }
    async DescribeAddressTemplateInstances(req, cb) {
        return this.request("DescribeAddressTemplateInstances", req, cb);
    }
    async ReplaceCcnRouteTableInputPolicys(req, cb) {
        return this.request("ReplaceCcnRouteTableInputPolicys", req, cb);
    }
    async CreateDirectConnectGateway(req, cb) {
        return this.request("CreateDirectConnectGateway", req, cb);
    }
    async DetachCcnInstances(req, cb) {
        return this.request("DetachCcnInstances", req, cb);
    }
    async CreateReserveIpAddresses(req, cb) {
        return this.request("CreateReserveIpAddresses", req, cb);
    }
    async EnableRoutes(req, cb) {
        return this.request("EnableRoutes", req, cb);
    }
    async SetCcnRegionBandwidthLimits(req, cb) {
        return this.request("SetCcnRegionBandwidthLimits", req, cb);
    }
    async ModifyRouteTableAttribute(req, cb) {
        return this.request("ModifyRouteTableAttribute", req, cb);
    }
    async ModifyHaVipAttribute(req, cb) {
        return this.request("ModifyHaVipAttribute", req, cb);
    }
    async ReleaseAddresses(req, cb) {
        return this.request("ReleaseAddresses", req, cb);
    }
    async DescribeReserveIpAddresses(req, cb) {
        return this.request("DescribeReserveIpAddresses", req, cb);
    }
    async DescribeBandwidthPackageBandwidthRange(req, cb) {
        return this.request("DescribeBandwidthPackageBandwidthRange", req, cb);
    }
    async ReplaceRoutes(req, cb) {
        return this.request("ReplaceRoutes", req, cb);
    }
    async DescribeVpcPrivateIpAddresses(req, cb) {
        return this.request("DescribeVpcPrivateIpAddresses", req, cb);
    }
    async ModifyIp6Translator(req, cb) {
        return this.request("ModifyIp6Translator", req, cb);
    }
    async DescribeAddressTemplates(req, cb) {
        return this.request("DescribeAddressTemplates", req, cb);
    }
    async CreateVpnConnection(req, cb) {
        return this.request("CreateVpnConnection", req, cb);
    }
    async TransformAddress(req, cb) {
        return this.request("TransformAddress", req, cb);
    }
    async DescribeVpcEndPoint(req, cb) {
        return this.request("DescribeVpcEndPoint", req, cb);
    }
    async DescribeIp6TranslatorQuota(req, cb) {
        return this.request("DescribeIp6TranslatorQuota", req, cb);
    }
    async CreateVpcEndPointServiceWhiteList(req, cb) {
        return this.request("CreateVpcEndPointServiceWhiteList", req, cb);
    }
    async DownloadCustomerGatewayConfiguration(req, cb) {
        return this.request("DownloadCustomerGatewayConfiguration", req, cb);
    }
    async DescribeCustomerGateways(req, cb) {
        return this.request("DescribeCustomerGateways", req, cb);
    }
    async DescribeNetworkAcls(req, cb) {
        return this.request("DescribeNetworkAcls", req, cb);
    }
    async DescribeServiceTemplateGroups(req, cb) {
        return this.request("DescribeServiceTemplateGroups", req, cb);
    }
    async AssignIpv6CidrBlock(req, cb) {
        return this.request("AssignIpv6CidrBlock", req, cb);
    }
    async DescribeNatGatewayDestinationIpPortTranslationNatRules(req, cb) {
        return this.request("DescribeNatGatewayDestinationIpPortTranslationNatRules", req, cb);
    }
    async DescribeCcnAttachedInstances(req, cb) {
        return this.request("DescribeCcnAttachedInstances", req, cb);
    }
    async DescribePrivateNatGatewayRegions(req, cb) {
        return this.request("DescribePrivateNatGatewayRegions", req, cb);
    }
    async ModifyReserveIpAddress(req, cb) {
        return this.request("ModifyReserveIpAddress", req, cb);
    }
    async DisassociateNatGatewayAddress(req, cb) {
        return this.request("DisassociateNatGatewayAddress", req, cb);
    }
    async ModifyPrivateIpAddressesAttribute(req, cb) {
        return this.request("ModifyPrivateIpAddressesAttribute", req, cb);
    }
    async DescribeGatewayFlowMonitorDetail(req, cb) {
        return this.request("DescribeGatewayFlowMonitorDetail", req, cb);
    }
    async UnassignIpv6Addresses(req, cb) {
        return this.request("UnassignIpv6Addresses", req, cb);
    }
    async ResetRoutePolicyEntries(req, cb) {
        return this.request("ResetRoutePolicyEntries", req, cb);
    }
    async AssociateIPv6Address(req, cb) {
        return this.request("AssociateIPv6Address", req, cb);
    }
    async DeleteAddressTemplateGroup(req, cb) {
        return this.request("DeleteAddressTemplateGroup", req, cb);
    }
    async DescribeVpcTaskResult(req, cb) {
        return this.request("DescribeVpcTaskResult", req, cb);
    }
    async ModifyNetworkInterfaceQos(req, cb) {
        return this.request("ModifyNetworkInterfaceQos", req, cb);
    }
    async ModifyGlobalRoutes(req, cb) {
        return this.request("ModifyGlobalRoutes", req, cb);
    }
    async AssociateNatGatewayAddress(req, cb) {
        return this.request("AssociateNatGatewayAddress", req, cb);
    }
    async DeleteCcnRouteTables(req, cb) {
        return this.request("DeleteCcnRouteTables", req, cb);
    }
    async ModifyPrivateNatGatewayTranslationNatRule(req, cb) {
        return this.request("ModifyPrivateNatGatewayTranslationNatRule", req, cb);
    }
    async ModifyVpnGatewayRoutes(req, cb) {
        return this.request("ModifyVpnGatewayRoutes", req, cb);
    }
    async ReplaceRoutePolicyAssociations(req, cb) {
        return this.request("ReplaceRoutePolicyAssociations", req, cb);
    }
    async CheckTrafficMirror(req, cb) {
        return this.request("CheckTrafficMirror", req, cb);
    }
    async DescribeVpcEndPointService(req, cb) {
        return this.request("DescribeVpcEndPointService", req, cb);
    }
    async DescribeCrossBorderCcnRegionBandwidthLimits(req, cb) {
        return this.request("DescribeCrossBorderCcnRegionBandwidthLimits", req, cb);
    }
    async ModifySnapshotPolicies(req, cb) {
        return this.request("ModifySnapshotPolicies", req, cb);
    }
    async DisassociateHaVipInstance(req, cb) {
        return this.request("DisassociateHaVipInstance", req, cb);
    }
    async DeleteVpnGatewaySslClient(req, cb) {
        return this.request("DeleteVpnGatewaySslClient", req, cb);
    }
    async CreateNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("CreateNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async ModifyAddressTemplateAttribute(req, cb) {
        return this.request("ModifyAddressTemplateAttribute", req, cb);
    }
    async DeleteTemplateMember(req, cb) {
        return this.request("DeleteTemplateMember", req, cb);
    }
    async AssignIpv6SubnetCidrBlock(req, cb) {
        return this.request("AssignIpv6SubnetCidrBlock", req, cb);
    }
    async DescribeVpnGatewayCcnRoutes(req, cb) {
        return this.request("DescribeVpnGatewayCcnRoutes", req, cb);
    }
    async DeleteRoutePolicy(req, cb) {
        return this.request("DeleteRoutePolicy", req, cb);
    }
    async DeleteCcnPolicyBasedRoutingRule(req, cb) {
        return this.request("DeleteCcnPolicyBasedRoutingRule", req, cb);
    }
    async AttachCcnInstances(req, cb) {
        return this.request("AttachCcnInstances", req, cb);
    }
    async DeleteSubnet(req, cb) {
        return this.request("DeleteSubnet", req, cb);
    }
    async AttachClassicLinkVpc(req, cb) {
        return this.request("AttachClassicLinkVpc", req, cb);
    }
    async ModifyTemplateMember(req, cb) {
        return this.request("ModifyTemplateMember", req, cb);
    }
    async DescribeTrafficPackages(req, cb) {
        return this.request("DescribeTrafficPackages", req, cb);
    }
    async CreateVpcEndPointService(req, cb) {
        return this.request("CreateVpcEndPointService", req, cb);
    }
    async ResetVpnConnection(req, cb) {
        return this.request("ResetVpnConnection", req, cb);
    }
    async ModifyVpnGatewayCcnRoutes(req, cb) {
        return this.request("ModifyVpnGatewayCcnRoutes", req, cb);
    }
    async DeleteGlobalRoutes(req, cb) {
        return this.request("DeleteGlobalRoutes", req, cb);
    }
    async DeletePrivateNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("DeletePrivateNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async ModifyDhcpIpAttribute(req, cb) {
        return this.request("ModifyDhcpIpAttribute", req, cb);
    }
    async DescribeBandwidthPackageResources(req, cb) {
        return this.request("DescribeBandwidthPackageResources", req, cb);
    }
    async DescribeVpcPeeringConnections(req, cb) {
        return this.request("DescribeVpcPeeringConnections", req, cb);
    }
    async CreateHighPriorityRouteTable(req, cb) {
        return this.request("CreateHighPriorityRouteTable", req, cb);
    }
    async InquiryPriceRenewAddresses(req, cb) {
        return this.request("InquiryPriceRenewAddresses", req, cb);
    }
    async ModifyGatewayFlowQos(req, cb) {
        return this.request("ModifyGatewayFlowQos", req, cb);
    }
    async DescribeRouteConflicts(req, cb) {
        return this.request("DescribeRouteConflicts", req, cb);
    }
    async CreateDefaultSecurityGroup(req, cb) {
        return this.request("CreateDefaultSecurityGroup", req, cb);
    }
    async AssociateDhcpIpWithAddressIp(req, cb) {
        return this.request("AssociateDhcpIpWithAddressIp", req, cb);
    }
    async DeleteServiceTemplate(req, cb) {
        return this.request("DeleteServiceTemplate", req, cb);
    }
    async UnassignPrivateIpAddresses(req, cb) {
        return this.request("UnassignPrivateIpAddresses", req, cb);
    }
    async ModifyAddressTemplateGroupAttribute(req, cb) {
        return this.request("ModifyAddressTemplateGroupAttribute", req, cb);
    }
    async CreateIp6Translators(req, cb) {
        return this.request("CreateIp6Translators", req, cb);
    }
    async CreateDefaultVpc(req, cb) {
        return this.request("CreateDefaultVpc", req, cb);
    }
    async AttachNetworkInterface(req, cb) {
        return this.request("AttachNetworkInterface", req, cb);
    }
    async DeleteSecurityGroupPolicies(req, cb) {
        return this.request("DeleteSecurityGroupPolicies", req, cb);
    }
    async DescribeNetworkAclQuintupleEntries(req, cb) {
        return this.request("DescribeNetworkAclQuintupleEntries", req, cb);
    }
    async CreateCcnPolicyBasedRoutingRules(req, cb) {
        return this.request("CreateCcnPolicyBasedRoutingRules", req, cb);
    }
    async ModifySecurityGroupAttribute(req, cb) {
        return this.request("ModifySecurityGroupAttribute", req, cb);
    }
    async DeletePrivateNatGatewayTranslationAclRule(req, cb) {
        return this.request("DeletePrivateNatGatewayTranslationAclRule", req, cb);
    }
    async DescribePrivateNatGatewayTranslationAclRules(req, cb) {
        return this.request("DescribePrivateNatGatewayTranslationAclRules", req, cb);
    }
    async UnlockCcns(req, cb) {
        return this.request("UnlockCcns", req, cb);
    }
    async DisableFlowLogs(req, cb) {
        return this.request("DisableFlowLogs", req, cb);
    }
    async ResetTrafficMirrorFilter(req, cb) {
        return this.request("ResetTrafficMirrorFilter", req, cb);
    }
    async CreateCustomerGateway(req, cb) {
        return this.request("CreateCustomerGateway", req, cb);
    }
    async CreateTrafficMirror(req, cb) {
        return this.request("CreateTrafficMirror", req, cb);
    }
    async AuditCrossBorderCompliance(req, cb) {
        return this.request("AuditCrossBorderCompliance", req, cb);
    }
    async DescribeVpcInstances(req, cb) {
        return this.request("DescribeVpcInstances", req, cb);
    }
    async DescribeVpnGatewaySslServers(req, cb) {
        return this.request("DescribeVpnGatewaySslServers", req, cb);
    }
    async DeleteRouteTable(req, cb) {
        return this.request("DeleteRouteTable", req, cb);
    }
    async DescribeAccountAttributes(req, cb) {
        return this.request("DescribeAccountAttributes", req, cb);
    }
    async AssignIpv6Addresses(req, cb) {
        return this.request("AssignIpv6Addresses", req, cb);
    }
    async DescribeRouteTableSelectionPolicies(req, cb) {
        return this.request("DescribeRouteTableSelectionPolicies", req, cb);
    }
    async DescribeIpGeolocationInfos(req, cb) {
        return this.request("DescribeIpGeolocationInfos", req, cb);
    }
    async UnassignIpv6CidrBlock(req, cb) {
        return this.request("UnassignIpv6CidrBlock", req, cb);
    }
    async CreateNatGatewaySourceIpTranslationNatRule(req, cb) {
        return this.request("CreateNatGatewaySourceIpTranslationNatRule", req, cb);
    }
    async RemoveIp6Rules(req, cb) {
        return this.request("RemoveIp6Rules", req, cb);
    }
    async DescribeCdcLDCXList(req, cb) {
        return this.request("DescribeCdcLDCXList", req, cb);
    }
    async RejectVpcPeeringConnection(req, cb) {
        return this.request("RejectVpcPeeringConnection", req, cb);
    }
    async DescribeServiceTemplateInstances(req, cb) {
        return this.request("DescribeServiceTemplateInstances", req, cb);
    }
    async CreateAddressTemplate(req, cb) {
        return this.request("CreateAddressTemplate", req, cb);
    }
    async ModifyCustomerGatewayAttribute(req, cb) {
        return this.request("ModifyCustomerGatewayAttribute", req, cb);
    }
    async EnableCcnRoutes(req, cb) {
        return this.request("EnableCcnRoutes", req, cb);
    }
    async CreatePrivateNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("CreatePrivateNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async DeleteSecurityGroup(req, cb) {
        return this.request("DeleteSecurityGroup", req, cb);
    }
    async DescribeNatGatewaySourceIpTranslationNatRules(req, cb) {
        return this.request("DescribeNatGatewaySourceIpTranslationNatRules", req, cb);
    }
    async ModifyNetDetect(req, cb) {
        return this.request("ModifyNetDetect", req, cb);
    }
    async DescribeBandwidthPackageQuota(req, cb) {
        return this.request("DescribeBandwidthPackageQuota", req, cb);
    }
    async CreateSnapshotPolicies(req, cb) {
        return this.request("CreateSnapshotPolicies", req, cb);
    }
    async ResetAttachCcnInstances(req, cb) {
        return this.request("ResetAttachCcnInstances", req, cb);
    }
    async ModifyVpcEndPointServiceAttribute(req, cb) {
        return this.request("ModifyVpcEndPointServiceAttribute", req, cb);
    }
    async DescribeBandwidthPackages(req, cb) {
        return this.request("DescribeBandwidthPackages", req, cb);
    }
    async DescribeRouteTableAssociatedInstances(req, cb) {
        return this.request("DescribeRouteTableAssociatedInstances", req, cb);
    }
    async CreateServiceTemplateGroup(req, cb) {
        return this.request("CreateServiceTemplateGroup", req, cb);
    }
    async ReleaseIp6AddressesBandwidth(req, cb) {
        return this.request("ReleaseIp6AddressesBandwidth", req, cb);
    }
    async ModifyCcnAttribute(req, cb) {
        return this.request("ModifyCcnAttribute", req, cb);
    }
    async InquirePriceCreateDirectConnectGateway(req, cb) {
        return this.request("InquirePriceCreateDirectConnectGateway", req, cb);
    }
    async DescribeAddressTemplateGroups(req, cb) {
        return this.request("DescribeAddressTemplateGroups", req, cb);
    }
    async DetachClassicLinkVpc(req, cb) {
        return this.request("DetachClassicLinkVpc", req, cb);
    }
    async CreateSecurityGroupPolicies(req, cb) {
        return this.request("CreateSecurityGroupPolicies", req, cb);
    }
    async ResetNatGatewayConnection(req, cb) {
        return this.request("ResetNatGatewayConnection", req, cb);
    }
    async AttachSnapshotInstances(req, cb) {
        return this.request("AttachSnapshotInstances", req, cb);
    }
    async DescribeVpcResourceDashboard(req, cb) {
        return this.request("DescribeVpcResourceDashboard", req, cb);
    }
    async ReplaceSecurityGroupPolicy(req, cb) {
        return this.request("ReplaceSecurityGroupPolicy", req, cb);
    }
    async AdjustPublicAddress(req, cb) {
        return this.request("AdjustPublicAddress", req, cb);
    }
    async CreateNetworkAcl(req, cb) {
        return this.request("CreateNetworkAcl", req, cb);
    }
    async UpdateTrafficMirrorAllFilter(req, cb) {
        return this.request("UpdateTrafficMirrorAllFilter", req, cb);
    }
    async CreateBandwidthPackage(req, cb) {
        return this.request("CreateBandwidthPackage", req, cb);
    }
    async DeleteFlowLog(req, cb) {
        return this.request("DeleteFlowLog", req, cb);
    }
    async GenerateVpnConnectionDefaultHealthCheckIp(req, cb) {
        return this.request("GenerateVpnConnectionDefaultHealthCheckIp", req, cb);
    }
    async CreateRoutePolicyAssociations(req, cb) {
        return this.request("CreateRoutePolicyAssociations", req, cb);
    }
    async DeleteVpnGatewaySslServer(req, cb) {
        return this.request("DeleteVpnGatewaySslServer", req, cb);
    }
    async DescribeNetworkInterfaceLimit(req, cb) {
        return this.request("DescribeNetworkInterfaceLimit", req, cb);
    }
    async EnableSnapshotPolicies(req, cb) {
        return this.request("EnableSnapshotPolicies", req, cb);
    }
    async DeleteVpnConnection(req, cb) {
        return this.request("DeleteVpnConnection", req, cb);
    }
    async DescribeCustomerGatewayVendors(req, cb) {
        return this.request("DescribeCustomerGatewayVendors", req, cb);
    }
    async DeleteCdcNetPlanes(req, cb) {
        return this.request("DeleteCdcNetPlanes", req, cb);
    }
    async DeleteLocalGateway(req, cb) {
        return this.request("DeleteLocalGateway", req, cb);
    }
    async ModifyServiceTemplateAttribute(req, cb) {
        return this.request("ModifyServiceTemplateAttribute", req, cb);
    }
    async DisassociateNetworkAclSubnets(req, cb) {
        return this.request("DisassociateNetworkAclSubnets", req, cb);
    }
    async ModifyPrivateNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("ModifyPrivateNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async DescribeVpnGatewayRoutes(req, cb) {
        return this.request("DescribeVpnGatewayRoutes", req, cb);
    }
    async ReplaceSecurityGroupPolicies(req, cb) {
        return this.request("ReplaceSecurityGroupPolicies", req, cb);
    }
    async DescribeTrafficMirrors(req, cb) {
        return this.request("DescribeTrafficMirrors", req, cb);
    }
    async CreateDirectConnectGatewayCcnRoutes(req, cb) {
        return this.request("CreateDirectConnectGatewayCcnRoutes", req, cb);
    }
    async AssignPrivateIpAddresses(req, cb) {
        return this.request("AssignPrivateIpAddresses", req, cb);
    }
    async DescribeCrossBorderFlowMonitor(req, cb) {
        return this.request("DescribeCrossBorderFlowMonitor", req, cb);
    }
    async CreateSubnets(req, cb) {
        return this.request("CreateSubnets", req, cb);
    }
    async CreateVpcPeeringConnection(req, cb) {
        return this.request("CreateVpcPeeringConnection", req, cb);
    }
    async DeleteDirectConnectGatewayCcnRoutes(req, cb) {
        return this.request("DeleteDirectConnectGatewayCcnRoutes", req, cb);
    }
    async RejectAttachCcnInstances(req, cb) {
        return this.request("RejectAttachCcnInstances", req, cb);
    }
    async DescribeVpnConnections(req, cb) {
        return this.request("DescribeVpnConnections", req, cb);
    }
    async DeleteDhcpIp(req, cb) {
        return this.request("DeleteDhcpIp", req, cb);
    }
    async DescribePrivateNatGatewayDestinationIpPortTranslationNatRules(req, cb) {
        return this.request("DescribePrivateNatGatewayDestinationIpPortTranslationNatRules", req, cb);
    }
    async DescribeHighPriorityRoutes(req, cb) {
        return this.request("DescribeHighPriorityRoutes", req, cb);
    }
    async DisassociateAddress(req, cb) {
        return this.request("DisassociateAddress", req, cb);
    }
    async CreateTrafficMirrorFilterRules(req, cb) {
        return this.request("CreateTrafficMirrorFilterRules", req, cb);
    }
    async ModifyIp6Rule(req, cb) {
        return this.request("ModifyIp6Rule", req, cb);
    }
    async DescribeVpcIpv6Addresses(req, cb) {
        return this.request("DescribeVpcIpv6Addresses", req, cb);
    }
    async UnlockCcnBandwidths(req, cb) {
        return this.request("UnlockCcnBandwidths", req, cb);
    }
    async DeleteCustomerGateway(req, cb) {
        return this.request("DeleteCustomerGateway", req, cb);
    }
    async DescribeLocalGateway(req, cb) {
        return this.request("DescribeLocalGateway", req, cb);
    }
    async DescribeNetDetects(req, cb) {
        return this.request("DescribeNetDetects", req, cb);
    }
    async DescribeBandwidthPackageBillUsage(req, cb) {
        return this.request("DescribeBandwidthPackageBillUsage", req, cb);
    }
    async ModifyCcnRouteTables(req, cb) {
        return this.request("ModifyCcnRouteTables", req, cb);
    }
    async ModifyAddressesRenewFlag(req, cb) {
        return this.request("ModifyAddressesRenewFlag", req, cb);
    }
    async ModifyHighPriorityRouteECMPAlgorithm(req, cb) {
        return this.request("ModifyHighPriorityRouteECMPAlgorithm", req, cb);
    }
    async DeleteNatGatewaySourceIpTranslationNatRule(req, cb) {
        return this.request("DeleteNatGatewaySourceIpTranslationNatRule", req, cb);
    }
    async DisassociateIPv6Address(req, cb) {
        return this.request("DisassociateIPv6Address", req, cb);
    }
    async ModifyNatGatewaySourceIpTranslationNatRule(req, cb) {
        return this.request("ModifyNatGatewaySourceIpTranslationNatRule", req, cb);
    }
    async DescribeServiceTemplateGroupInstances(req, cb) {
        return this.request("DescribeServiceTemplateGroupInstances", req, cb);
    }
    async UnassignIpv6SubnetCidrBlock(req, cb) {
        return this.request("UnassignIpv6SubnetCidrBlock", req, cb);
    }
    async DisableRoutes(req, cb) {
        return this.request("DisableRoutes", req, cb);
    }
    async EnableVpnGatewaySslClientCert(req, cb) {
        return this.request("EnableVpnGatewaySslClientCert", req, cb);
    }
    async CreateAssistantCidr(req, cb) {
        return this.request("CreateAssistantCidr", req, cb);
    }
    async ModifyCcnPolicyBasedRoutingRuleAttribute(req, cb) {
        return this.request("ModifyCcnPolicyBasedRoutingRuleAttribute", req, cb);
    }
    async DescribeVpnGatewaySslClients(req, cb) {
        return this.request("DescribeVpnGatewaySslClients", req, cb);
    }
    async CreateNatGateway(req, cb) {
        return this.request("CreateNatGateway", req, cb);
    }
    async DeleteNetDetect(req, cb) {
        return this.request("DeleteNetDetect", req, cb);
    }
    async NotifyRoutes(req, cb) {
        return this.request("NotifyRoutes", req, cb);
    }
    async DeleteVpcEndPoint(req, cb) {
        return this.request("DeleteVpcEndPoint", req, cb);
    }
    async DeleteHighPriorityRoutes(req, cb) {
        return this.request("DeleteHighPriorityRoutes", req, cb);
    }
    async CreateServiceTemplate(req, cb) {
        return this.request("CreateServiceTemplate", req, cb);
    }
    async InquiryPriceAllocateAddresses(req, cb) {
        return this.request("InquiryPriceAllocateAddresses", req, cb);
    }
    async ModifyDirectConnectGatewayAttribute(req, cb) {
        return this.request("ModifyDirectConnectGatewayAttribute", req, cb);
    }
    async ModifySubnetAttribute(req, cb) {
        return this.request("ModifySubnetAttribute", req, cb);
    }
    async DescribeSgSnapshotFileContent(req, cb) {
        return this.request("DescribeSgSnapshotFileContent", req, cb);
    }
    async DescribeNetworkInterfaces(req, cb) {
        return this.request("DescribeNetworkInterfaces", req, cb);
    }
    async CreateRoutePolicy(req, cb) {
        return this.request("CreateRoutePolicy", req, cb);
    }
    async DisableCcnRoutes(req, cb) {
        return this.request("DisableCcnRoutes", req, cb);
    }
    async DescribeCcnRouteTableBroadcastPolicys(req, cb) {
        return this.request("DescribeCcnRouteTableBroadcastPolicys", req, cb);
    }
    async CreateAddressTemplateGroup(req, cb) {
        return this.request("CreateAddressTemplateGroup", req, cb);
    }
    async DescribePrivateNatGateways(req, cb) {
        return this.request("DescribePrivateNatGateways", req, cb);
    }
    async AssociateNetworkAclSubnets(req, cb) {
        return this.request("AssociateNetworkAclSubnets", req, cb);
    }
    async DescribeVpnGateways(req, cb) {
        return this.request("DescribeVpnGateways", req, cb);
    }
    async AssociateNetworkInterfaceSecurityGroups(req, cb) {
        return this.request("AssociateNetworkInterfaceSecurityGroups", req, cb);
    }
    async ReplaceHighPriorityRouteTableAssociation(req, cb) {
        return this.request("ReplaceHighPriorityRouteTableAssociation", req, cb);
    }
    async ReturnNormalAddresses(req, cb) {
        return this.request("ReturnNormalAddresses", req, cb);
    }
    async EnableFlowLogs(req, cb) {
        return this.request("EnableFlowLogs", req, cb);
    }
    async CreateCdcLDCXList(req, cb) {
        return this.request("CreateCdcLDCXList", req, cb);
    }
    async ModifyNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("ModifyNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async DescribeHaVips(req, cb) {
        return this.request("DescribeHaVips", req, cb);
    }
    async CreateLocalGateway(req, cb) {
        return this.request("CreateLocalGateway", req, cb);
    }
    async HaVipDisassociateAddressIp(req, cb) {
        return this.request("HaVipDisassociateAddressIp", req, cb);
    }
    async ResetVpnGatewayInternetMaxBandwidth(req, cb) {
        return this.request("ResetVpnGatewayInternetMaxBandwidth", req, cb);
    }
    async ModifyVpnConnectionAttribute(req, cb) {
        return this.request("ModifyVpnConnectionAttribute", req, cb);
    }
    async DescribePrivateNatGatewayTranslationNatRules(req, cb) {
        return this.request("DescribePrivateNatGatewayTranslationNatRules", req, cb);
    }
    async DisassociateDhcpIpWithAddressIp(req, cb) {
        return this.request("DisassociateDhcpIpWithAddressIp", req, cb);
    }
    async CreateHaVip(req, cb) {
        return this.request("CreateHaVip", req, cb);
    }
    async DescribeAddressTemplateGroupInstances(req, cb) {
        return this.request("DescribeAddressTemplateGroupInstances", req, cb);
    }
    async DescribeTenantCcns(req, cb) {
        return this.request("DescribeTenantCcns", req, cb);
    }
    async CreateHighPriorityRoutes(req, cb) {
        return this.request("CreateHighPriorityRoutes", req, cb);
    }
    async LockCcns(req, cb) {
        return this.request("LockCcns", req, cb);
    }
    async CreateRoutes(req, cb) {
        return this.request("CreateRoutes", req, cb);
    }
    async ModifyRouteTableSelectionPolicies(req, cb) {
        return this.request("ModifyRouteTableSelectionPolicies", req, cb);
    }
    async DescribeSecurityGroupAssociationStatistics(req, cb) {
        return this.request("DescribeSecurityGroupAssociationStatistics", req, cb);
    }
    async DescribeIpGeolocationDatabaseUrl(req, cb) {
        return this.request("DescribeIpGeolocationDatabaseUrl", req, cb);
    }
    async DescribeCcnPolicyBasedRoutingRule(req, cb) {
        return this.request("DescribeCcnPolicyBasedRoutingRule", req, cb);
    }
    async ModifyAddressAttribute(req, cb) {
        return this.request("ModifyAddressAttribute", req, cb);
    }
    async DescribeTrafficQosPolicy(req, cb) {
        return this.request("DescribeTrafficQosPolicy", req, cb);
    }
    async DescribeIPv6Addresses(req, cb) {
        return this.request("DescribeIPv6Addresses", req, cb);
    }
    async CreateFlowLog(req, cb) {
        return this.request("CreateFlowLog", req, cb);
    }
    async CreateRouteTable(req, cb) {
        return this.request("CreateRouteTable", req, cb);
    }
    async ModifyPrivateNatGatewayAttribute(req, cb) {
        return this.request("ModifyPrivateNatGatewayAttribute", req, cb);
    }
    async DeleteNetworkAcl(req, cb) {
        return this.request("DeleteNetworkAcl", req, cb);
    }
    async DeleteVpcEndPointServiceWhiteList(req, cb) {
        return this.request("DeleteVpcEndPointServiceWhiteList", req, cb);
    }
    async ModifyFlowLogAttribute(req, cb) {
        return this.request("ModifyFlowLogAttribute", req, cb);
    }
    async DisassociateNetworkInterfaceSecurityGroups(req, cb) {
        return this.request("DisassociateNetworkInterfaceSecurityGroups", req, cb);
    }
    async ResetRoutes(req, cb) {
        return this.request("ResetRoutes", req, cb);
    }
    async ModifyNatGatewayAdvancedAttribute(req, cb) {
        return this.request("ModifyNatGatewayAdvancedAttribute", req, cb);
    }
    async DeleteNetworkAclEntries(req, cb) {
        return this.request("DeleteNetworkAclEntries", req, cb);
    }
    async StopTrafficMirror(req, cb) {
        return this.request("StopTrafficMirror", req, cb);
    }
    async ModifyCcnRegionBandwidthLimitsType(req, cb) {
        return this.request("ModifyCcnRegionBandwidthLimitsType", req, cb);
    }
    async DescribeCcnRouteTableInputPolicys(req, cb) {
        return this.request("DescribeCcnRouteTableInputPolicys", req, cb);
    }
    async CloneSecurityGroup(req, cb) {
        return this.request("CloneSecurityGroup", req, cb);
    }
    async DeleteSnapshotPolicies(req, cb) {
        return this.request("DeleteSnapshotPolicies", req, cb);
    }
    async ModifyIPv6AddressesBandwidth(req, cb) {
        return this.request("ModifyIPv6AddressesBandwidth", req, cb);
    }
    async RefreshDirectConnectGatewayRouteToNatGateway(req, cb) {
        return this.request("RefreshDirectConnectGatewayRouteToNatGateway", req, cb);
    }
    async DescribeNatGatewayZones(req, cb) {
        return this.request("DescribeNatGatewayZones", req, cb);
    }
    async CreatePrivateNatGatewayTranslationNatRule(req, cb) {
        return this.request("CreatePrivateNatGatewayTranslationNatRule", req, cb);
    }
    async ModifyVpcEndPointAttribute(req, cb) {
        return this.request("ModifyVpcEndPointAttribute", req, cb);
    }
    async ModifyHighPriorityRouteAttribute(req, cb) {
        return this.request("ModifyHighPriorityRouteAttribute", req, cb);
    }
    async DisassociateVpcEndPointSecurityGroups(req, cb) {
        return this.request("DisassociateVpcEndPointSecurityGroups", req, cb);
    }
    async InquiryPriceRenewVpnGateway(req, cb) {
        return this.request("InquiryPriceRenewVpnGateway", req, cb);
    }
    async EnableVpcEndPointConnect(req, cb) {
        return this.request("EnableVpcEndPointConnect", req, cb);
    }
    async CreateAndAttachNetworkInterface(req, cb) {
        return this.request("CreateAndAttachNetworkInterface", req, cb);
    }
    async ModifyVpcEndPointServiceWhiteList(req, cb) {
        return this.request("ModifyVpcEndPointServiceWhiteList", req, cb);
    }
    async DescribeNatGateways(req, cb) {
        return this.request("DescribeNatGateways", req, cb);
    }
    async CreateGlobalRoutes(req, cb) {
        return this.request("CreateGlobalRoutes", req, cb);
    }
    async ResetHighPriorityRoutes(req, cb) {
        return this.request("ResetHighPriorityRoutes", req, cb);
    }
    async DescribeVpcs(req, cb) {
        return this.request("DescribeVpcs", req, cb);
    }
    async MigrateNetworkInterface(req, cb) {
        return this.request("MigrateNetworkInterface", req, cb);
    }
    async UpgradeNatGatewayProductVersion(req, cb) {
        return this.request("UpgradeNatGatewayProductVersion", req, cb);
    }
    async DescribeHighPriorityRouteTables(req, cb) {
        return this.request("DescribeHighPriorityRouteTables", req, cb);
    }
    async AcceptAttachCcnInstances(req, cb) {
        return this.request("AcceptAttachCcnInstances", req, cb);
    }
    async DescribeGatewayFlowQos(req, cb) {
        return this.request("DescribeGatewayFlowQos", req, cb);
    }
    async DescribeIp6Translators(req, cb) {
        return this.request("DescribeIp6Translators", req, cb);
    }
    async DescribeNatGatewayFlowMonitorDetail(req, cb) {
        return this.request("DescribeNatGatewayFlowMonitorDetail", req, cb);
    }
    async DisableGatewayFlowMonitor(req, cb) {
        return this.request("DisableGatewayFlowMonitor", req, cb);
    }
    async CreateVpc(req, cb) {
        return this.request("CreateVpc", req, cb);
    }
    async CheckAssistantCidr(req, cb) {
        return this.request("CheckAssistantCidr", req, cb);
    }
    async ModifyNetworkAclAttribute(req, cb) {
        return this.request("ModifyNetworkAclAttribute", req, cb);
    }
    async DescribeSecurityGroupExpandedPolicies(req, cb) {
        return this.request("DescribeSecurityGroupExpandedPolicies", req, cb);
    }
    async DisableSnapshotPolicies(req, cb) {
        return this.request("DisableSnapshotPolicies", req, cb);
    }
    async DeletePrivateNatGatewayTranslationNatRule(req, cb) {
        return this.request("DeletePrivateNatGatewayTranslationNatRule", req, cb);
    }
    async DescribeDhcpIps(req, cb) {
        return this.request("DescribeDhcpIps", req, cb);
    }
    async AssociateAddress(req, cb) {
        return this.request("AssociateAddress", req, cb);
    }
    async ModifyGlobalRouteECMPAlgorithm(req, cb) {
        return this.request("ModifyGlobalRouteECMPAlgorithm", req, cb);
    }
    async DeleteVpcPeeringConnection(req, cb) {
        return this.request("DeleteVpcPeeringConnection", req, cb);
    }
    async DescribeFlowLogs(req, cb) {
        return this.request("DescribeFlowLogs", req, cb);
    }
    async DescribeDirectConnectGatewayCcnRoutes(req, cb) {
        return this.request("DescribeDirectConnectGatewayCcnRoutes", req, cb);
    }
    async CreateNetworkAclEntries(req, cb) {
        return this.request("CreateNetworkAclEntries", req, cb);
    }
    async DeleteBandwidthPackage(req, cb) {
        return this.request("DeleteBandwidthPackage", req, cb);
    }
    async CreateRoutePolicyEntries(req, cb) {
        return this.request("CreateRoutePolicyEntries", req, cb);
    }
    async DeleteIp6Translators(req, cb) {
        return this.request("DeleteIp6Translators", req, cb);
    }
    async DescribeRoutes(req, cb) {
        return this.request("DescribeRoutes", req, cb);
    }
    async DeleteVpnGatewayRoutes(req, cb) {
        return this.request("DeleteVpnGatewayRoutes", req, cb);
    }
    async ReplaceHighPriorityRoutes(req, cb) {
        return this.request("ReplaceHighPriorityRoutes", req, cb);
    }
    async ModifyCcnAttachedInstancesAttribute(req, cb) {
        return this.request("ModifyCcnAttachedInstancesAttribute", req, cb);
    }
    async ResetTrafficMirrorTarget(req, cb) {
        return this.request("ResetTrafficMirrorTarget", req, cb);
    }
    async DeleteNatGateway(req, cb) {
        return this.request("DeleteNatGateway", req, cb);
    }
    async DescribeRouteList(req, cb) {
        return this.request("DescribeRouteList", req, cb);
    }
    async ModifyIpv6AddressesAttribute(req, cb) {
        return this.request("ModifyIpv6AddressesAttribute", req, cb);
    }
    async CreateNetDetect(req, cb) {
        return this.request("CreateNetDetect", req, cb);
    }
    async ModifyHighPriorityRouteTableAttribute(req, cb) {
        return this.request("ModifyHighPriorityRouteTableAttribute", req, cb);
    }
    async ReleaseIPv6Addresses(req, cb) {
        return this.request("ReleaseIPv6Addresses", req, cb);
    }
    async DeleteReserveIpAddresses(req, cb) {
        return this.request("DeleteReserveIpAddresses", req, cb);
    }
    async ModifyCdcLDCXAttribute(req, cb) {
        return this.request("ModifyCdcLDCXAttribute", req, cb);
    }
    async DeleteVpcEndPointService(req, cb) {
        return this.request("DeleteVpcEndPointService", req, cb);
    }
    async CreateNetworkAclQuintupleEntries(req, cb) {
        return this.request("CreateNetworkAclQuintupleEntries", req, cb);
    }
    async DeleteVpnGateway(req, cb) {
        return this.request("DeleteVpnGateway", req, cb);
    }
    async DescribeVpcEndPointServiceWhiteList(req, cb) {
        return this.request("DescribeVpcEndPointServiceWhiteList", req, cb);
    }
    async ModifyBandwidthPackageBandwidth(req, cb) {
        return this.request("ModifyBandwidthPackageBandwidth", req, cb);
    }
    async DescribePrivateNatGatewayLimits(req, cb) {
        return this.request("DescribePrivateNatGatewayLimits", req, cb);
    }
    async ModifySecurityGroupPolicies(req, cb) {
        return this.request("ModifySecurityGroupPolicies", req, cb);
    }
    async CreatePrivateNatGatewayTranslationAclRule(req, cb) {
        return this.request("CreatePrivateNatGatewayTranslationAclRule", req, cb);
    }
    async DescribeSecurityGroupLimits(req, cb) {
        return this.request("DescribeSecurityGroupLimits", req, cb);
    }
    async DescribeCdcUsedIdcVlan(req, cb) {
        return this.request("DescribeCdcUsedIdcVlan", req, cb);
    }
    async DescribeSecurityGroupReferences(req, cb) {
        return this.request("DescribeSecurityGroupReferences", req, cb);
    }
    async DisableVpnGatewaySslClientCert(req, cb) {
        return this.request("DisableVpnGatewaySslClientCert", req, cb);
    }
    async DescribeDirectConnectGateways(req, cb) {
        return this.request("DescribeDirectConnectGateways", req, cb);
    }
    async RenewVpnGateway(req, cb) {
        return this.request("RenewVpnGateway", req, cb);
    }
    async MigratePrivateIpAddress(req, cb) {
        return this.request("MigratePrivateIpAddress", req, cb);
    }
    async DetachSnapshotInstances(req, cb) {
        return this.request("DetachSnapshotInstances", req, cb);
    }
    async DescribeServiceTemplates(req, cb) {
        return this.request("DescribeServiceTemplates", req, cb);
    }
    async DescribeCcnPolicyBasedRoutingNextHop(req, cb) {
        return this.request("DescribeCcnPolicyBasedRoutingNextHop", req, cb);
    }
    async DescribeNatGatewayDirectConnectGatewayRoute(req, cb) {
        return this.request("DescribeNatGatewayDirectConnectGatewayRoute", req, cb);
    }
    async DeleteTrafficMirrorFilterRules(req, cb) {
        return this.request("DeleteTrafficMirrorFilterRules", req, cb);
    }
    async HaVipAssociateAddressIp(req, cb) {
        return this.request("HaVipAssociateAddressIp", req, cb);
    }
    async ResetRoutePolicyAssociations(req, cb) {
        return this.request("ResetRoutePolicyAssociations", req, cb);
    }
    async CheckDefaultSubnet(req, cb) {
        return this.request("CheckDefaultSubnet", req, cb);
    }
    async DownloadVpnGatewaySslClientCert(req, cb) {
        return this.request("DownloadVpnGatewaySslClientCert", req, cb);
    }
    async DescribeAddressQuota(req, cb) {
        return this.request("DescribeAddressQuota", req, cb);
    }
    async DescribeRoutePolicies(req, cb) {
        return this.request("DescribeRoutePolicies", req, cb);
    }
    async UpdateTrafficMirrorDirection(req, cb) {
        return this.request("UpdateTrafficMirrorDirection", req, cb);
    }
    async StartTrafficMirror(req, cb) {
        return this.request("StartTrafficMirror", req, cb);
    }
    async CreateCcn(req, cb) {
        return this.request("CreateCcn", req, cb);
    }
    async DescribeSecurityGroups(req, cb) {
        return this.request("DescribeSecurityGroups", req, cb);
    }
    async CreateVpnGateway(req, cb) {
        return this.request("CreateVpnGateway", req, cb);
    }
    async DescribeSecurityGroupPolicies(req, cb) {
        return this.request("DescribeSecurityGroupPolicies", req, cb);
    }
    async DescribeAssistantCidr(req, cb) {
        return this.request("DescribeAssistantCidr", req, cb);
    }
    async DescribeClassicLinkInstances(req, cb) {
        return this.request("DescribeClassicLinkInstances", req, cb);
    }
    async ClearRouteTableSelectionPolicies(req, cb) {
        return this.request("ClearRouteTableSelectionPolicies", req, cb);
    }
    async InquiryPriceModifyAddressesBandwidth(req, cb) {
        return this.request("InquiryPriceModifyAddressesBandwidth", req, cb);
    }
    async AllocateIPv6Addresses(req, cb) {
        return this.request("AllocateIPv6Addresses", req, cb);
    }
    async ModifyAssistantCidr(req, cb) {
        return this.request("ModifyAssistantCidr", req, cb);
    }
    async DeleteNatGatewayDestinationIpPortTranslationNatRule(req, cb) {
        return this.request("DeleteNatGatewayDestinationIpPortTranslationNatRule", req, cb);
    }
    async CreateTrafficPackages(req, cb) {
        return this.request("CreateTrafficPackages", req, cb);
    }
    async DescribeSnapshotFiles(req, cb) {
        return this.request("DescribeSnapshotFiles", req, cb);
    }
    async CreateDhcpIp(req, cb) {
        return this.request("CreateDhcpIp", req, cb);
    }
    async ModifyVpcAttribute(req, cb) {
        return this.request("ModifyVpcAttribute", req, cb);
    }
    async ResumeSnapshotInstance(req, cb) {
        return this.request("ResumeSnapshotInstance", req, cb);
    }
    async SetVpnGatewaysRenewFlag(req, cb) {
        return this.request("SetVpnGatewaysRenewFlag", req, cb);
    }
    async DescribeSnapshotPolicies(req, cb) {
        return this.request("DescribeSnapshotPolicies", req, cb);
    }
    async ModifyIp6AddressesBandwidth(req, cb) {
        return this.request("ModifyIp6AddressesBandwidth", req, cb);
    }
    async ReplaceRoutesWithRoutePolicy(req, cb) {
        return this.request("ReplaceRoutesWithRoutePolicy", req, cb);
    }
    async CreateVpcEndPoint(req, cb) {
        return this.request("CreateVpcEndPoint", req, cb);
    }
    async CreateSecurityGroupWithPolicies(req, cb) {
        return this.request("CreateSecurityGroupWithPolicies", req, cb);
    }
    async ResetTrafficMirrorSrcs(req, cb) {
        return this.request("ResetTrafficMirrorSrcs", req, cb);
    }
    async ModifyTrafficMirrorAttribute(req, cb) {
        return this.request("ModifyTrafficMirrorAttribute", req, cb);
    }
    async DescribeCdcNetPlanes(req, cb) {
        return this.request("DescribeCdcNetPlanes", req, cb);
    }
    async DeletePrivateNatGateway(req, cb) {
        return this.request("DeletePrivateNatGateway", req, cb);
    }
    async CreateVpnGatewayRoutes(req, cb) {
        return this.request("CreateVpnGatewayRoutes", req, cb);
    }
}
