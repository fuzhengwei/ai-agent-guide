import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("wimgs.tencentcloudapi.com", "2025-11-06", clientConfig);
    }
    async SearchByText(req, cb) {
        return this.request("SearchByText", req, cb);
    }
}
