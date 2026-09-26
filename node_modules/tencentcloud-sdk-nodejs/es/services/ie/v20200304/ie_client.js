import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ie.tencentcloudapi.com", "2020-03-04", clientConfig);
    }
    async DescribeMediaQualityRestorationTaskRusult(req, cb) {
        return this.request("DescribeMediaQualityRestorationTaskRusult", req, cb);
    }
    async CreateMediaProcessTask(req, cb) {
        return this.request("CreateMediaProcessTask", req, cb);
    }
    async StopMediaQualityRestorationTask(req, cb) {
        return this.request("StopMediaQualityRestorationTask", req, cb);
    }
    async DescribeMediaProcessTaskResult(req, cb) {
        return this.request("DescribeMediaProcessTaskResult", req, cb);
    }
    async CreateMediaQualityRestorationTask(req, cb) {
        return this.request("CreateMediaQualityRestorationTask", req, cb);
    }
    async DescribeEditingTaskResult(req, cb) {
        return this.request("DescribeEditingTaskResult", req, cb);
    }
    async StopMediaProcessTask(req, cb) {
        return this.request("StopMediaProcessTask", req, cb);
    }
    async DescribeQualityControlTaskResult(req, cb) {
        return this.request("DescribeQualityControlTaskResult", req, cb);
    }
    async CreateQualityControlTask(req, cb) {
        return this.request("CreateQualityControlTask", req, cb);
    }
    async CreateEditingTask(req, cb) {
        return this.request("CreateEditingTask", req, cb);
    }
}
