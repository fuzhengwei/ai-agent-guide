import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cim.tencentcloudapi.com", "2019-03-18", clientConfig);
    }
    async DescribeSdkAppid(req, cb) {
        return this.request("DescribeSdkAppid", req, cb);
    }
}
