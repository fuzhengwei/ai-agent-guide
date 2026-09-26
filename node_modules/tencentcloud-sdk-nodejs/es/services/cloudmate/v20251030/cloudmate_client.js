import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cloudmate.tencentcloudapi.com", "2025-10-30", clientConfig);
    }
    async CloudMateAgent(req, cb) {
        return this.request("CloudMateAgent", req, cb);
    }
}
