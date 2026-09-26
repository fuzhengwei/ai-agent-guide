import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("dts.tencentcloudapi.com", "2018-03-30", clientConfig);
    }
    async ActivateSubscribe(req, cb) {
        return this.request("ActivateSubscribe", req, cb);
    }
    async ModifySubscribeObjects(req, cb) {
        return this.request("ModifySubscribeObjects", req, cb);
    }
    async DescribeMigrateCheckJob(req, cb) {
        return this.request("DescribeMigrateCheckJob", req, cb);
    }
    async DescribeAsyncRequestInfo(req, cb) {
        return this.request("DescribeAsyncRequestInfo", req, cb);
    }
    async ModifySubscribeAutoRenewFlag(req, cb) {
        return this.request("ModifySubscribeAutoRenewFlag", req, cb);
    }
    async StopMigrateJob(req, cb) {
        return this.request("StopMigrateJob", req, cb);
    }
    async DescribeMigrateJobs(req, cb) {
        return this.request("DescribeMigrateJobs", req, cb);
    }
    async DescribeSubscribes(req, cb) {
        return this.request("DescribeSubscribes", req, cb);
    }
    async CreateMigrateJob(req, cb) {
        return this.request("CreateMigrateJob", req, cb);
    }
    async ModifySubscribeVipVport(req, cb) {
        return this.request("ModifySubscribeVipVport", req, cb);
    }
    async CreateMigrateCheckJob(req, cb) {
        return this.request("CreateMigrateCheckJob", req, cb);
    }
    async ModifySubscribeConsumeTime(req, cb) {
        return this.request("ModifySubscribeConsumeTime", req, cb);
    }
    async ModifySubscribeName(req, cb) {
        return this.request("ModifySubscribeName", req, cb);
    }
    async CreateSubscribe(req, cb) {
        return this.request("CreateSubscribe", req, cb);
    }
    async ResetSubscribe(req, cb) {
        return this.request("ResetSubscribe", req, cb);
    }
    async StartMigrateJob(req, cb) {
        return this.request("StartMigrateJob", req, cb);
    }
    async ModifyMigrateJob(req, cb) {
        return this.request("ModifyMigrateJob", req, cb);
    }
    async OfflineIsolatedSubscribe(req, cb) {
        return this.request("OfflineIsolatedSubscribe", req, cb);
    }
    async IsolateSubscribe(req, cb) {
        return this.request("IsolateSubscribe", req, cb);
    }
    async DescribeSubscribeConf(req, cb) {
        return this.request("DescribeSubscribeConf", req, cb);
    }
    async DeleteMigrateJob(req, cb) {
        return this.request("DeleteMigrateJob", req, cb);
    }
    async CompleteMigrateJob(req, cb) {
        return this.request("CompleteMigrateJob", req, cb);
    }
}
