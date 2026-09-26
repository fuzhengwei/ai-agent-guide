import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("market.tencentcloudapi.com", "2019-10-10", clientConfig);
    }
    async GetUsagePlanUsageAmount(req, cb) {
        return this.request("GetUsagePlanUsageAmount", req, cb);
    }
    async FlowProductRemind(req, cb) {
        return this.request("FlowProductRemind", req, cb);
    }
}
