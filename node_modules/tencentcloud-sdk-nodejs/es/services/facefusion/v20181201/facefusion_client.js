import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("facefusion.tencentcloudapi.com", "2018-12-01", clientConfig);
    }
    async DescribeMaterialList(req, cb) {
        return this.request("DescribeMaterialList", req, cb);
    }
    async FaceFusion(req, cb) {
        return this.request("FaceFusion", req, cb);
    }
    async FuseFace(req, cb) {
        return this.request("FuseFace", req, cb);
    }
}
