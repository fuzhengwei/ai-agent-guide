import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ims.tencentcloudapi.com", "2020-12-29", clientConfig);
    }
    async CreateImageModerationAsyncTask(req, cb) {
        return this.request("CreateImageModerationAsyncTask", req, cb);
    }
    async ImageModeration(req, cb) {
        return this.request("ImageModeration", req, cb);
    }
}
