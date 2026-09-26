import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("advisor.tencentcloudapi.com", "2020-07-21", clientConfig);
    }
    async DescribeTaskStrategyRisks(req, cb) {
        return this.request("DescribeTaskStrategyRisks", req, cb);
    }
    async CreateAdvisorAuthorization(req, cb) {
        return this.request("CreateAdvisorAuthorization", req, cb);
    }
    async DescribeStrategies(req, cb) {
        return this.request("DescribeStrategies", req, cb);
    }
}
