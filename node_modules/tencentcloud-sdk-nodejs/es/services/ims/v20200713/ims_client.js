import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ims.tencentcloudapi.com", "2020-07-13", clientConfig);
    }
    async ImageModeration(req, cb) {
        return this.request("ImageModeration", req, cb);
    }
}
