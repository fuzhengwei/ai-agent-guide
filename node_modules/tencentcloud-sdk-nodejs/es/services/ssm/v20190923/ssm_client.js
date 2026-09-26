import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ssm.tencentcloudapi.com", "2019-09-23", clientConfig);
    }
    async DescribeRotationHistory(req, cb) {
        return this.request("DescribeRotationHistory", req, cb);
    }
    async RotateProductSecret(req, cb) {
        return this.request("RotateProductSecret", req, cb);
    }
    async DeleteSecret(req, cb) {
        return this.request("DeleteSecret", req, cb);
    }
    async UpdateSecret(req, cb) {
        return this.request("UpdateSecret", req, cb);
    }
    async ListSecrets(req, cb) {
        return this.request("ListSecrets", req, cb);
    }
    async CreateSSHKeyPairSecret(req, cb) {
        return this.request("CreateSSHKeyPairSecret", req, cb);
    }
    async UpdateRotationStatus(req, cb) {
        return this.request("UpdateRotationStatus", req, cb);
    }
    async DescribeSupportedProducts(req, cb) {
        return this.request("DescribeSupportedProducts", req, cb);
    }
    async GetSecretValue(req, cb) {
        return this.request("GetSecretValue", req, cb);
    }
    async DescribeAsyncRequestInfo(req, cb) {
        return this.request("DescribeAsyncRequestInfo", req, cb);
    }
    async CreateProductSecret(req, cb) {
        return this.request("CreateProductSecret", req, cb);
    }
    async DeleteSecretVersion(req, cb) {
        return this.request("DeleteSecretVersion", req, cb);
    }
    async UpdateDescription(req, cb) {
        return this.request("UpdateDescription", req, cb);
    }
    async PutSecretValue(req, cb) {
        return this.request("PutSecretValue", req, cb);
    }
    async DescribeSecret(req, cb) {
        return this.request("DescribeSecret", req, cb);
    }
    async DescribeRotationDetail(req, cb) {
        return this.request("DescribeRotationDetail", req, cb);
    }
    async GetSSHKeyPairValue(req, cb) {
        return this.request("GetSSHKeyPairValue", req, cb);
    }
    async ListSecretVersionIds(req, cb) {
        return this.request("ListSecretVersionIds", req, cb);
    }
    async CreateSecret(req, cb) {
        return this.request("CreateSecret", req, cb);
    }
    async EnableSecret(req, cb) {
        return this.request("EnableSecret", req, cb);
    }
    async RestoreSecret(req, cb) {
        return this.request("RestoreSecret", req, cb);
    }
    async GetServiceStatus(req, cb) {
        return this.request("GetServiceStatus", req, cb);
    }
    async GetRegions(req, cb) {
        return this.request("GetRegions", req, cb);
    }
    async DisableSecret(req, cb) {
        return this.request("DisableSecret", req, cb);
    }
}
