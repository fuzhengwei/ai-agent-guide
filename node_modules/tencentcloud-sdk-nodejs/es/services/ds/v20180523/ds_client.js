import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ds.tencentcloudapi.com", "2018-05-23", clientConfig);
    }
    async CreateContractByUpload(req, cb) {
        return this.request("CreateContractByUpload", req, cb);
    }
    async CreateSeal(req, cb) {
        return this.request("CreateSeal", req, cb);
    }
    async DownloadContract(req, cb) {
        return this.request("DownloadContract", req, cb);
    }
    async DeleteAccount(req, cb) {
        return this.request("DeleteAccount", req, cb);
    }
    async DescribeTaskStatus(req, cb) {
        return this.request("DescribeTaskStatus", req, cb);
    }
    async CreatePersonalAccount(req, cb) {
        return this.request("CreatePersonalAccount", req, cb);
    }
    async SignContractByKeyword(req, cb) {
        return this.request("SignContractByKeyword", req, cb);
    }
    async DeleteSeal(req, cb) {
        return this.request("DeleteSeal", req, cb);
    }
    async CreateEnterpriseAccount(req, cb) {
        return this.request("CreateEnterpriseAccount", req, cb);
    }
    async SendVcode(req, cb) {
        return this.request("SendVcode", req, cb);
    }
    async CheckVcode(req, cb) {
        return this.request("CheckVcode", req, cb);
    }
    async SignContractByCoordinate(req, cb) {
        return this.request("SignContractByCoordinate", req, cb);
    }
}
