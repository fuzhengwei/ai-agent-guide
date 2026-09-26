import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ft.tencentcloudapi.com", "2020-03-04", clientConfig);
    }
    async CancelFaceMorphJob(req, cb) {
        return this.request("CancelFaceMorphJob", req, cb);
    }
    async SwapGenderPic(req, cb) {
        return this.request("SwapGenderPic", req, cb);
    }
    async MorphFace(req, cb) {
        return this.request("MorphFace", req, cb);
    }
    async ChangeAgePic(req, cb) {
        return this.request("ChangeAgePic", req, cb);
    }
    async QueryFaceMorphJob(req, cb) {
        return this.request("QueryFaceMorphJob", req, cb);
    }
    async FaceCartoonPic(req, cb) {
        return this.request("FaceCartoonPic", req, cb);
    }
}
