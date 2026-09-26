import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tsi.tencentcloudapi.com", "2021-03-25", clientConfig);
    }
    async TongChuanRecognize(req, cb) {
        return this.request("TongChuanRecognize", req, cb);
    }
    async TongChuanDisplay(req, cb) {
        return this.request("TongChuanDisplay", req, cb);
    }
    async TongChuanSync(req, cb) {
        return this.request("TongChuanSync", req, cb);
    }
}
