import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("yunsou.tencentcloudapi.com", "2019-11-15", clientConfig);
    }
    async DataManipulation(req, cb) {
        return this.request("DataManipulation", req, cb);
    }
    async DataSearch(req, cb) {
        return this.request("DataSearch", req, cb);
    }
}
