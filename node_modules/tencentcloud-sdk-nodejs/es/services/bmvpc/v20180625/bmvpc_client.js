import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bmvpc.tencentcloudapi.com", "2018-06-25", clientConfig);
    }
    async DownloadCustomerGatewayConfiguration(req, cb) {
        return this.request("DownloadCustomerGatewayConfiguration", req, cb);
    }
    async DescribeCustomerGateways(req, cb) {
        return this.request("DescribeCustomerGateways", req, cb);
    }
    async CreateVpcPeerConnection(req, cb) {
        return this.request("CreateVpcPeerConnection", req, cb);
    }
    async AsyncRegisterIps(req, cb) {
        return this.request("AsyncRegisterIps", req, cb);
    }
    async DescribeRouteTables(req, cb) {
        return this.request("DescribeRouteTables", req, cb);
    }
    async UnbindEipsFromNatGateway(req, cb) {
        return this.request("UnbindEipsFromNatGateway", req, cb);
    }
    async BindEipsToNatGateway(req, cb) {
        return this.request("BindEipsToNatGateway", req, cb);
    }
    async ModifyVpcPeerConnection(req, cb) {
        return this.request("ModifyVpcPeerConnection", req, cb);
    }
    async CreateVpc(req, cb) {
        return this.request("CreateVpc", req, cb);
    }
    async CreateNatGateway(req, cb) {
        return this.request("CreateNatGateway", req, cb);
    }
    async DescribeSubnetAvailableIps(req, cb) {
        return this.request("DescribeSubnetAvailableIps", req, cb);
    }
    async DescribeRoutePolicies(req, cb) {
        return this.request("DescribeRoutePolicies", req, cb);
    }
    async DeleteVpc(req, cb) {
        return this.request("DeleteVpc", req, cb);
    }
    async DeleteHostedInterface(req, cb) {
        return this.request("DeleteHostedInterface", req, cb);
    }
    async DeregisterIps(req, cb) {
        return this.request("DeregisterIps", req, cb);
    }
    async ModifyRoutePolicy(req, cb) {
        return this.request("ModifyRoutePolicy", req, cb);
    }
    async CreateInterfaces(req, cb) {
        return this.request("CreateInterfaces", req, cb);
    }
    async ModifyCustomerGatewayAttribute(req, cb) {
        return this.request("ModifyCustomerGatewayAttribute", req, cb);
    }
    async DeleteRoutePolicy(req, cb) {
        return this.request("DeleteRoutePolicy", req, cb);
    }
    async ModifyVpnConnectionAttribute(req, cb) {
        return this.request("ModifyVpnConnectionAttribute", req, cb);
    }
    async DeleteVpnConnection(req, cb) {
        return this.request("DeleteVpnConnection", req, cb);
    }
    async DeleteVpnGateway(req, cb) {
        return this.request("DeleteVpnGateway", req, cb);
    }
    async BindIpsToNatGateway(req, cb) {
        return this.request("BindIpsToNatGateway", req, cb);
    }
    async ModifyVpnGatewayAttribute(req, cb) {
        return this.request("ModifyVpnGatewayAttribute", req, cb);
    }
    async UnbindIpsFromNatGateway(req, cb) {
        return this.request("UnbindIpsFromNatGateway", req, cb);
    }
    async DeleteCustomerGateway(req, cb) {
        return this.request("DeleteCustomerGateway", req, cb);
    }
    async DeleteSubnet(req, cb) {
        return this.request("DeleteSubnet", req, cb);
    }
    async ModifySubnetAttribute(req, cb) {
        return this.request("ModifySubnetAttribute", req, cb);
    }
    async DescribeNatSubnets(req, cb) {
        return this.request("DescribeNatSubnets", req, cb);
    }
    async RejectVpcPeerConnection(req, cb) {
        return this.request("RejectVpcPeerConnection", req, cb);
    }
    async DescribeSubnets(req, cb) {
        return this.request("DescribeSubnets", req, cb);
    }
    async DescribeSubnetByDevice(req, cb) {
        return this.request("DescribeSubnetByDevice", req, cb);
    }
    async ModifyRouteTable(req, cb) {
        return this.request("ModifyRouteTable", req, cb);
    }
    async ModifySubnetDHCPRelay(req, cb) {
        return this.request("ModifySubnetDHCPRelay", req, cb);
    }
    async DescribeVpcView(req, cb) {
        return this.request("DescribeVpcView", req, cb);
    }
    async DeleteVirtualIp(req, cb) {
        return this.request("DeleteVirtualIp", req, cb);
    }
    async CreateCustomerGateway(req, cb) {
        return this.request("CreateCustomerGateway", req, cb);
    }
    async DescribeTaskStatus(req, cb) {
        return this.request("DescribeTaskStatus", req, cb);
    }
    async CreateDockerSubnetWithVlan(req, cb) {
        return this.request("CreateDockerSubnetWithVlan", req, cb);
    }
    async UpgradeNatGateway(req, cb) {
        return this.request("UpgradeNatGateway", req, cb);
    }
    async CreateRoutePolicies(req, cb) {
        return this.request("CreateRoutePolicies", req, cb);
    }
    async DescribeVpcResource(req, cb) {
        return this.request("DescribeVpcResource", req, cb);
    }
    async UnbindSubnetsFromNatGateway(req, cb) {
        return this.request("UnbindSubnetsFromNatGateway", req, cb);
    }
    async ResetVpnConnection(req, cb) {
        return this.request("ResetVpnConnection", req, cb);
    }
    async DescribeVpnGateways(req, cb) {
        return this.request("DescribeVpnGateways", req, cb);
    }
    async DeleteHostedInterfaces(req, cb) {
        return this.request("DeleteHostedInterfaces", req, cb);
    }
    async AcceptVpcPeerConnection(req, cb) {
        return this.request("AcceptVpcPeerConnection", req, cb);
    }
    async DescribeVpcQuota(req, cb) {
        return this.request("DescribeVpcQuota", req, cb);
    }
    async DescribeNatGateways(req, cb) {
        return this.request("DescribeNatGateways", req, cb);
    }
    async BindSubnetsToNatGateway(req, cb) {
        return this.request("BindSubnetsToNatGateway", req, cb);
    }
    async DeleteInterfaces(req, cb) {
        return this.request("DeleteInterfaces", req, cb);
    }
    async CreateHostedInterface(req, cb) {
        return this.request("CreateHostedInterface", req, cb);
    }
    async DescribeVpnConnections(req, cb) {
        return this.request("DescribeVpnConnections", req, cb);
    }
    async DescribeSubnetByHostedDevice(req, cb) {
        return this.request("DescribeSubnetByHostedDevice", req, cb);
    }
    async DescribeVpcPeerConnections(req, cb) {
        return this.request("DescribeVpcPeerConnections", req, cb);
    }
    async DescribeVpcs(req, cb) {
        return this.request("DescribeVpcs", req, cb);
    }
    async DeleteVpcPeerConnection(req, cb) {
        return this.request("DeleteVpcPeerConnection", req, cb);
    }
    async ModifyVpcAttribute(req, cb) {
        return this.request("ModifyVpcAttribute", req, cb);
    }
    async DeleteNatGateway(req, cb) {
        return this.request("DeleteNatGateway", req, cb);
    }
    async CreateVirtualSubnetWithVlan(req, cb) {
        return this.request("CreateVirtualSubnetWithVlan", req, cb);
    }
    async CreateSubnet(req, cb) {
        return this.request("CreateSubnet", req, cb);
    }
}
