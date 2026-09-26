import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tbp.tencentcloudapi.com", "2019-06-27", clientConfig);
    }
    async TextReset(req, cb) {
        return this.request("TextReset", req, cb);
    }
    async TextProcess(req, cb) {
        return this.request("TextProcess", req, cb);
    }
}
