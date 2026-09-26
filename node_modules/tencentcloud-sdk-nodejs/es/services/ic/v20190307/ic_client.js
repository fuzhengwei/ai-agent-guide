import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ic.tencentcloudapi.com", "2019-03-07", clientConfig);
    }
    async DescribeApp(req, cb) {
        return this.request("DescribeApp", req, cb);
    }
    async DescribeCard(req, cb) {
        return this.request("DescribeCard", req, cb);
    }
    async SendSms(req, cb) {
        return this.request("SendSms", req, cb);
    }
    async SendMultiSms(req, cb) {
        return this.request("SendMultiSms", req, cb);
    }
    async ModifyUserCardRemark(req, cb) {
        return this.request("ModifyUserCardRemark", req, cb);
    }
    async DescribeSms(req, cb) {
        return this.request("DescribeSms", req, cb);
    }
    async PayForExtendData(req, cb) {
        return this.request("PayForExtendData", req, cb);
    }
    async RenewCards(req, cb) {
        return this.request("RenewCards", req, cb);
    }
    async DescribeCards(req, cb) {
        return this.request("DescribeCards", req, cb);
    }
}
