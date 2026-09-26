import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tat.tencentcloudapi.com", "2020-10-28", clientConfig);
    }
    async CancelInvocation(req, cb) {
        return this.request("CancelInvocation", req, cb);
    }
    async ModifyRegisterInstance(req, cb) {
        return this.request("ModifyRegisterInstance", req, cb);
    }
    async CreateInvoker(req, cb) {
        return this.request("CreateInvoker", req, cb);
    }
    async DeleteCommand(req, cb) {
        return this.request("DeleteCommand", req, cb);
    }
    async CreateRegisterCode(req, cb) {
        return this.request("CreateRegisterCode", req, cb);
    }
    async EnableInvoker(req, cb) {
        return this.request("EnableInvoker", req, cb);
    }
    async DeleteInvoker(req, cb) {
        return this.request("DeleteInvoker", req, cb);
    }
    async DescribeCommands(req, cb) {
        return this.request("DescribeCommands", req, cb);
    }
    async DescribeInvocations(req, cb) {
        return this.request("DescribeInvocations", req, cb);
    }
    async DescribeInvocationTasks(req, cb) {
        return this.request("DescribeInvocationTasks", req, cb);
    }
    async PreviewReplacedCommandContent(req, cb) {
        return this.request("PreviewReplacedCommandContent", req, cb);
    }
    async DisableInvoker(req, cb) {
        return this.request("DisableInvoker", req, cb);
    }
    async DeleteRegisterInstance(req, cb) {
        return this.request("DeleteRegisterInstance", req, cb);
    }
    async ModifyCommand(req, cb) {
        return this.request("ModifyCommand", req, cb);
    }
    async InvokeCommand(req, cb) {
        return this.request("InvokeCommand", req, cb);
    }
    async DeleteCommands(req, cb) {
        return this.request("DeleteCommands", req, cb);
    }
    async DescribeRegisterInstances(req, cb) {
        return this.request("DescribeRegisterInstances", req, cb);
    }
    async DescribeRegions(req, cb) {
        return this.request("DescribeRegions", req, cb);
    }
    async CreateCommand(req, cb) {
        return this.request("CreateCommand", req, cb);
    }
    async DeleteRegisterCodes(req, cb) {
        return this.request("DeleteRegisterCodes", req, cb);
    }
    async DescribeRegisterCodes(req, cb) {
        return this.request("DescribeRegisterCodes", req, cb);
    }
    async DescribeAutomationAgentStatus(req, cb) {
        return this.request("DescribeAutomationAgentStatus", req, cb);
    }
    async DescribeQuotas(req, cb) {
        return this.request("DescribeQuotas", req, cb);
    }
    async DisableRegisterCodes(req, cb) {
        return this.request("DisableRegisterCodes", req, cb);
    }
    async DescribeScenes(req, cb) {
        return this.request("DescribeScenes", req, cb);
    }
    async DescribeInvokerRecords(req, cb) {
        return this.request("DescribeInvokerRecords", req, cb);
    }
    async ModifyInvoker(req, cb) {
        return this.request("ModifyInvoker", req, cb);
    }
    async DescribeInvokers(req, cb) {
        return this.request("DescribeInvokers", req, cb);
    }
    async RunCommand(req, cb) {
        return this.request("RunCommand", req, cb);
    }
}
