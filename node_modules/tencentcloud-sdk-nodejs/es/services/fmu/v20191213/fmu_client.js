import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("fmu.tencentcloudapi.com", "2019-12-13", clientConfig);
    }
    async CreateModel(req, cb) {
        return this.request("CreateModel", req, cb);
    }
    async StyleImage(req, cb) {
        return this.request("StyleImage", req, cb);
    }
    async BeautifyPic(req, cb) {
        return this.request("BeautifyPic", req, cb);
    }
    async DeleteModel(req, cb) {
        return this.request("DeleteModel", req, cb);
    }
    async StyleImagePro(req, cb) {
        return this.request("StyleImagePro", req, cb);
    }
    async TryLipstickPic(req, cb) {
        return this.request("TryLipstickPic", req, cb);
    }
    async GetModelList(req, cb) {
        return this.request("GetModelList", req, cb);
    }
}
