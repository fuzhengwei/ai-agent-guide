import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tia.tencentcloudapi.com", "2018-02-26", clientConfig);
    }
    async CreateModel(req, cb) {
        return this.request("CreateModel", req, cb);
    }
    async ListJobs(req, cb) {
        return this.request("ListJobs", req, cb);
    }
    async CreateJob(req, cb) {
        return this.request("CreateJob", req, cb);
    }
    async DescribeModel(req, cb) {
        return this.request("DescribeModel", req, cb);
    }
    async QueryLogs(req, cb) {
        return this.request("QueryLogs", req, cb);
    }
    async ListModels(req, cb) {
        return this.request("ListModels", req, cb);
    }
    async DeleteJob(req, cb) {
        return this.request("DeleteJob", req, cb);
    }
    async DeleteModel(req, cb) {
        return this.request("DeleteModel", req, cb);
    }
    async DescribeJob(req, cb) {
        return this.request("DescribeJob", req, cb);
    }
    async InstallAgent(req, cb) {
        return this.request("InstallAgent", req, cb);
    }
}
