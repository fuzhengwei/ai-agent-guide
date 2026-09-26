import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("npp.tencentcloudapi.com", "2019-08-23", clientConfig);
    }
    async DeleteCallBack(req, cb) {
        return this.request("DeleteCallBack", req, cb);
    }
    async DescribeCallerDisplayList(req, cb) {
        return this.request("DescribeCallerDisplayList", req, cb);
    }
    async DelVirtualNum(req, cb) {
        return this.request("DelVirtualNum", req, cb);
    }
    async GetVirtualNum(req, cb) {
        return this.request("GetVirtualNum", req, cb);
    }
    async Get400Cdr(req, cb) {
        return this.request("Get400Cdr", req, cb);
    }
    async DescribeCallBackStatus(req, cb) {
        return this.request("DescribeCallBackStatus", req, cb);
    }
    async CreateCallBack(req, cb) {
        return this.request("CreateCallBack", req, cb);
    }
    async DescribeCallBackCdr(req, cb) {
        return this.request("DescribeCallBackCdr", req, cb);
    }
}
