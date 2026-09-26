import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("anicloud.tencentcloudapi.com", "2022-09-23", clientConfig);
    }
    async CheckAppidExist(req, cb) {
        return this.request("CheckAppidExist", req, cb);
    }
    async QueryResource(req, cb) {
        return this.request("QueryResource", req, cb);
    }
    async QueryResourceInfo(req, cb) {
        return this.request("QueryResourceInfo", req, cb);
    }
}
