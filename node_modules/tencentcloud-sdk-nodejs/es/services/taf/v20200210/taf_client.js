import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("taf.tencentcloudapi.com", "2020-02-10", clientConfig);
    }
    async ManagePortraitRisk(req, cb) {
        return this.request("ManagePortraitRisk", req, cb);
    }
}
