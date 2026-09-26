import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bmeip.tencentcloudapi.com", "2018-06-25", clientConfig);
    }
    async UnbindRs(req, cb) {
        return this.request("UnbindRs", req, cb);
    }
    async BindHosted(req, cb) {
        return this.request("BindHosted", req, cb);
    }
    async CreateEipAcl(req, cb) {
        return this.request("CreateEipAcl", req, cb);
    }
    async CreateEip(req, cb) {
        return this.request("CreateEip", req, cb);
    }
    async ModifyEipAcl(req, cb) {
        return this.request("ModifyEipAcl", req, cb);
    }
    async DescribeEipQuota(req, cb) {
        return this.request("DescribeEipQuota", req, cb);
    }
    async BindRs(req, cb) {
        return this.request("BindRs", req, cb);
    }
    async DescribeEipTask(req, cb) {
        return this.request("DescribeEipTask", req, cb);
    }
    async UnbindHosted(req, cb) {
        return this.request("UnbindHosted", req, cb);
    }
    async UnbindVpcIp(req, cb) {
        return this.request("UnbindVpcIp", req, cb);
    }
    async DeleteEip(req, cb) {
        return this.request("DeleteEip", req, cb);
    }
    async ModifyEipCharge(req, cb) {
        return this.request("ModifyEipCharge", req, cb);
    }
    async ModifyEipName(req, cb) {
        return this.request("ModifyEipName", req, cb);
    }
    async BindEipAcls(req, cb) {
        return this.request("BindEipAcls", req, cb);
    }
    async DeleteEipAcl(req, cb) {
        return this.request("DeleteEipAcl", req, cb);
    }
    async UnbindEipAcls(req, cb) {
        return this.request("UnbindEipAcls", req, cb);
    }
    async DescribeEips(req, cb) {
        return this.request("DescribeEips", req, cb);
    }
    async BindVpcIp(req, cb) {
        return this.request("BindVpcIp", req, cb);
    }
    async UnbindRsList(req, cb) {
        return this.request("UnbindRsList", req, cb);
    }
    async DescribeEipAcls(req, cb) {
        return this.request("DescribeEipAcls", req, cb);
    }
}
