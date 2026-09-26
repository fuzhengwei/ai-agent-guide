import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("gwlb.tencentcloudapi.com", "2024-09-06", clientConfig);
    }
    async DeleteTargetGroups(req, cb) {
        return this.request("DeleteTargetGroups", req, cb);
    }
    async DeleteGatewayLoadBalancer(req, cb) {
        return this.request("DeleteGatewayLoadBalancer", req, cb);
    }
    async RegisterTargetGroupInstances(req, cb) {
        return this.request("RegisterTargetGroupInstances", req, cb);
    }
    async DescribeTargetGroups(req, cb) {
        return this.request("DescribeTargetGroups", req, cb);
    }
    async ModifyTargetGroupAttribute(req, cb) {
        return this.request("ModifyTargetGroupAttribute", req, cb);
    }
    async DescribeTaskStatus(req, cb) {
        return this.request("DescribeTaskStatus", req, cb);
    }
    async CreateGatewayLoadBalancer(req, cb) {
        return this.request("CreateGatewayLoadBalancer", req, cb);
    }
    async DisassociateTargetGroups(req, cb) {
        return this.request("DisassociateTargetGroups", req, cb);
    }
    async ModifyTargetGroupInstancesWeight(req, cb) {
        return this.request("ModifyTargetGroupInstancesWeight", req, cb);
    }
    async DescribeTargetGroupInstanceStatus(req, cb) {
        return this.request("DescribeTargetGroupInstanceStatus", req, cb);
    }
    async AssociateTargetGroups(req, cb) {
        return this.request("AssociateTargetGroups", req, cb);
    }
    async DescribeGatewayLoadBalancersResources(req, cb) {
        return this.request("DescribeGatewayLoadBalancersResources", req, cb);
    }
    async DescribeGatewayLoadBalancers(req, cb) {
        return this.request("DescribeGatewayLoadBalancers", req, cb);
    }
    async ModifyGatewayLoadBalancerAttribute(req, cb) {
        return this.request("ModifyGatewayLoadBalancerAttribute", req, cb);
    }
    async DescribeTargetGroupList(req, cb) {
        return this.request("DescribeTargetGroupList", req, cb);
    }
    async InquirePriceCreateGatewayLoadBalancer(req, cb) {
        return this.request("InquirePriceCreateGatewayLoadBalancer", req, cb);
    }
    async DeregisterTargetGroupInstances(req, cb) {
        return this.request("DeregisterTargetGroupInstances", req, cb);
    }
    async CreateTargetGroup(req, cb) {
        return this.request("CreateTargetGroup", req, cb);
    }
    async DescribeTargetGroupInstances(req, cb) {
        return this.request("DescribeTargetGroupInstances", req, cb);
    }
}
