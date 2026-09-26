import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("smop.tencentcloudapi.com", "2020-12-03", clientConfig);
    }
    async SubmitTaskEvent(req, cb) {
        return this.request("SubmitTaskEvent", req, cb);
    }
}
