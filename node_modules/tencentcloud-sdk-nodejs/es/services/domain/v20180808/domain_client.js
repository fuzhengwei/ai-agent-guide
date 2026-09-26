import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("domain.tencentcloudapi.com", "2018-08-08", clientConfig);
    }
    async TransferProhibitionBatch(req, cb) {
        return this.request("TransferProhibitionBatch", req, cb);
    }
    async DescribeBiddingAppointList(req, cb) {
        return this.request("DescribeBiddingAppointList", req, cb);
    }
    async BiddingPreRelease(req, cb) {
        return this.request("BiddingPreRelease", req, cb);
    }
    async SetDomainAutoRenew(req, cb) {
        return this.request("SetDomainAutoRenew", req, cb);
    }
    async DescribeReservedBidInfo(req, cb) {
        return this.request("DescribeReservedBidInfo", req, cb);
    }
    async ModifyCustomDnsHost(req, cb) {
        return this.request("ModifyCustomDnsHost", req, cb);
    }
    async CheckBatchStatus(req, cb) {
        return this.request("CheckBatchStatus", req, cb);
    }
    async UploadImage(req, cb) {
        return this.request("UploadImage", req, cb);
    }
    async DeletePhoneEmail(req, cb) {
        return this.request("DeletePhoneEmail", req, cb);
    }
    async DescribePreDomainList(req, cb) {
        return this.request("DescribePreDomainList", req, cb);
    }
    async BidPreDomains(req, cb) {
        return this.request("BidPreDomains", req, cb);
    }
    async DescribeCustomDnsHostSet(req, cb) {
        return this.request("DescribeCustomDnsHostSet", req, cb);
    }
    async DescribeDomainNameList(req, cb) {
        return this.request("DescribeDomainNameList", req, cb);
    }
    async ModifyIntlCustomDnsHost(req, cb) {
        return this.request("ModifyIntlCustomDnsHost", req, cb);
    }
    async DescribeDomainSimpleInfo(req, cb) {
        return this.request("DescribeDomainSimpleInfo", req, cb);
    }
    async CreateDomainBatch(req, cb) {
        return this.request("CreateDomainBatch", req, cb);
    }
    async DescribeDomainBaseInfo(req, cb) {
        return this.request("DescribeDomainBaseInfo", req, cb);
    }
    async DescribeBatchOperationLogDetails(req, cb) {
        return this.request("DescribeBatchOperationLogDetails", req, cb);
    }
    async DeleteTemplate(req, cb) {
        return this.request("DeleteTemplate", req, cb);
    }
    async DescribeTldList(req, cb) {
        return this.request("DescribeTldList", req, cb);
    }
    async DescribeBiddingSuccessfulList(req, cb) {
        return this.request("DescribeBiddingSuccessfulList", req, cb);
    }
    async ModifyDomainOwner(req, cb) {
        return this.request("ModifyDomainOwner", req, cb);
    }
    async CheckDomain(req, cb) {
        return this.request("CheckDomain", req, cb);
    }
    async ReservedPreDomains(req, cb) {
        return this.request("ReservedPreDomains", req, cb);
    }
    async SyncCustomDnsHost(req, cb) {
        return this.request("SyncCustomDnsHost", req, cb);
    }
    async DescribePreAuctionList(req, cb) {
        return this.request("DescribePreAuctionList", req, cb);
    }
    async ModifyDomainDNSBatch(req, cb) {
        return this.request("ModifyDomainDNSBatch", req, cb);
    }
    async CreateCustomDnsHost(req, cb) {
        return this.request("CreateCustomDnsHost", req, cb);
    }
    async DescribeTemplate(req, cb) {
        return this.request("DescribeTemplate", req, cb);
    }
    async CreatePhoneEmail(req, cb) {
        return this.request("CreatePhoneEmail", req, cb);
    }
    async CreateDomainRedemption(req, cb) {
        return this.request("CreateDomainRedemption", req, cb);
    }
    async DescribePreReleaseList(req, cb) {
        return this.request("DescribePreReleaseList", req, cb);
    }
    async DescribeAuctionList(req, cb) {
        return this.request("DescribeAuctionList", req, cb);
    }
    async DescribeTemplateList(req, cb) {
        return this.request("DescribeTemplateList", req, cb);
    }
    async DeleteReservedPreDomainInfo(req, cb) {
        return this.request("DeleteReservedPreDomainInfo", req, cb);
    }
    async DeleteBidding(req, cb) {
        return this.request("DeleteBidding", req, cb);
    }
    async ModifyTemplate(req, cb) {
        return this.request("ModifyTemplate", req, cb);
    }
    async BidDetailPage(req, cb) {
        return this.request("BidDetailPage", req, cb);
    }
    async DescribeUnPreDomainDetail(req, cb) {
        return this.request("DescribeUnPreDomainDetail", req, cb);
    }
    async TransferInDomainBatch(req, cb) {
        return this.request("TransferInDomainBatch", req, cb);
    }
    async UpdateProhibitionBatch(req, cb) {
        return this.request("UpdateProhibitionBatch", req, cb);
    }
    async DescribePayWaitDetail(req, cb) {
        return this.request("DescribePayWaitDetail", req, cb);
    }
    async DescribeBiddingList(req, cb) {
        return this.request("DescribeBiddingList", req, cb);
    }
    async CreateTemplate(req, cb) {
        return this.request("CreateTemplate", req, cb);
    }
    async DescribeBiddingDetail(req, cb) {
        return this.request("DescribeBiddingDetail", req, cb);
    }
    async DescribeReservedPreDomainInfo(req, cb) {
        return this.request("DescribeReservedPreDomainInfo", req, cb);
    }
    async DescribeBiddingAppointDetail(req, cb) {
        return this.request("DescribeBiddingAppointDetail", req, cb);
    }
    async DescribePhoneEmailList(req, cb) {
        return this.request("DescribePhoneEmailList", req, cb);
    }
    async SendPhoneEmailCode(req, cb) {
        return this.request("SendPhoneEmailCode", req, cb);
    }
    async ModifyDomainOwnerBatch(req, cb) {
        return this.request("ModifyDomainOwnerBatch", req, cb);
    }
    async RenewDomainBatch(req, cb) {
        return this.request("RenewDomainBatch", req, cb);
    }
    async DeleteCustomDnsHost(req, cb) {
        return this.request("DeleteCustomDnsHost", req, cb);
    }
    async BatchModifyDomainInfo(req, cb) {
        return this.request("BatchModifyDomainInfo", req, cb);
    }
    async DescribeDomainPriceList(req, cb) {
        return this.request("DescribeDomainPriceList", req, cb);
    }
    async DescribeBatchOperationLogs(req, cb) {
        return this.request("DescribeBatchOperationLogs", req, cb);
    }
    async DescribeBiddingSuccessfulDetail(req, cb) {
        return this.request("DescribeBiddingSuccessfulDetail", req, cb);
    }
}
