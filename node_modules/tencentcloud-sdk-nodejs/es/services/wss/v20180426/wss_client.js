import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("wss.tencentcloudapi.com", "2018-04-26", clientConfig);
    }
    async DeleteCert(req, cb) {
        return this.request("DeleteCert", req, cb);
    }
    async DescribeCertList(req, cb) {
        return this.request("DescribeCertList", req, cb);
    }
    async UploadCert(req, cb) {
        return this.request("UploadCert", req, cb);
    }
}
