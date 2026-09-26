import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tiia.tencentcloudapi.com", "2019-05-29", clientConfig);
    }
    async CreateImage(req, cb) {
        return this.request("CreateImage", req, cb);
    }
    async UpdateImage(req, cb) {
        return this.request("UpdateImage", req, cb);
    }
    async DetectLabelPro(req, cb) {
        return this.request("DetectLabelPro", req, cb);
    }
    async RecognizeCar(req, cb) {
        return this.request("RecognizeCar", req, cb);
    }
    async DetectLabel(req, cb) {
        return this.request("DetectLabel", req, cb);
    }
    async AssessQuality(req, cb) {
        return this.request("AssessQuality", req, cb);
    }
    async DetectChefDress(req, cb) {
        return this.request("DetectChefDress", req, cb);
    }
    async DetectDisgust(req, cb) {
        return this.request("DetectDisgust", req, cb);
    }
    async DescribeGroups(req, cb) {
        return this.request("DescribeGroups", req, cb);
    }
    async DeleteImages(req, cb) {
        return this.request("DeleteImages", req, cb);
    }
    async CropImage(req, cb) {
        return this.request("CropImage", req, cb);
    }
    async SearchImage(req, cb) {
        return this.request("SearchImage", req, cb);
    }
    async DescribeImages(req, cb) {
        return this.request("DescribeImages", req, cb);
    }
    async DetectMisbehavior(req, cb) {
        return this.request("DetectMisbehavior", req, cb);
    }
    async CreateGroup(req, cb) {
        return this.request("CreateGroup", req, cb);
    }
    async DetectProduct(req, cb) {
        return this.request("DetectProduct", req, cb);
    }
    async RecognizeCarPro(req, cb) {
        return this.request("RecognizeCarPro", req, cb);
    }
    async EnhanceImage(req, cb) {
        return this.request("EnhanceImage", req, cb);
    }
    async DetectEnvelope(req, cb) {
        return this.request("DetectEnvelope", req, cb);
    }
    async DetectSecurity(req, cb) {
        return this.request("DetectSecurity", req, cb);
    }
    async DetectPet(req, cb) {
        return this.request("DetectPet", req, cb);
    }
}
