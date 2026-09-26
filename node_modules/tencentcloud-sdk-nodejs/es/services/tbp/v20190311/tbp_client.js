import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tbp.tencentcloudapi.com", "2019-03-11", clientConfig);
    }
    async Reset(req, cb) {
        return this.request("Reset", req, cb);
    }
    async CreateBot(req, cb) {
        return this.request("CreateBot", req, cb);
    }
    async TextReset(req, cb) {
        return this.request("TextReset", req, cb);
    }
    async TextProcess(req, cb) {
        return this.request("TextProcess", req, cb);
    }
}
