import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dc.tencentcloudapi.com", "2018-04-10", clientConfig);
    }
    async ModifyDirectConnectTunnelExtra(req, cb) {
        return this.request("ModifyDirectConnectTunnelExtra", req, cb);
    }
    async DescribeInternetAddressStatistics(req, cb) {
        return this.request("DescribeInternetAddressStatistics", req, cb);
    }
    async DeleteDirectConnect(req, cb) {
        return this.request("DeleteDirectConnect", req, cb);
    }
    async DeleteDirectConnectTunnel(req, cb) {
        return this.request("DeleteDirectConnectTunnel", req, cb);
    }
    async CreateDirectConnect(req, cb) {
        return this.request("CreateDirectConnect", req, cb);
    }
    async DescribeDirectConnects(req, cb) {
        return this.request("DescribeDirectConnects", req, cb);
    }
    async EnableInternetAddress(req, cb) {
        return this.request("EnableInternetAddress", req, cb);
    }
    async ModifyDirectConnectAttribute(req, cb) {
        return this.request("ModifyDirectConnectAttribute", req, cb);
    }
    async DescribeDirectConnectTunnelExtra(req, cb) {
        return this.request("DescribeDirectConnectTunnelExtra", req, cb);
    }
    async DisableInternetAddress(req, cb) {
        return this.request("DisableInternetAddress", req, cb);
    }
    async DescribePublicDirectConnectTunnelRoutes(req, cb) {
        return this.request("DescribePublicDirectConnectTunnelRoutes", req, cb);
    }
    async CreateDirectConnectTunnel(req, cb) {
        return this.request("CreateDirectConnectTunnel", req, cb);
    }
    async RejectDirectConnectTunnel(req, cb) {
        return this.request("RejectDirectConnectTunnel", req, cb);
    }
    async ApplyInternetAddress(req, cb) {
        return this.request("ApplyInternetAddress", req, cb);
    }
    async DescribeInternetAddressQuota(req, cb) {
        return this.request("DescribeInternetAddressQuota", req, cb);
    }
    async DescribeDirectConnectTunnels(req, cb) {
        return this.request("DescribeDirectConnectTunnels", req, cb);
    }
    async DescribeAccessPoints(req, cb) {
        return this.request("DescribeAccessPoints", req, cb);
    }
    async CreateCloudAttachService(req, cb) {
        return this.request("CreateCloudAttachService", req, cb);
    }
    async ModifyDirectConnectTunnelAttribute(req, cb) {
        return this.request("ModifyDirectConnectTunnelAttribute", req, cb);
    }
    async AcceptDirectConnectTunnel(req, cb) {
        return this.request("AcceptDirectConnectTunnel", req, cb);
    }
    async DescribeInternetAddress(req, cb) {
        return this.request("DescribeInternetAddress", req, cb);
    }
    async ReleaseInternetAddress(req, cb) {
        return this.request("ReleaseInternetAddress", req, cb);
    }
}
