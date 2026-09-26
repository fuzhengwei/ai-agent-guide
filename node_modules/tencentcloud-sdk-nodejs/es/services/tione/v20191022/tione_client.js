import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tione.tencentcloudapi.com", "2019-10-22", clientConfig);
    }
    async UpdateNotebookInstance(req, cb) {
        return this.request("UpdateNotebookInstance", req, cb);
    }
    async DescribeNotebookLifecycleScripts(req, cb) {
        return this.request("DescribeNotebookLifecycleScripts", req, cb);
    }
    async StartNotebookInstance(req, cb) {
        return this.request("StartNotebookInstance", req, cb);
    }
    async DeleteNotebookInstance(req, cb) {
        return this.request("DeleteNotebookInstance", req, cb);
    }
    async DescribeNotebookLifecycleScript(req, cb) {
        return this.request("DescribeNotebookLifecycleScript", req, cb);
    }
    async CreatePresignedNotebookInstanceUrl(req, cb) {
        return this.request("CreatePresignedNotebookInstanceUrl", req, cb);
    }
    async CreateCodeRepository(req, cb) {
        return this.request("CreateCodeRepository", req, cb);
    }
    async DescribeTrainingJob(req, cb) {
        return this.request("DescribeTrainingJob", req, cb);
    }
    async StopNotebookInstance(req, cb) {
        return this.request("StopNotebookInstance", req, cb);
    }
    async CreateNotebookInstance(req, cb) {
        return this.request("CreateNotebookInstance", req, cb);
    }
    async DescribeCodeRepository(req, cb) {
        return this.request("DescribeCodeRepository", req, cb);
    }
    async DescribeTrainingJobs(req, cb) {
        return this.request("DescribeTrainingJobs", req, cb);
    }
    async DeleteCodeRepository(req, cb) {
        return this.request("DeleteCodeRepository", req, cb);
    }
    async DescribeNotebookSummary(req, cb) {
        return this.request("DescribeNotebookSummary", req, cb);
    }
    async CreateNotebookLifecycleScript(req, cb) {
        return this.request("CreateNotebookLifecycleScript", req, cb);
    }
    async DeleteNotebookLifecycleScript(req, cb) {
        return this.request("DeleteNotebookLifecycleScript", req, cb);
    }
    async DescribeNotebookInstance(req, cb) {
        return this.request("DescribeNotebookInstance", req, cb);
    }
    async UpdateCodeRepository(req, cb) {
        return this.request("UpdateCodeRepository", req, cb);
    }
    async DescribeNotebookInstances(req, cb) {
        return this.request("DescribeNotebookInstances", req, cb);
    }
    async CreateTrainingJob(req, cb) {
        return this.request("CreateTrainingJob", req, cb);
    }
    async DescribeCodeRepositories(req, cb) {
        return this.request("DescribeCodeRepositories", req, cb);
    }
    async StopTrainingJob(req, cb) {
        return this.request("StopTrainingJob", req, cb);
    }
}
