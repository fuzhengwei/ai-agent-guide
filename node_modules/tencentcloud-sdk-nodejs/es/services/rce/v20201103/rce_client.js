import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("rce.tencentcloudapi.com", "2020-11-03", clientConfig);
    }
    async ModifyNameListData(req, cb) {
        return this.request("ModifyNameListData", req, cb);
    }
    async DeleteNameListData(req, cb) {
        return this.request("DeleteNameListData", req, cb);
    }
    async DescribeNameListDataList(req, cb) {
        return this.request("DescribeNameListDataList", req, cb);
    }
    async DescribeNameListDetail(req, cb) {
        return this.request("DescribeNameListDetail", req, cb);
    }
    async ManageMarketingRisk(req, cb) {
        return this.request("ManageMarketingRisk", req, cb);
    }
    async ModifyNameList(req, cb) {
        return this.request("ModifyNameList", req, cb);
    }
    async CreateNameList(req, cb) {
        return this.request("CreateNameList", req, cb);
    }
    async DeleteNameList(req, cb) {
        return this.request("DeleteNameList", req, cb);
    }
    async DescribeUserUsageCnt(req, cb) {
        return this.request("DescribeUserUsageCnt", req, cb);
    }
    async ImportNameListData(req, cb) {
        return this.request("ImportNameListData", req, cb);
    }
    async DescribeNameList(req, cb) {
        return this.request("DescribeNameList", req, cb);
    }
}
