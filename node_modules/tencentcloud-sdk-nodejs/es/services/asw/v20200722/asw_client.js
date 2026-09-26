import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("asw.tencentcloudapi.com", "2020-07-22", clientConfig);
    }
    async StartExecution(req, cb) {
        return this.request("StartExecution", req, cb);
    }
    async StopExecution(req, cb) {
        return this.request("StopExecution", req, cb);
    }
    async DescribeExecutionHistory(req, cb) {
        return this.request("DescribeExecutionHistory", req, cb);
    }
    async DescribeExecution(req, cb) {
        return this.request("DescribeExecution", req, cb);
    }
    async DescribeFlowServices(req, cb) {
        return this.request("DescribeFlowServices", req, cb);
    }
    async DescribeExecutions(req, cb) {
        return this.request("DescribeExecutions", req, cb);
    }
    async CreateFlowService(req, cb) {
        return this.request("CreateFlowService", req, cb);
    }
    async DescribeFlowServiceDetail(req, cb) {
        return this.request("DescribeFlowServiceDetail", req, cb);
    }
    async ModifyFlowService(req, cb) {
        return this.request("ModifyFlowService", req, cb);
    }
}
