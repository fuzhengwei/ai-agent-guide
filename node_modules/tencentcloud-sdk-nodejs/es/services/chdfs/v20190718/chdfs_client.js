import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("chdfs.tencentcloudapi.com", "2019-07-18", clientConfig);
    }
    async CreateRestoreTasks(req, cb) {
        return this.request("CreateRestoreTasks", req, cb);
    }
    async CreateLifeCycleRules(req, cb) {
        return this.request("CreateLifeCycleRules", req, cb);
    }
    async ModifyMountPoint(req, cb) {
        return this.request("ModifyMountPoint", req, cb);
    }
    async ModifyAccessRules(req, cb) {
        return this.request("ModifyAccessRules", req, cb);
    }
    async DeleteMountPoint(req, cb) {
        return this.request("DeleteMountPoint", req, cb);
    }
    async DescribeMountPoint(req, cb) {
        return this.request("DescribeMountPoint", req, cb);
    }
    async DeleteAccessRules(req, cb) {
        return this.request("DeleteAccessRules", req, cb);
    }
    async ModifyAccessGroup(req, cb) {
        return this.request("ModifyAccessGroup", req, cb);
    }
    async CreateMountPoint(req, cb) {
        return this.request("CreateMountPoint", req, cb);
    }
    async ModifyLifeCycleRules(req, cb) {
        return this.request("ModifyLifeCycleRules", req, cb);
    }
    async DescribeAccessGroups(req, cb) {
        return this.request("DescribeAccessGroups", req, cb);
    }
    async DeleteFileSystem(req, cb) {
        return this.request("DeleteFileSystem", req, cb);
    }
    async DescribeFileSystem(req, cb) {
        return this.request("DescribeFileSystem", req, cb);
    }
    async CreateFileSystem(req, cb) {
        return this.request("CreateFileSystem", req, cb);
    }
    async DescribeAccessRules(req, cb) {
        return this.request("DescribeAccessRules", req, cb);
    }
    async DeleteLifeCycleRules(req, cb) {
        return this.request("DeleteLifeCycleRules", req, cb);
    }
    async CreateAccessRules(req, cb) {
        return this.request("CreateAccessRules", req, cb);
    }
    async ModifyFileSystem(req, cb) {
        return this.request("ModifyFileSystem", req, cb);
    }
    async DescribeFileSystems(req, cb) {
        return this.request("DescribeFileSystems", req, cb);
    }
    async DescribeMountPoints(req, cb) {
        return this.request("DescribeMountPoints", req, cb);
    }
    async DescribeResourceTags(req, cb) {
        return this.request("DescribeResourceTags", req, cb);
    }
    async DescribeRestoreTasks(req, cb) {
        return this.request("DescribeRestoreTasks", req, cb);
    }
    async ModifyResourceTags(req, cb) {
        return this.request("ModifyResourceTags", req, cb);
    }
    async DescribeLifeCycleRules(req, cb) {
        return this.request("DescribeLifeCycleRules", req, cb);
    }
    async DeleteAccessGroup(req, cb) {
        return this.request("DeleteAccessGroup", req, cb);
    }
    async CreateAccessGroup(req, cb) {
        return this.request("CreateAccessGroup", req, cb);
    }
}
