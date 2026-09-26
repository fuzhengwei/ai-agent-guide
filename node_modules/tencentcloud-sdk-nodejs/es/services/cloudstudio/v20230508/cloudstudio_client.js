import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cloudstudio.tencentcloudapi.com", "2023-05-08", clientConfig);
    }
    async DescribeConfig(req, cb) {
        return this.request("DescribeConfig", req, cb);
    }
    async ModifyWorkspace(req, cb) {
        return this.request("ModifyWorkspace", req, cb);
    }
    async DescribeWorkspaces(req, cb) {
        return this.request("DescribeWorkspaces", req, cb);
    }
    async DescribeImages(req, cb) {
        return this.request("DescribeImages", req, cb);
    }
    async CreateWorkspace(req, cb) {
        return this.request("CreateWorkspace", req, cb);
    }
    async CreateWorkspaceToken(req, cb) {
        return this.request("CreateWorkspaceToken", req, cb);
    }
    async RemoveWorkspace(req, cb) {
        return this.request("RemoveWorkspace", req, cb);
    }
    async StopWorkspace(req, cb) {
        return this.request("StopWorkspace", req, cb);
    }
    async RunWorkspace(req, cb) {
        return this.request("RunWorkspace", req, cb);
    }
}
