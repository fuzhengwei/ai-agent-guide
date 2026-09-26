import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cii.tencentcloudapi.com", "2020-12-10", clientConfig);
    }
    async DescribeStructCompareData(req, cb) {
        return this.request("DescribeStructCompareData", req, cb);
    }
    async DescribeStructureTaskResult(req, cb) {
        return this.request("DescribeStructureTaskResult", req, cb);
    }
    async CreateStructureTask(req, cb) {
        return this.request("CreateStructureTask", req, cb);
    }
}
