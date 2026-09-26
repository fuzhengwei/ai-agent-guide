import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cetcd.tencentcloudapi.com", "2022-03-25", clientConfig);
    }
    async ModifyEtcdConfiguration(req, cb) {
        return this.request("ModifyEtcdConfiguration", req, cb);
    }
    async DescribeEtcdSnapshotPolicies(req, cb) {
        return this.request("DescribeEtcdSnapshotPolicies", req, cb);
    }
    async UpgradeEtcdInstance(req, cb) {
        return this.request("UpgradeEtcdInstance", req, cb);
    }
    async ResizeEtcdInstance(req, cb) {
        return this.request("ResizeEtcdInstance", req, cb);
    }
    async CreateEtcdSnapshot(req, cb) {
        return this.request("CreateEtcdSnapshot", req, cb);
    }
    async DescribeEtcdSnapshots(req, cb) {
        return this.request("DescribeEtcdSnapshots", req, cb);
    }
    async DescribeEtcdCredentials(req, cb) {
        return this.request("DescribeEtcdCredentials", req, cb);
    }
    async ModifyEtcdSnapshotPolicy(req, cb) {
        return this.request("ModifyEtcdSnapshotPolicy", req, cb);
    }
    async EnableEtcdInstanceDeletionProtection(req, cb) {
        return this.request("EnableEtcdInstanceDeletionProtection", req, cb);
    }
    async DescribeEtcdInstances(req, cb) {
        return this.request("DescribeEtcdInstances", req, cb);
    }
    async ModifyEtcdAttribute(req, cb) {
        return this.request("ModifyEtcdAttribute", req, cb);
    }
    async DescribeEtcdAvailableVersions(req, cb) {
        return this.request("DescribeEtcdAvailableVersions", req, cb);
    }
    async DescribeEtcdCreatingProgress(req, cb) {
        return this.request("DescribeEtcdCreatingProgress", req, cb);
    }
    async CreateEtcdSnapshotPolicy(req, cb) {
        return this.request("CreateEtcdSnapshotPolicy", req, cb);
    }
    async DisableEtcdInstanceDeletionProtection(req, cb) {
        return this.request("DisableEtcdInstanceDeletionProtection", req, cb);
    }
    async DescribeRPCMethodList(req, cb) {
        return this.request("DescribeRPCMethodList", req, cb);
    }
    async DescribeEtcdTasks(req, cb) {
        return this.request("DescribeEtcdTasks", req, cb);
    }
    async CreateEtcdInstance(req, cb) {
        return this.request("CreateEtcdInstance", req, cb);
    }
    async DescribeEtcdQuota(req, cb) {
        return this.request("DescribeEtcdQuota", req, cb);
    }
    async DescribeEtcdRegions(req, cb) {
        return this.request("DescribeEtcdRegions", req, cb);
    }
}
