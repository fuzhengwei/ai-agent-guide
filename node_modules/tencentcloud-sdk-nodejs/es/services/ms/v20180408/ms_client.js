import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ms.tencentcloudapi.com", "2018-04-08", clientConfig);
    }
    async RequestLocalTask(req, cb) {
        return this.request("RequestLocalTask", req, cb);
    }
    async DescribeResourceInstances(req, cb) {
        return this.request("DescribeResourceInstances", req, cb);
    }
    async DescribeShieldPlanInstance(req, cb) {
        return this.request("DescribeShieldPlanInstance", req, cb);
    }
    async DescribeShieldInstances(req, cb) {
        return this.request("DescribeShieldInstances", req, cb);
    }
    async DescribeUrlDetectionResult(req, cb) {
        return this.request("DescribeUrlDetectionResult", req, cb);
    }
    async CreateEncryptInstance(req, cb) {
        return this.request("CreateEncryptInstance", req, cb);
    }
    async DescribeEncryptPlan(req, cb) {
        return this.request("DescribeEncryptPlan", req, cb);
    }
    async DescribeOrderInstances(req, cb) {
        return this.request("DescribeOrderInstances", req, cb);
    }
    async UpdateLocalTaskResult(req, cb) {
        return this.request("UpdateLocalTaskResult", req, cb);
    }
    async CreateShieldPlanInstance(req, cb) {
        return this.request("CreateShieldPlanInstance", req, cb);
    }
    async CreateResourceInstances(req, cb) {
        return this.request("CreateResourceInstances", req, cb);
    }
    async CreateBindInstance(req, cb) {
        return this.request("CreateBindInstance", req, cb);
    }
    async CreateShieldInstance(req, cb) {
        return this.request("CreateShieldInstance", req, cb);
    }
    async DeleteShieldInstances(req, cb) {
        return this.request("DeleteShieldInstances", req, cb);
    }
    async DescribeShieldResult(req, cb) {
        return this.request("DescribeShieldResult", req, cb);
    }
    async UpdateClientState(req, cb) {
        return this.request("UpdateClientState", req, cb);
    }
    async DestroyResourceInstances(req, cb) {
        return this.request("DestroyResourceInstances", req, cb);
    }
    async CreateCosSecKeyInstance(req, cb) {
        return this.request("CreateCosSecKeyInstance", req, cb);
    }
    async CancelEncryptTask(req, cb) {
        return this.request("CancelEncryptTask", req, cb);
    }
    async DescribeUserBaseInfoInstance(req, cb) {
        return this.request("DescribeUserBaseInfoInstance", req, cb);
    }
    async DescribeApkDetectionResult(req, cb) {
        return this.request("DescribeApkDetectionResult", req, cb);
    }
    async DescribeEncryptInstances(req, cb) {
        return this.request("DescribeEncryptInstances", req, cb);
    }
    async CreateOrderInstance(req, cb) {
        return this.request("CreateOrderInstance", req, cb);
    }
}
