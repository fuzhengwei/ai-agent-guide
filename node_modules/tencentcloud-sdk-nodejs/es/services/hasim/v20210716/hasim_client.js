import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("hasim.tencentcloudapi.com", "2021-07-16", clientConfig);
    }
    async DeleteTactic(req, cb) {
        return this.request("DeleteTactic", req, cb);
    }
    async DescribeOrders(req, cb) {
        return this.request("DescribeOrders", req, cb);
    }
    async DescribeTactics(req, cb) {
        return this.request("DescribeTactics", req, cb);
    }
    async CreateRule(req, cb) {
        return this.request("CreateRule", req, cb);
    }
    async DeleteTag(req, cb) {
        return this.request("DeleteTag", req, cb);
    }
    async DescribeLinks(req, cb) {
        return this.request("DescribeLinks", req, cb);
    }
    async DeleteRule(req, cb) {
        return this.request("DeleteRule", req, cb);
    }
    async ModifyRuleStatus(req, cb) {
        return this.request("ModifyRuleStatus", req, cb);
    }
    async ModifyLinkAdvancedLog(req, cb) {
        return this.request("ModifyLinkAdvancedLog", req, cb);
    }
    async CreateTag(req, cb) {
        return this.request("CreateTag", req, cb);
    }
    async ModifyLinkTele(req, cb) {
        return this.request("ModifyLinkTele", req, cb);
    }
    async DescribeRule(req, cb) {
        return this.request("DescribeRule", req, cb);
    }
    async DescribeTags(req, cb) {
        return this.request("DescribeTags", req, cb);
    }
    async ModifyRule(req, cb) {
        return this.request("ModifyRule", req, cb);
    }
    async DescribeLink(req, cb) {
        return this.request("DescribeLink", req, cb);
    }
    async CreateTactic(req, cb) {
        return this.request("CreateTactic", req, cb);
    }
    async RenewLinkInfo(req, cb) {
        return this.request("RenewLinkInfo", req, cb);
    }
    async ModifyTactic(req, cb) {
        return this.request("ModifyTactic", req, cb);
    }
    async DescribeTactic(req, cb) {
        return this.request("DescribeTactic", req, cb);
    }
    async DescribeRules(req, cb) {
        return this.request("DescribeRules", req, cb);
    }
    async ModifyLinkTactic(req, cb) {
        return this.request("ModifyLinkTactic", req, cb);
    }
    async ModifyTag(req, cb) {
        return this.request("ModifyTag", req, cb);
    }
}
