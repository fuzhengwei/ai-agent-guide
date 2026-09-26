import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("bma.tencentcloudapi.com", "2021-06-24", clientConfig);
    }
    async UpdateCRWork(req, cb) {
        return this.request("UpdateCRWork", req, cb);
    }
    async CreateCRDesktopCode(req, cb) {
        return this.request("CreateCRDesktopCode", req, cb);
    }
    async DescribeBPCompanyInfo(req, cb) {
        return this.request("DescribeBPCompanyInfo", req, cb);
    }
    async CreateCRUserVerify(req, cb) {
        return this.request("CreateCRUserVerify", req, cb);
    }
    async CreateCRWork(req, cb) {
        return this.request("CreateCRWork", req, cb);
    }
    async CreateBPOfflineTicket(req, cb) {
        return this.request("CreateBPOfflineTicket", req, cb);
    }
    async DescribeCRObtainDetail(req, cb) {
        return this.request("DescribeCRObtainDetail", req, cb);
    }
    async CreateCRBlock(req, cb) {
        return this.request("CreateCRBlock", req, cb);
    }
    async ModifyCRObtainStatus(req, cb) {
        return this.request("ModifyCRObtainStatus", req, cb);
    }
    async CreateCRRight(req, cb) {
        return this.request("CreateCRRight", req, cb);
    }
    async ModifyBPOfflineAttachment(req, cb) {
        return this.request("ModifyBPOfflineAttachment", req, cb);
    }
    async ModifyCRMonitor(req, cb) {
        return this.request("ModifyCRMonitor", req, cb);
    }
    async DescribeCRMonitorDetail(req, cb) {
        return this.request("DescribeCRMonitorDetail", req, cb);
    }
    async CreateBPFakeURL(req, cb) {
        return this.request("CreateBPFakeURL", req, cb);
    }
    async CreateCRRightFile(req, cb) {
        return this.request("CreateCRRightFile", req, cb);
    }
    async ModifyCRWhiteList(req, cb) {
        return this.request("ModifyCRWhiteList", req, cb);
    }
    async ModifyCRBlockStatus(req, cb) {
        return this.request("ModifyCRBlockStatus", req, cb);
    }
    async CreateBPFalseTicket(req, cb) {
        return this.request("CreateBPFalseTicket", req, cb);
    }
    async CreateBPProtectURLs(req, cb) {
        return this.request("CreateBPProtectURLs", req, cb);
    }
    async DescribeBPReportFakeURLs(req, cb) {
        return this.request("DescribeBPReportFakeURLs", req, cb);
    }
    async DescribeBPFakeURLs(req, cb) {
        return this.request("DescribeBPFakeURLs", req, cb);
    }
    async DescribeCRWorkInfo(req, cb) {
        return this.request("DescribeCRWorkInfo", req, cb);
    }
    async DescribeCRMonitors(req, cb) {
        return this.request("DescribeCRMonitors", req, cb);
    }
    async ModifyCRRightStatus(req, cb) {
        return this.request("ModifyCRRightStatus", req, cb);
    }
    async CreateBPOfflineAttachment(req, cb) {
        return this.request("CreateBPOfflineAttachment", req, cb);
    }
    async DescribeBPProtectURLs(req, cb) {
        return this.request("DescribeBPProtectURLs", req, cb);
    }
    async CreateCRTort(req, cb) {
        return this.request("CreateCRTort", req, cb);
    }
    async CreateCRCompanyVerify(req, cb) {
        return this.request("CreateCRCompanyVerify", req, cb);
    }
}
