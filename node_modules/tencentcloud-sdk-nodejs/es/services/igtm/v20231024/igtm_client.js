import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("igtm.tencentcloudapi.com", "2023-10-24", clientConfig);
    }
    async DescribeAddressPoolList(req, cb) {
        return this.request("DescribeAddressPoolList", req, cb);
    }
    async ModifyAddressPool(req, cb) {
        return this.request("ModifyAddressPool", req, cb);
    }
    async ModifyInstanceConfig(req, cb) {
        return this.request("ModifyInstanceConfig", req, cb);
    }
    async DescribeDetectPackageDetail(req, cb) {
        return this.request("DescribeDetectPackageDetail", req, cb);
    }
    async CreateAddressPool(req, cb) {
        return this.request("CreateAddressPool", req, cb);
    }
    async DescribeInstanceDetail(req, cb) {
        return this.request("DescribeInstanceDetail", req, cb);
    }
    async DescribeAddressLocation(req, cb) {
        return this.request("DescribeAddressLocation", req, cb);
    }
    async CreateStrategy(req, cb) {
        return this.request("CreateStrategy", req, cb);
    }
    async DescribeDetectors(req, cb) {
        return this.request("DescribeDetectors", req, cb);
    }
    async DeleteStrategy(req, cb) {
        return this.request("DeleteStrategy", req, cb);
    }
    async DeleteMonitor(req, cb) {
        return this.request("DeleteMonitor", req, cb);
    }
    async ModifyMonitor(req, cb) {
        return this.request("ModifyMonitor", req, cb);
    }
    async DescribeMonitors(req, cb) {
        return this.request("DescribeMonitors", req, cb);
    }
    async CreateMonitor(req, cb) {
        return this.request("CreateMonitor", req, cb);
    }
    async DescribeDnsLineList(req, cb) {
        return this.request("DescribeDnsLineList", req, cb);
    }
    async CreateInstance(req, cb) {
        return this.request("CreateInstance", req, cb);
    }
    async DescribeInstanceList(req, cb) {
        return this.request("DescribeInstanceList", req, cb);
    }
    async ModifyPackageAutoRenew(req, cb) {
        return this.request("ModifyPackageAutoRenew", req, cb);
    }
    async DescribeMonitorDetail(req, cb) {
        return this.request("DescribeMonitorDetail", req, cb);
    }
    async DescribeDetectTaskPackageList(req, cb) {
        return this.request("DescribeDetectTaskPackageList", req, cb);
    }
    async DescribeStrategyList(req, cb) {
        return this.request("DescribeStrategyList", req, cb);
    }
    async CreatePackageAndPay(req, cb) {
        return this.request("CreatePackageAndPay", req, cb);
    }
    async DescribeQuotas(req, cb) {
        return this.request("DescribeQuotas", req, cb);
    }
    async DescribeAddressPoolDetail(req, cb) {
        return this.request("DescribeAddressPoolDetail", req, cb);
    }
    async ModifyStrategy(req, cb) {
        return this.request("ModifyStrategy", req, cb);
    }
    async DeleteAddressPool(req, cb) {
        return this.request("DeleteAddressPool", req, cb);
    }
    async DescribeStrategyDetail(req, cb) {
        return this.request("DescribeStrategyDetail", req, cb);
    }
    async DescribeInstancePackageList(req, cb) {
        return this.request("DescribeInstancePackageList", req, cb);
    }
}
