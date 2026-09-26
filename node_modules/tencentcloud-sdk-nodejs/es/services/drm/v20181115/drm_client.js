import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("drm.tencentcloudapi.com", "2018-11-15", clientConfig);
    }
    async StartEncryption(req, cb) {
        return this.request("StartEncryption", req, cb);
    }
    async AddFairPlayPem(req, cb) {
        return this.request("AddFairPlayPem", req, cb);
    }
    async CreateEncryptKeys(req, cb) {
        return this.request("CreateEncryptKeys", req, cb);
    }
    async CreateLicense(req, cb) {
        return this.request("CreateLicense", req, cb);
    }
    async ModifyFairPlayPem(req, cb) {
        return this.request("ModifyFairPlayPem", req, cb);
    }
    async DescribeKeys(req, cb) {
        return this.request("DescribeKeys", req, cb);
    }
    async DescribeDRMLicense(req, cb) {
        return this.request("DescribeDRMLicense", req, cb);
    }
    async DescribeAllKeys(req, cb) {
        return this.request("DescribeAllKeys", req, cb);
    }
    async DeleteFairPlayPem(req, cb) {
        return this.request("DeleteFairPlayPem", req, cb);
    }
    async DescribeFairPlayPem(req, cb) {
        return this.request("DescribeFairPlayPem", req, cb);
    }
    async GenerateTDRMKey(req, cb) {
        return this.request("GenerateTDRMKey", req, cb);
    }
}
