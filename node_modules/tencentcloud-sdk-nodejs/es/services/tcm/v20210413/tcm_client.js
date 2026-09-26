import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tcm.tencentcloudapi.com", "2021-04-13", clientConfig);
    }
    async DeleteMesh(req, cb) {
        return this.request("DeleteMesh", req, cb);
    }
    async DescribeAccessLogConfig(req, cb) {
        return this.request("DescribeAccessLogConfig", req, cb);
    }
    async LinkClusterList(req, cb) {
        return this.request("LinkClusterList", req, cb);
    }
    async LinkPrometheus(req, cb) {
        return this.request("LinkPrometheus", req, cb);
    }
    async DescribeMeshList(req, cb) {
        return this.request("DescribeMeshList", req, cb);
    }
    async ModifyMesh(req, cb) {
        return this.request("ModifyMesh", req, cb);
    }
    async UnlinkCluster(req, cb) {
        return this.request("UnlinkCluster", req, cb);
    }
    async ModifyTracingConfig(req, cb) {
        return this.request("ModifyTracingConfig", req, cb);
    }
    async ModifyAccessLogConfig(req, cb) {
        return this.request("ModifyAccessLogConfig", req, cb);
    }
    async CreateMesh(req, cb) {
        return this.request("CreateMesh", req, cb);
    }
    async DescribeMesh(req, cb) {
        return this.request("DescribeMesh", req, cb);
    }
    async UnlinkPrometheus(req, cb) {
        return this.request("UnlinkPrometheus", req, cb);
    }
}
