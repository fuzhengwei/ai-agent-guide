import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cloudaudit.tencentcloudapi.com", "2019-03-19", clientConfig);
    }
    async ModifyAuditTrack(req, cb) {
        return this.request("ModifyAuditTrack", req, cb);
    }
    async StartLogging(req, cb) {
        return this.request("StartLogging", req, cb);
    }
    async DescribeAuditTrack(req, cb) {
        return this.request("DescribeAuditTrack", req, cb);
    }
    async GetAttributeKey(req, cb) {
        return this.request("GetAttributeKey", req, cb);
    }
    async CreateAuditTrack(req, cb) {
        return this.request("CreateAuditTrack", req, cb);
    }
    async ListCmqEnableRegion(req, cb) {
        return this.request("ListCmqEnableRegion", req, cb);
    }
    async CreateEventsAuditTrack(req, cb) {
        return this.request("CreateEventsAuditTrack", req, cb);
    }
    async DescribeEvents(req, cb) {
        return this.request("DescribeEvents", req, cb);
    }
    async ModifyEventsAuditTrack(req, cb) {
        return this.request("ModifyEventsAuditTrack", req, cb);
    }
    async StopLogging(req, cb) {
        return this.request("StopLogging", req, cb);
    }
    async ListCosEnableRegion(req, cb) {
        return this.request("ListCosEnableRegion", req, cb);
    }
    async DescribeAuditTracks(req, cb) {
        return this.request("DescribeAuditTracks", req, cb);
    }
    async InquireAuditCredit(req, cb) {
        return this.request("InquireAuditCredit", req, cb);
    }
    async UpdateAudit(req, cb) {
        return this.request("UpdateAudit", req, cb);
    }
    async ListKeyAliasByRegion(req, cb) {
        return this.request("ListKeyAliasByRegion", req, cb);
    }
    async DescribeAudit(req, cb) {
        return this.request("DescribeAudit", req, cb);
    }
    async DeleteAuditTrack(req, cb) {
        return this.request("DeleteAuditTrack", req, cb);
    }
    async LookUpEvents(req, cb) {
        return this.request("LookUpEvents", req, cb);
    }
    async ListAudits(req, cb) {
        return this.request("ListAudits", req, cb);
    }
}
