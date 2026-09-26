import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("yinsuda.tencentcloudapi.com", "2022-05-27", clientConfig);
    }
    async CreateKTVRobot(req, cb) {
        return this.request("CreateKTVRobot", req, cb);
    }
    async RechargeLiveVip(req, cb) {
        return this.request("RechargeLiveVip", req, cb);
    }
    async DescribeKTVTags(req, cb) {
        return this.request("DescribeKTVTags", req, cb);
    }
    async RechargeVip(req, cb) {
        return this.request("RechargeVip", req, cb);
    }
    async DescribeKTVPlaylistDetail(req, cb) {
        return this.request("DescribeKTVPlaylistDetail", req, cb);
    }
    async DescribeVipUserInfo(req, cb) {
        return this.request("DescribeVipUserInfo", req, cb);
    }
    async DestroyKTVRobot(req, cb) {
        return this.request("DestroyKTVRobot", req, cb);
    }
    async DescribeKTVMusicAccompanySegmentUrlVip(req, cb) {
        return this.request("DescribeKTVMusicAccompanySegmentUrlVip", req, cb);
    }
    async DescribeKTVSuggestions(req, cb) {
        return this.request("DescribeKTVSuggestions", req, cb);
    }
    async DescribeUserInfo(req, cb) {
        return this.request("DescribeUserInfo", req, cb);
    }
    async DescribeLiveVipTradeInfos(req, cb) {
        return this.request("DescribeLiveVipTradeInfos", req, cb);
    }
    async BatchDescribeKTVMusicDetails(req, cb) {
        return this.request("BatchDescribeKTVMusicDetails", req, cb);
    }
    async DescribeKTVPlaylists(req, cb) {
        return this.request("DescribeKTVPlaylists", req, cb);
    }
    async ApplyChorus(req, cb) {
        return this.request("ApplyChorus", req, cb);
    }
    async DescribeKTVRobots(req, cb) {
        return this.request("DescribeKTVRobots", req, cb);
    }
    async DescribeKTVMusicAccompanySegmentUrl(req, cb) {
        return this.request("DescribeKTVMusicAccompanySegmentUrl", req, cb);
    }
    async SyncKTVRobotCommand(req, cb) {
        return this.request("SyncKTVRobotCommand", req, cb);
    }
    async DescribeKTVMatchMusics(req, cb) {
        return this.request("DescribeKTVMatchMusics", req, cb);
    }
    async SearchKTVMusics(req, cb) {
        return this.request("SearchKTVMusics", req, cb);
    }
    async DescribeKTVMusicsByTag(req, cb) {
        return this.request("DescribeKTVMusicsByTag", req, cb);
    }
}
