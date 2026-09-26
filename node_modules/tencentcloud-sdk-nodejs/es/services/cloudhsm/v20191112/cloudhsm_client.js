import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cloudhsm.tencentcloudapi.com", "2019-11-12", clientConfig);
    }
    async GetAlarmEvent(req, cb) {
        return this.request("GetAlarmEvent", req, cb);
    }
    async ModifyVsmAttributes(req, cb) {
        return this.request("ModifyVsmAttributes", req, cb);
    }
    async DescribeVsmAttributes(req, cb) {
        return this.request("DescribeVsmAttributes", req, cb);
    }
    async DescribeVsms(req, cb) {
        return this.request("DescribeVsms", req, cb);
    }
    async DescribeVpc(req, cb) {
        return this.request("DescribeVpc", req, cb);
    }
    async DescribeHSMByVpcId(req, cb) {
        return this.request("DescribeHSMByVpcId", req, cb);
    }
    async GetVsmMonitorInfo(req, cb) {
        return this.request("GetVsmMonitorInfo", req, cb);
    }
    async DescribeHSMBySubnetId(req, cb) {
        return this.request("DescribeHSMBySubnetId", req, cb);
    }
    async DescribeUsg(req, cb) {
        return this.request("DescribeUsg", req, cb);
    }
    async DescribeSubnet(req, cb) {
        return this.request("DescribeSubnet", req, cb);
    }
    async ModifyAlarmEvent(req, cb) {
        return this.request("ModifyAlarmEvent", req, cb);
    }
    async DescribeSupportedHsm(req, cb) {
        return this.request("DescribeSupportedHsm", req, cb);
    }
    async InquiryPriceBuyVsm(req, cb) {
        return this.request("InquiryPriceBuyVsm", req, cb);
    }
    async DescribeUsgRule(req, cb) {
        return this.request("DescribeUsgRule", req, cb);
    }
}
