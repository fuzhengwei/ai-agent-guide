import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bri.tencentcloudapi.com", "2019-03-28", clientConfig);
    }
    async DescribeBRI(req, cb) {
        return this.request("DescribeBRI", req, cb);
    }
}
