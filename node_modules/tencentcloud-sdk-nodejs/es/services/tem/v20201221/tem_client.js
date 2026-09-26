import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tem.tencentcloudapi.com", "2020-12-21", clientConfig);
    }
    async ModifyNamespace(req, cb) {
        return this.request("ModifyNamespace", req, cb);
    }
    async CreateNamespace(req, cb) {
        return this.request("CreateNamespace", req, cb);
    }
    async ModifyIngress(req, cb) {
        return this.request("ModifyIngress", req, cb);
    }
    async GenerateDownloadUrl(req, cb) {
        return this.request("GenerateDownloadUrl", req, cb);
    }
    async CreateCosToken(req, cb) {
        return this.request("CreateCosToken", req, cb);
    }
    async DescribeIngress(req, cb) {
        return this.request("DescribeIngress", req, cb);
    }
    async CreateCosTokenV2(req, cb) {
        return this.request("CreateCosTokenV2", req, cb);
    }
    async DeployServiceV2(req, cb) {
        return this.request("DeployServiceV2", req, cb);
    }
    async CreateServiceV2(req, cb) {
        return this.request("CreateServiceV2", req, cb);
    }
    async DescribeRelatedIngresses(req, cb) {
        return this.request("DescribeRelatedIngresses", req, cb);
    }
    async ModifyServiceInfo(req, cb) {
        return this.request("ModifyServiceInfo", req, cb);
    }
    async RestartServiceRunPod(req, cb) {
        return this.request("RestartServiceRunPod", req, cb);
    }
    async CreateResource(req, cb) {
        return this.request("CreateResource", req, cb);
    }
    async DescribeServiceRunPodListV2(req, cb) {
        return this.request("DescribeServiceRunPodListV2", req, cb);
    }
    async DescribeIngresses(req, cb) {
        return this.request("DescribeIngresses", req, cb);
    }
    async DescribeNamespaces(req, cb) {
        return this.request("DescribeNamespaces", req, cb);
    }
    async DeleteIngress(req, cb) {
        return this.request("DeleteIngress", req, cb);
    }
}
