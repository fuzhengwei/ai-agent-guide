import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tms.tencentcloudapi.com", "2020-12-29", clientConfig);
    }
    async CreateFinancialLLMTask(req, cb) {
        return this.request("CreateFinancialLLMTask", req, cb);
    }
    async TextModeration(req, cb) {
        return this.request("TextModeration", req, cb);
    }
    async GetFinancialLLMTaskResult(req, cb) {
        return this.request("GetFinancialLLMTaskResult", req, cb);
    }
}
