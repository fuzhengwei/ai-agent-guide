import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cloudapp.tencentcloudapi.com", "2022-05-30", clientConfig);
    }
    async VerifyLicense(req, cb) {
        return this.request("VerifyLicense", req, cb);
    }
    async IssueLicense(req, cb) {
        return this.request("IssueLicense", req, cb);
    }
    async DescribeLicense(req, cb) {
        return this.request("DescribeLicense", req, cb);
    }
}
