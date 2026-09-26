import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dbs.tencentcloudapi.com", "2021-11-08", clientConfig);
    }
    async CreateConnectTestJob(req, cb) {
        return this.request("CreateConnectTestJob", req, cb);
    }
    async StartBackupCheckJob(req, cb) {
        return this.request("StartBackupCheckJob", req, cb);
    }
    async StartBackupPlan(req, cb) {
        return this.request("StartBackupPlan", req, cb);
    }
    async DescribeBackupPlans(req, cb) {
        return this.request("DescribeBackupPlans", req, cb);
    }
    async ConfigureBackupPlan(req, cb) {
        return this.request("ConfigureBackupPlan", req, cb);
    }
    async DescribeBackupCheckJob(req, cb) {
        return this.request("DescribeBackupCheckJob", req, cb);
    }
    async CreateBackupPlan(req, cb) {
        return this.request("CreateBackupPlan", req, cb);
    }
    async DescribeConnectTestResult(req, cb) {
        return this.request("DescribeConnectTestResult", req, cb);
    }
}
