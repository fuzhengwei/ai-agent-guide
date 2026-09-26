import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cii.tencentcloudapi.com", "2021-04-08", clientConfig);
    }
    async DescribeStructureDifference(req, cb) {
        return this.request("DescribeStructureDifference", req, cb);
    }
    async DescribeStructureTaskResult(req, cb) {
        return this.request("DescribeStructureTaskResult", req, cb);
    }
    async UploadMedicalFile(req, cb) {
        let options = {
            multipart: true
        };
        return this.request("UploadMedicalFile", req, cb);
    }
    async CreateUnderwriteTaskById(req, cb) {
        return this.request("CreateUnderwriteTaskById", req, cb);
    }
    async DescribeUnderwriteTask(req, cb) {
        return this.request("DescribeUnderwriteTask", req, cb);
    }
    async DescribeMachineUnderwrite(req, cb) {
        return this.request("DescribeMachineUnderwrite", req, cb);
    }
    async CreateStructureTask(req, cb) {
        return this.request("CreateStructureTask", req, cb);
    }
    async CreateAutoClassifyStructureTask(req, cb) {
        return this.request("CreateAutoClassifyStructureTask", req, cb);
    }
    async DescribeStructCompareData(req, cb) {
        return this.request("DescribeStructCompareData", req, cb);
    }
    async DescribeQualityScore(req, cb) {
        let options = {
            multipart: true
        };
        return this.request("DescribeQualityScore", req, cb);
    }
    async DescribeStructureResult(req, cb) {
        return this.request("DescribeStructureResult", req, cb);
    }
    async DescribeReportClassify(req, cb) {
        return this.request("DescribeReportClassify", req, cb);
    }
    async AddSubStructureTasks(req, cb) {
        return this.request("AddSubStructureTasks", req, cb);
    }
}
