import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("hcm.tencentcloudapi.com", "2018-11-06", clientConfig);
    }
    async Evaluation(req, cb) {
        return this.request("Evaluation", req, cb);
    }
}
