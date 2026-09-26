import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("svp.tencentcloudapi.com", "2024-01-25", clientConfig);
    }
    async DescribeSavingPlanCoverage(req, cb) {
        return this.request("DescribeSavingPlanCoverage", req, cb);
    }
    async DescribeSavingPlanUsage(req, cb) {
        return this.request("DescribeSavingPlanUsage", req, cb);
    }
    async DescribeSavingPlanOverview(req, cb) {
        return this.request("DescribeSavingPlanOverview", req, cb);
    }
    async CreateSavingPlanOrder(req, cb) {
        return this.request("CreateSavingPlanOrder", req, cb);
    }
    async DescribeSavingPlanDeduct(req, cb) {
        return this.request("DescribeSavingPlanDeduct", req, cb);
    }
}
