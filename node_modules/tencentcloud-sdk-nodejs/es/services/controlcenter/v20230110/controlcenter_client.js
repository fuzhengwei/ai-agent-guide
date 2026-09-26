import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("controlcenter.tencentcloudapi.com", "2023-01-10", clientConfig);
    }
    async ListDeployStepTasks(req, cb) {
        return this.request("ListDeployStepTasks", req, cb);
    }
    async GetAccountFactoryBaseline(req, cb) {
        return this.request("GetAccountFactoryBaseline", req, cb);
    }
    async UpdateAccountFactoryBaseline(req, cb) {
        return this.request("UpdateAccountFactoryBaseline", req, cb);
    }
    async BatchApplyAccountBaselines(req, cb) {
        return this.request("BatchApplyAccountBaselines", req, cb);
    }
    async ListAccountFactoryBaselineItems(req, cb) {
        return this.request("ListAccountFactoryBaselineItems", req, cb);
    }
}
