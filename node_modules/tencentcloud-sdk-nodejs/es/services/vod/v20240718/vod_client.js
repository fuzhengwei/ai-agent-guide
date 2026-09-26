import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vod.tencentcloudapi.com", "2024-07-18", clientConfig);
    }
    async ModifyIncrementalMigrationStrategy(req, cb) {
        return this.request("ModifyIncrementalMigrationStrategy", req, cb);
    }
    async DescribeIncrementalMigrationStrategyInfos(req, cb) {
        return this.request("DescribeIncrementalMigrationStrategyInfos", req, cb);
    }
    async CreateStorage(req, cb) {
        return this.request("CreateStorage", req, cb);
    }
    async CreateIncrementalMigrationStrategy(req, cb) {
        return this.request("CreateIncrementalMigrationStrategy", req, cb);
    }
    async DeleteIncrementalMigrationStrategy(req, cb) {
        return this.request("DeleteIncrementalMigrationStrategy", req, cb);
    }
    async DescribeStorage(req, cb) {
        return this.request("DescribeStorage", req, cb);
    }
    async CreateStorageCredentials(req, cb) {
        return this.request("CreateStorageCredentials", req, cb);
    }
}
