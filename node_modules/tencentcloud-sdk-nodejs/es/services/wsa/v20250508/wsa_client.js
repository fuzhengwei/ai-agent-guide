import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("wsa.tencentcloudapi.com", "2025-05-08", clientConfig);
    }
    async SearchPro(req, cb) {
        return this.request("SearchPro", req, cb);
    }
}
