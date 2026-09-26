import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ses.tencentcloudapi.com", "2020-10-02", clientConfig);
    }
    async ListEmailIdentities(req, cb) {
        return this.request("ListEmailIdentities", req, cb);
    }
    async CreateEmailAddress(req, cb) {
        return this.request("CreateEmailAddress", req, cb);
    }
    async CreateReceiverDetailWithData(req, cb) {
        return this.request("CreateReceiverDetailWithData", req, cb);
    }
    async GetSendEmailStatus(req, cb) {
        return this.request("GetSendEmailStatus", req, cb);
    }
    async ListReceiverDetails(req, cb) {
        return this.request("ListReceiverDetails", req, cb);
    }
    async CreateReceiver(req, cb) {
        return this.request("CreateReceiver", req, cb);
    }
    async GetEmailTemplate(req, cb) {
        return this.request("GetEmailTemplate", req, cb);
    }
    async GetEmailIdentity(req, cb) {
        return this.request("GetEmailIdentity", req, cb);
    }
    async UpdateCustomBlackList(req, cb) {
        return this.request("UpdateCustomBlackList", req, cb);
    }
    async GetStatisticsReport(req, cb) {
        return this.request("GetStatisticsReport", req, cb);
    }
    async CreateAddressUnsubscribeConfig(req, cb) {
        return this.request("CreateAddressUnsubscribeConfig", req, cb);
    }
    async ListAddressUnsubscribeConfig(req, cb) {
        return this.request("ListAddressUnsubscribeConfig", req, cb);
    }
    async UpdateEmailTemplate(req, cb) {
        return this.request("UpdateEmailTemplate", req, cb);
    }
    async UpdateEmailIdentity(req, cb) {
        return this.request("UpdateEmailIdentity", req, cb);
    }
    async DeleteEmailIdentity(req, cb) {
        return this.request("DeleteEmailIdentity", req, cb);
    }
    async ListEmailAddress(req, cb) {
        return this.request("ListEmailAddress", req, cb);
    }
    async DeleteReceiver(req, cb) {
        return this.request("DeleteReceiver", req, cb);
    }
    async CreateEmailTemplate(req, cb) {
        return this.request("CreateEmailTemplate", req, cb);
    }
    async BatchSendEmail(req, cb) {
        return this.request("BatchSendEmail", req, cb);
    }
    async UpdateEmailSmtpPassWord(req, cb) {
        return this.request("UpdateEmailSmtpPassWord", req, cb);
    }
    async UpdateAddressUnsubscribeConfig(req, cb) {
        return this.request("UpdateAddressUnsubscribeConfig", req, cb);
    }
    async CreateCustomBlacklist(req, cb) {
        return this.request("CreateCustomBlacklist", req, cb);
    }
    async DeleteEmailTemplate(req, cb) {
        return this.request("DeleteEmailTemplate", req, cb);
    }
    async DeleteAddressUnsubscribeConfig(req, cb) {
        return this.request("DeleteAddressUnsubscribeConfig", req, cb);
    }
    async ListEmailTemplates(req, cb) {
        return this.request("ListEmailTemplates", req, cb);
    }
    async ListSendTasks(req, cb) {
        return this.request("ListSendTasks", req, cb);
    }
    async CreateEmailIdentity(req, cb) {
        return this.request("CreateEmailIdentity", req, cb);
    }
    async DeleteCustomBlackList(req, cb) {
        return this.request("DeleteCustomBlackList", req, cb);
    }
    async DeleteBlackList(req, cb) {
        return this.request("DeleteBlackList", req, cb);
    }
    async SendEmail(req, cb) {
        return this.request("SendEmail", req, cb);
    }
    async GetAbuseReport(req, cb) {
        return this.request("GetAbuseReport", req, cb);
    }
    async ListCustomBlacklist(req, cb) {
        return this.request("ListCustomBlacklist", req, cb);
    }
    async ListBlackEmailAddress(req, cb) {
        return this.request("ListBlackEmailAddress", req, cb);
    }
    async CreateReceiverDetail(req, cb) {
        return this.request("CreateReceiverDetail", req, cb);
    }
    async ListReceivers(req, cb) {
        return this.request("ListReceivers", req, cb);
    }
    async DeleteEmailAddress(req, cb) {
        return this.request("DeleteEmailAddress", req, cb);
    }
}
