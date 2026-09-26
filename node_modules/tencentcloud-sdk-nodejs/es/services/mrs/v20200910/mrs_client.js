import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("mrs.tencentcloudapi.com", "2020-09-10", clientConfig);
    }
    async ImageToClass(req, cb) {
        return this.request("ImageToClass", req, cb);
    }
    async DrugInstructionObject(req, cb) {
        return this.request("DrugInstructionObject", req, cb);
    }
    async TurnPDFToObjectAsyncGetResult(req, cb) {
        return this.request("TurnPDFToObjectAsyncGetResult", req, cb);
    }
    async TextToObject(req, cb) {
        return this.request("TextToObject", req, cb);
    }
    async ImageMask(req, cb) {
        return this.request("ImageMask", req, cb);
    }
    async ImageToObject(req, cb) {
        return this.request("ImageToObject", req, cb);
    }
    async TurnPDFToObjectAsync(req, cb) {
        return this.request("TurnPDFToObjectAsync", req, cb);
    }
    async ImageMaskAsync(req, cb) {
        return this.request("ImageMaskAsync", req, cb);
    }
    async ImageMaskAsyncGetResult(req, cb) {
        return this.request("ImageMaskAsyncGetResult", req, cb);
    }
    async TurnPDFToObject(req, cb) {
        return this.request("TurnPDFToObject", req, cb);
    }
    async TextToClass(req, cb) {
        return this.request("TextToClass", req, cb);
    }
}
