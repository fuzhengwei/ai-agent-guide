import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ame.tencentcloudapi.com", "2019-09-16", clientConfig);
    }
    async DescribePackages(req, cb) {
        return this.request("DescribePackages", req, cb);
    }
    async DescribeLyric(req, cb) {
        return this.request("DescribeLyric", req, cb);
    }
    async DescribeItems(req, cb) {
        return this.request("DescribeItems", req, cb);
    }
    async DescribeAuthInfo(req, cb) {
        return this.request("DescribeAuthInfo", req, cb);
    }
    async BatchDescribeKTVMusicDetails(req, cb) {
        return this.request("BatchDescribeKTVMusicDetails", req, cb);
    }
    async DescribeCloudMusicPurchased(req, cb) {
        return this.request("DescribeCloudMusicPurchased", req, cb);
    }
    async DescribePkgOfflineMusic(req, cb) {
        return this.request("DescribePkgOfflineMusic", req, cb);
    }
    async DescribeKTVSingerMusics(req, cb) {
        return this.request("DescribeKTVSingerMusics", req, cb);
    }
    async DescribeMusic(req, cb) {
        return this.request("DescribeMusic", req, cb);
    }
    async DescribeKTVSuggestions(req, cb) {
        return this.request("DescribeKTVSuggestions", req, cb);
    }
    async ModifyMusicOnShelves(req, cb) {
        return this.request("ModifyMusicOnShelves", req, cb);
    }
    async DescribeKTVMusicTags(req, cb) {
        return this.request("DescribeKTVMusicTags", req, cb);
    }
    async DescribePackageItems(req, cb) {
        return this.request("DescribePackageItems", req, cb);
    }
    async TakeMusicOffShelves(req, cb) {
        return this.request("TakeMusicOffShelves", req, cb);
    }
    async DescribeKTVPlaylists(req, cb) {
        return this.request("DescribeKTVPlaylists", req, cb);
    }
    async CreateKTVRobot(req, cb) {
        return this.request("CreateKTVRobot", req, cb);
    }
    async SyncKTVRobotCommand(req, cb) {
        return this.request("SyncKTVRobotCommand", req, cb);
    }
    async DescribeKTVTopList(req, cb) {
        return this.request("DescribeKTVTopList", req, cb);
    }
    async DescribeKTVPlaylistDetail(req, cb) {
        return this.request("DescribeKTVPlaylistDetail", req, cb);
    }
    async ReportData(req, cb) {
        return this.request("ReportData", req, cb);
    }
    async DescribeKTVSingerCategories(req, cb) {
        return this.request("DescribeKTVSingerCategories", req, cb);
    }
    async DescribeStations(req, cb) {
        return this.request("DescribeStations", req, cb);
    }
    async DescribeKTVMusicDetail(req, cb) {
        return this.request("DescribeKTVMusicDetail", req, cb);
    }
    async DescribeItemById(req, cb) {
        return this.request("DescribeItemById", req, cb);
    }
    async DescribeMusicSaleStatus(req, cb) {
        return this.request("DescribeMusicSaleStatus", req, cb);
    }
    async DescribeKTVSingers(req, cb) {
        return this.request("DescribeKTVSingers", req, cb);
    }
    async DestroyKTVRobot(req, cb) {
        return this.request("DestroyKTVRobot", req, cb);
    }
    async DescribeCloudMusic(req, cb) {
        return this.request("DescribeCloudMusic", req, cb);
    }
    async PutMusicOnTheShelves(req, cb) {
        return this.request("PutMusicOnTheShelves", req, cb);
    }
    async DescribeKTVRobots(req, cb) {
        return this.request("DescribeKTVRobots", req, cb);
    }
    async SearchKTVMusics(req, cb) {
        return this.request("SearchKTVMusics", req, cb);
    }
}
