import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ivld.tencentcloudapi.com", "2021-09-03", clientConfig);
    }
    async CreateTask(req, cb) {
        return this.request("CreateTask", req, cb);
    }
    async ImportMedia(req, cb) {
        return this.request("ImportMedia", req, cb);
    }
    async CreateCustomPerson(req, cb) {
        return this.request("CreateCustomPerson", req, cb);
    }
    async DeleteCustomPersonImage(req, cb) {
        return this.request("DeleteCustomPersonImage", req, cb);
    }
    async QueryCallback(req, cb) {
        return this.request("QueryCallback", req, cb);
    }
    async UpdateCustomCategory(req, cb) {
        return this.request("UpdateCustomCategory", req, cb);
    }
    async UpdateCustomPerson(req, cb) {
        return this.request("UpdateCustomPerson", req, cb);
    }
    async DescribeVideoSummaryDetail(req, cb) {
        return this.request("DescribeVideoSummaryDetail", req, cb);
    }
    async DeleteCustomCategory(req, cb) {
        return this.request("DeleteCustomCategory", req, cb);
    }
    async AddCustomPersonImage(req, cb) {
        return this.request("AddCustomPersonImage", req, cb);
    }
    async DescribeTaskDetail(req, cb) {
        return this.request("DescribeTaskDetail", req, cb);
    }
    async CreateDefaultCategories(req, cb) {
        return this.request("CreateDefaultCategories", req, cb);
    }
    async DescribeTask(req, cb) {
        return this.request("DescribeTask", req, cb);
    }
    async CreateVideoSummaryTask(req, cb) {
        return this.request("CreateVideoSummaryTask", req, cb);
    }
    async DescribeCustomPersonDetail(req, cb) {
        return this.request("DescribeCustomPersonDetail", req, cb);
    }
    async CreateCustomCategory(req, cb) {
        return this.request("CreateCustomCategory", req, cb);
    }
    async DescribeCustomPersons(req, cb) {
        return this.request("DescribeCustomPersons", req, cb);
    }
    async DeleteCustomPerson(req, cb) {
        return this.request("DeleteCustomPerson", req, cb);
    }
    async DescribeMedia(req, cb) {
        return this.request("DescribeMedia", req, cb);
    }
    async DescribeUsageAmount(req, cb) {
        return this.request("DescribeUsageAmount", req, cb);
    }
    async DeleteMedia(req, cb) {
        return this.request("DeleteMedia", req, cb);
    }
    async ModifyCallback(req, cb) {
        return this.request("ModifyCallback", req, cb);
    }
    async DescribeTasks(req, cb) {
        return this.request("DescribeTasks", req, cb);
    }
    async CreateCustomGroup(req, cb) {
        return this.request("CreateCustomGroup", req, cb);
    }
    async DescribeCustomCategories(req, cb) {
        return this.request("DescribeCustomCategories", req, cb);
    }
    async DeleteTask(req, cb) {
        return this.request("DeleteTask", req, cb);
    }
    async DescribeCustomGroup(req, cb) {
        return this.request("DescribeCustomGroup", req, cb);
    }
    async DescribeMedias(req, cb) {
        return this.request("DescribeMedias", req, cb);
    }
}
