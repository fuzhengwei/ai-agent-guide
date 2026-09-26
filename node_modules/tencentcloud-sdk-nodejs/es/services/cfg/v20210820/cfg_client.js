import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cfg.tencentcloudapi.com", "2021-08-20", clientConfig);
    }
    async DescribeObjectTypeList(req, cb) {
        return this.request("DescribeObjectTypeList", req, cb);
    }
    async CreateTaskFromTemplate(req, cb) {
        return this.request("CreateTaskFromTemplate", req, cb);
    }
    async CreateTaskFromMultiAction(req, cb) {
        return this.request("CreateTaskFromMultiAction", req, cb);
    }
    async ExecuteTaskInstance(req, cb) {
        return this.request("ExecuteTaskInstance", req, cb);
    }
    async DescribeTemplateList(req, cb) {
        return this.request("DescribeTemplateList", req, cb);
    }
    async ModifyTaskRunStatus(req, cb) {
        return this.request("ModifyTaskRunStatus", req, cb);
    }
    async ExecuteTask(req, cb) {
        return this.request("ExecuteTask", req, cb);
    }
    async CreateTaskFromAction(req, cb) {
        return this.request("CreateTaskFromAction", req, cb);
    }
    async TriggerPolicy(req, cb) {
        return this.request("TriggerPolicy", req, cb);
    }
    async DescribeTaskList(req, cb) {
        return this.request("DescribeTaskList", req, cb);
    }
    async DescribeTaskPolicyTriggerLog(req, cb) {
        return this.request("DescribeTaskPolicyTriggerLog", req, cb);
    }
    async DescribeTaskExecuteLogs(req, cb) {
        return this.request("DescribeTaskExecuteLogs", req, cb);
    }
    async DeleteTask(req, cb) {
        return this.request("DeleteTask", req, cb);
    }
    async DescribeActionLibraryList(req, cb) {
        return this.request("DescribeActionLibraryList", req, cb);
    }
    async DescribeActionFieldConfigList(req, cb) {
        return this.request("DescribeActionFieldConfigList", req, cb);
    }
    async DescribeTask(req, cb) {
        return this.request("DescribeTask", req, cb);
    }
    async DescribeTemplate(req, cb) {
        return this.request("DescribeTemplate", req, cb);
    }
}
