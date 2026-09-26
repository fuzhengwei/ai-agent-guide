import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("msp.tencentcloudapi.com", "2018-03-19", clientConfig);
    }
    async ListMigrationTask(req, cb) {
        return this.request("ListMigrationTask", req, cb);
    }
    async RegisterMigrationTask(req, cb) {
        return this.request("RegisterMigrationTask", req, cb);
    }
    async ModifyMigrationTaskStatus(req, cb) {
        return this.request("ModifyMigrationTaskStatus", req, cb);
    }
    async DeregisterMigrationTask(req, cb) {
        return this.request("DeregisterMigrationTask", req, cb);
    }
    async DescribeMigrationTask(req, cb) {
        return this.request("DescribeMigrationTask", req, cb);
    }
    async ModifyMigrationTaskBelongToProject(req, cb) {
        return this.request("ModifyMigrationTaskBelongToProject", req, cb);
    }
    async ListMigrationProject(req, cb) {
        return this.request("ListMigrationProject", req, cb);
    }
}
