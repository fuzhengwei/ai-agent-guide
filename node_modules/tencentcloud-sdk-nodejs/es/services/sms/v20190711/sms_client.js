import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("sms.tencentcloudapi.com", "2019-07-11", clientConfig);
    }
    async ModifySmsSign(req, cb) {
        return this.request("ModifySmsSign", req, cb);
    }
    async AddSmsSign(req, cb) {
        return this.request("AddSmsSign", req, cb);
    }
    async PullSmsSendStatus(req, cb) {
        return this.request("PullSmsSendStatus", req, cb);
    }
    async SendSms(req, cb) {
        return this.request("SendSms", req, cb);
    }
    async DeleteSmsTemplate(req, cb) {
        return this.request("DeleteSmsTemplate", req, cb);
    }
    async SmsPackagesStatistics(req, cb) {
        return this.request("SmsPackagesStatistics", req, cb);
    }
    async SendStatusStatistics(req, cb) {
        return this.request("SendStatusStatistics", req, cb);
    }
    async CallbackStatusStatistics(req, cb) {
        return this.request("CallbackStatusStatistics", req, cb);
    }
    async DescribeSmsTemplateList(req, cb) {
        return this.request("DescribeSmsTemplateList", req, cb);
    }
    async PullSmsReplyStatus(req, cb) {
        return this.request("PullSmsReplyStatus", req, cb);
    }
    async DescribeSmsSignList(req, cb) {
        return this.request("DescribeSmsSignList", req, cb);
    }
    async PullSmsSendStatusByPhoneNumber(req, cb) {
        return this.request("PullSmsSendStatusByPhoneNumber", req, cb);
    }
    async ModifySmsTemplate(req, cb) {
        return this.request("ModifySmsTemplate", req, cb);
    }
    async PullSmsReplyStatusByPhoneNumber(req, cb) {
        return this.request("PullSmsReplyStatusByPhoneNumber", req, cb);
    }
    async DeleteSmsSign(req, cb) {
        return this.request("DeleteSmsSign", req, cb);
    }
    async AddSmsTemplate(req, cb) {
        return this.request("AddSmsTemplate", req, cb);
    }
}
