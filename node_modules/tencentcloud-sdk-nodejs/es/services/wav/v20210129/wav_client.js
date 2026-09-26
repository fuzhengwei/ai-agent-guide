import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("wav.tencentcloudapi.com", "2021-01-29", clientConfig);
    }
    async QueryActivityLiveCodeList(req, cb) {
        return this.request("QueryActivityLiveCodeList", req, cb);
    }
    async QueryActivityList(req, cb) {
        return this.request("QueryActivityList", req, cb);
    }
    async QueryCustomerEventDetailStatistics(req, cb) {
        return this.request("QueryCustomerEventDetailStatistics", req, cb);
    }
    async QueryActivityJoinList(req, cb) {
        return this.request("QueryActivityJoinList", req, cb);
    }
    async QueryArrivalList(req, cb) {
        return this.request("QueryArrivalList", req, cb);
    }
    async QueryChannelCodeList(req, cb) {
        return this.request("QueryChannelCodeList", req, cb);
    }
    async QueryExternalContactList(req, cb) {
        return this.request("QueryExternalContactList", req, cb);
    }
    async QueryCustomerProfileList(req, cb) {
        return this.request("QueryCustomerProfileList", req, cb);
    }
    async QueryUserInfoList(req, cb) {
        return this.request("QueryUserInfoList", req, cb);
    }
    async QueryExternalUserEventList(req, cb) {
        return this.request("QueryExternalUserEventList", req, cb);
    }
    async QueryLicenseInfo(req, cb) {
        return this.request("QueryLicenseInfo", req, cb);
    }
    async QueryFollowList(req, cb) {
        return this.request("QueryFollowList", req, cb);
    }
    async QueryClueInfoList(req, cb) {
        return this.request("QueryClueInfoList", req, cb);
    }
    async QueryExternalContactDetail(req, cb) {
        return this.request("QueryExternalContactDetail", req, cb);
    }
    async QueryVehicleInfoList(req, cb) {
        return this.request("QueryVehicleInfoList", req, cb);
    }
    async QueryStaffEventDetailStatistics(req, cb) {
        return this.request("QueryStaffEventDetailStatistics", req, cb);
    }
    async CreateLead(req, cb) {
        return this.request("CreateLead", req, cb);
    }
    async QueryChatArchivingList(req, cb) {
        return this.request("QueryChatArchivingList", req, cb);
    }
    async CreateCorpTag(req, cb) {
        return this.request("CreateCorpTag", req, cb);
    }
    async CreateChannelCode(req, cb) {
        return this.request("CreateChannelCode", req, cb);
    }
    async QueryMaterialList(req, cb) {
        return this.request("QueryMaterialList", req, cb);
    }
    async QueryCrmStatistics(req, cb) {
        return this.request("QueryCrmStatistics", req, cb);
    }
    async QueryMiniAppCodeList(req, cb) {
        return this.request("QueryMiniAppCodeList", req, cb);
    }
    async QueryDealerInfoList(req, cb) {
        return this.request("QueryDealerInfoList", req, cb);
    }
    async QueryExternalContactDetailByDate(req, cb) {
        return this.request("QueryExternalContactDetailByDate", req, cb);
    }
    async QueryExternalUserMappingInfo(req, cb) {
        return this.request("QueryExternalUserMappingInfo", req, cb);
    }
}
