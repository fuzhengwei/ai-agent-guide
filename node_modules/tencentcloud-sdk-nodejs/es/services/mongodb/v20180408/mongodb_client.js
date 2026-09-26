import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("mongodb.tencentcloudapi.com", "2018-04-08", clientConfig);
    }
    async AssignProject(req, cb) {
        return this.request("AssignProject", req, cb);
    }
    async TerminateDBInstance(req, cb) {
        return this.request("TerminateDBInstance", req, cb);
    }
    async CreateDBInstance(req, cb) {
        return this.request("CreateDBInstance", req, cb);
    }
    async DescribeClientConnections(req, cb) {
        return this.request("DescribeClientConnections", req, cb);
    }
    async CreateDBInstanceHour(req, cb) {
        return this.request("CreateDBInstanceHour", req, cb);
    }
    async DescribeSlowLog(req, cb) {
        return this.request("DescribeSlowLog", req, cb);
    }
    async RenameInstance(req, cb) {
        return this.request("RenameInstance", req, cb);
    }
    async UpgradeDBInstance(req, cb) {
        return this.request("UpgradeDBInstance", req, cb);
    }
    async SetAutoRenew(req, cb) {
        return this.request("SetAutoRenew", req, cb);
    }
    async DescribeSpecInfo(req, cb) {
        return this.request("DescribeSpecInfo", req, cb);
    }
    async SetPassword(req, cb) {
        return this.request("SetPassword", req, cb);
    }
    async UpgradeDBInstanceHour(req, cb) {
        return this.request("UpgradeDBInstanceHour", req, cb);
    }
    async DescribeDBInstances(req, cb) {
        return this.request("DescribeDBInstances", req, cb);
    }
}
