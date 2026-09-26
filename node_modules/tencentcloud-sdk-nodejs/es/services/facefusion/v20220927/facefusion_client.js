import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("facefusion.tencentcloudapi.com", "2022-09-27", clientConfig);
    }
    async DescribeMaterialList(req, cb) {
        return this.request("DescribeMaterialList", req, cb);
    }
    async FuseFace(req, cb) {
        return this.request("FuseFace", req, cb);
    }
    async FuseFaceUltra(req, cb) {
        return this.request("FuseFaceUltra", req, cb);
    }
}
