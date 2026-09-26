import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("rce.tencentcloudapi.com", "2025-04-25", clientConfig);
    }
    async ManageIPPortraitRisk(req, cb) {
        return this.request("ManageIPPortraitRisk", req, cb);
    }
}
