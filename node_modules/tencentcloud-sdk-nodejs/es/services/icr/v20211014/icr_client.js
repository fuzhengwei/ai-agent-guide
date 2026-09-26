import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("icr.tencentcloudapi.com", "2021-10-14", clientConfig);
    }
    async GetIndustryV1HomeMembers(req, cb) {
        return this.request("GetIndustryV1HomeMembers", req, cb);
    }
}
