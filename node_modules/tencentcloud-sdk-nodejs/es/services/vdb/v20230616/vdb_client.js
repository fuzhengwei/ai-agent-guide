import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vdb.tencentcloudapi.com", "2023-06-16", clientConfig);
    }
    async DescribeInstanceMaintenanceWindow(req, cb) {
        return this.request("DescribeInstanceMaintenanceWindow", req, cb);
    }
    async AssociateSecurityGroups(req, cb) {
        return this.request("AssociateSecurityGroups", req, cb);
    }
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
    async ModifyInstanceMaintenanceWindow(req, cb) {
        return this.request("ModifyInstanceMaintenanceWindow", req, cb);
    }
    async CreateInstance(req, cb) {
        return this.request("CreateInstance", req, cb);
    }
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    async RecoverInstance(req, cb) {
        return this.request("RecoverInstance", req, cb);
    }
    async DescribeInstanceNodes(req, cb) {
        return this.request("DescribeInstanceNodes", req, cb);
    }
    async IsolateInstance(req, cb) {
        return this.request("IsolateInstance", req, cb);
    }
    async DestroyInstances(req, cb) {
        return this.request("DestroyInstances", req, cb);
    }
    async ScaleUpInstance(req, cb) {
        return this.request("ScaleUpInstance", req, cb);
    }
    async DescribePriceResizeInstance(req, cb) {
        return this.request("DescribePriceResizeInstance", req, cb);
    }
    async DescribePriceRenewInstance(req, cb) {
        return this.request("DescribePriceRenewInstance", req, cb);
    }
    async ScaleOutInstance(req, cb) {
        return this.request("ScaleOutInstance", req, cb);
    }
    async DescribePriceCreateInstance(req, cb) {
        return this.request("DescribePriceCreateInstance", req, cb);
    }
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
}
