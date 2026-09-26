import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bma.tencentcloudapi.com", "2022-11-15", clientConfig);
    }
    async DescribeBPWhiteLists(req, cb) {
        return this.request("DescribeBPWhiteLists", req, cb);
    }
    async CreateBPWhiteList(req, cb) {
        return this.request("CreateBPWhiteList", req, cb);
    }
    async CreateBPFakeAPP(req, cb) {
        return this.request("CreateBPFakeAPP", req, cb);
    }
    async DeleteBPWhiteList(req, cb) {
        return this.request("DeleteBPWhiteList", req, cb);
    }
    async CreateBPFakeURLs(req, cb) {
        return this.request("CreateBPFakeURLs", req, cb);
    }
    async CreateBPBrand(req, cb) {
        return this.request("CreateBPBrand", req, cb);
    }
    async DescribeBPBrands(req, cb) {
        return this.request("DescribeBPBrands", req, cb);
    }
    async CreateBPFakeAPPList(req, cb) {
        return this.request("CreateBPFakeAPPList", req, cb);
    }
    async DescribeBPFakeAPPList(req, cb) {
        return this.request("DescribeBPFakeAPPList", req, cb);
    }
    async DescribeBPFakeURLs(req, cb) {
        return this.request("DescribeBPFakeURLs", req, cb);
    }
    async CreateBPFakeURL(req, cb) {
        return this.request("CreateBPFakeURL", req, cb);
    }
}
