import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("iotvideoindustry.tencentcloudapi.com", "2020-12-01", clientConfig);
    }
    async DescribeIPCChannels(req, cb) {
        return this.request("DescribeIPCChannels", req, cb);
    }
    async ModifyVideoInfo(req, cb) {
        return this.request("ModifyVideoInfo", req, cb);
    }
    async DescribeSubGroups(req, cb) {
        return this.request("DescribeSubGroups", req, cb);
    }
    async DescribeStatisticSummary(req, cb) {
        return this.request("DescribeStatisticSummary", req, cb);
    }
    async CreateScene(req, cb) {
        return this.request("CreateScene", req, cb);
    }
    async DescribeScene(req, cb) {
        return this.request("DescribeScene", req, cb);
    }
    async DescribeDevice(req, cb) {
        return this.request("DescribeDevice", req, cb);
    }
    async ModifyBindRecordingPlan(req, cb) {
        return this.request("ModifyBindRecordingPlan", req, cb);
    }
    async DescribeVideoListByChannel(req, cb) {
        return this.request("DescribeVideoListByChannel", req, cb);
    }
    async DescribeLiveStream(req, cb) {
        return this.request("DescribeLiveStream", req, cb);
    }
    async ModifyScene(req, cb) {
        return this.request("ModifyScene", req, cb);
    }
    async DescribeRecordingPlanById(req, cb) {
        return this.request("DescribeRecordingPlanById", req, cb);
    }
    async DescribeGroupDevices(req, cb) {
        return this.request("DescribeGroupDevices", req, cb);
    }
    async DescribeCurrentDeviceData(req, cb) {
        return this.request("DescribeCurrentDeviceData", req, cb);
    }
    async DescribeDeviceStreams(req, cb) {
        return this.request("DescribeDeviceStreams", req, cb);
    }
    async GetVideoListByCon(req, cb) {
        return this.request("GetVideoListByCon", req, cb);
    }
    async DescribeRecordingPlans(req, cb) {
        return this.request("DescribeRecordingPlans", req, cb);
    }
    async DescribeDeviceGroup(req, cb) {
        return this.request("DescribeDeviceGroup", req, cb);
    }
    async DeleteRecordPlan(req, cb) {
        return this.request("DeleteRecordPlan", req, cb);
    }
    async CreateMessageForward(req, cb) {
        return this.request("CreateMessageForward", req, cb);
    }
    async DeleteTimeTemplate(req, cb) {
        return this.request("DeleteTimeTemplate", req, cb);
    }
    async DescribeChannels(req, cb) {
        return this.request("DescribeChannels", req, cb);
    }
    async ModifyLiveChannel(req, cb) {
        return this.request("ModifyLiveChannel", req, cb);
    }
    async ResetWarning(req, cb) {
        return this.request("ResetWarning", req, cb);
    }
    async ControlDevicePTZ(req, cb) {
        return this.request("ControlDevicePTZ", req, cb);
    }
    async GetRecordDatesByDev(req, cb) {
        return this.request("GetRecordDatesByDev", req, cb);
    }
    async ControlHomePosition(req, cb) {
        return this.request("ControlHomePosition", req, cb);
    }
    async DescribeStatisticDetails(req, cb) {
        return this.request("DescribeStatisticDetails", req, cb);
    }
    async DescribeGroupById(req, cb) {
        return this.request("DescribeGroupById", req, cb);
    }
    async CreateTimeTemplate(req, cb) {
        return this.request("CreateTimeTemplate", req, cb);
    }
    async CreateDeviceGroup(req, cb) {
        return this.request("CreateDeviceGroup", req, cb);
    }
    async ControlChannelLocalRecord(req, cb) {
        return this.request("ControlChannelLocalRecord", req, cb);
    }
    async DescribeChannelLocalRecordURL(req, cb) {
        return this.request("DescribeChannelLocalRecordURL", req, cb);
    }
    async UpdateDevicePassWord(req, cb) {
        return this.request("UpdateDevicePassWord", req, cb);
    }
    async ModifySubscriptionStatus(req, cb) {
        return this.request("ModifySubscriptionStatus", req, cb);
    }
    async DescribeWarnMod(req, cb) {
        return this.request("DescribeWarnMod", req, cb);
    }
    async ModifyBindPlanLiveChannel(req, cb) {
        return this.request("ModifyBindPlanLiveChannel", req, cb);
    }
    async DescribeDeviceEvent(req, cb) {
        return this.request("DescribeDeviceEvent", req, cb);
    }
    async ModifyLiveRecordPlan(req, cb) {
        return this.request("ModifyLiveRecordPlan", req, cb);
    }
    async DeleteChannel(req, cb) {
        return this.request("DeleteChannel", req, cb);
    }
    async DescribeChannelsByLiveRecordPlan(req, cb) {
        return this.request("DescribeChannelsByLiveRecordPlan", req, cb);
    }
    async ModifyBindSceneDevice(req, cb) {
        return this.request("ModifyBindSceneDevice", req, cb);
    }
    async DescribeRecordDatesByLive(req, cb) {
        return this.request("DescribeRecordDatesByLive", req, cb);
    }
    async DescribeChannelLiveStreamURL(req, cb) {
        return this.request("DescribeChannelLiveStreamURL", req, cb);
    }
    async DescribeSubscriptionStatus(req, cb) {
        return this.request("DescribeSubscriptionStatus", req, cb);
    }
    async CreateDevice(req, cb) {
        return this.request("CreateDevice", req, cb);
    }
    async DeleteWarning(req, cb) {
        return this.request("DeleteWarning", req, cb);
    }
    async DescribeGroups(req, cb) {
        return this.request("DescribeGroups", req, cb);
    }
    async DescribeLiveRecordPlanIds(req, cb) {
        return this.request("DescribeLiveRecordPlanIds", req, cb);
    }
    async ControlPreset(req, cb) {
        return this.request("ControlPreset", req, cb);
    }
    async CreateRecordPlan(req, cb) {
        return this.request("CreateRecordPlan", req, cb);
    }
    async UpdateDeviceGroup(req, cb) {
        return this.request("UpdateDeviceGroup", req, cb);
    }
    async DeleteVideoList(req, cb) {
        return this.request("DeleteVideoList", req, cb);
    }
    async DescribeBindSceneDevices(req, cb) {
        return this.request("DescribeBindSceneDevices", req, cb);
    }
    async UpdateTimeTemplate(req, cb) {
        return this.request("UpdateTimeTemplate", req, cb);
    }
    async CreateRecordingPlan(req, cb) {
        return this.request("CreateRecordingPlan", req, cb);
    }
    async DescribeDeviceMonitorData(req, cb) {
        return this.request("DescribeDeviceMonitorData", req, cb);
    }
    async GetTimeTemplateById(req, cb) {
        return this.request("GetTimeTemplateById", req, cb);
    }
    async DescribeMessageForwards(req, cb) {
        return this.request("DescribeMessageForwards", req, cb);
    }
    async DescribePresetList(req, cb) {
        return this.request("DescribePresetList", req, cb);
    }
    async ModifyMessageForward(req, cb) {
        return this.request("ModifyMessageForward", req, cb);
    }
    async DescribeDeviceList(req, cb) {
        return this.request("DescribeDeviceList", req, cb);
    }
    async CreateLiveRecordPlan(req, cb) {
        return this.request("CreateLiveRecordPlan", req, cb);
    }
    async DescribeMessageForward(req, cb) {
        return this.request("DescribeMessageForward", req, cb);
    }
    async GetTimeTemplates(req, cb) {
        return this.request("GetTimeTemplates", req, cb);
    }
    async DescribeAbnormalEvents(req, cb) {
        return this.request("DescribeAbnormalEvents", req, cb);
    }
    async GetRecordPlanById(req, cb) {
        return this.request("GetRecordPlanById", req, cb);
    }
    async DescribeRecordStream(req, cb) {
        return this.request("DescribeRecordStream", req, cb);
    }
    async DeleteLiveRecordPlan(req, cb) {
        return this.request("DeleteLiveRecordPlan", req, cb);
    }
    async DescribeMonitorDataByDate(req, cb) {
        return this.request("DescribeMonitorDataByDate", req, cb);
    }
    async DescribeWarnings(req, cb) {
        return this.request("DescribeWarnings", req, cb);
    }
    async DeleteDeviceGroup(req, cb) {
        return this.request("DeleteDeviceGroup", req, cb);
    }
    async ModifyRecordingPlan(req, cb) {
        return this.request("ModifyRecordingPlan", req, cb);
    }
    async DescribeChannelStreamURL(req, cb) {
        return this.request("DescribeChannelStreamURL", req, cb);
    }
    async DescribeLiveChannel(req, cb) {
        return this.request("DescribeLiveChannel", req, cb);
    }
    async DescribeAllDeviceList(req, cb) {
        return this.request("DescribeAllDeviceList", req, cb);
    }
    async DeleteScene(req, cb) {
        return this.request("DeleteScene", req, cb);
    }
    async CreateLiveChannel(req, cb) {
        return this.request("CreateLiveChannel", req, cb);
    }
    async DescribeBindSceneChannels(req, cb) {
        return this.request("DescribeBindSceneChannels", req, cb);
    }
    async UpdateRecordPlan(req, cb) {
        return this.request("UpdateRecordPlan", req, cb);
    }
    async DeleteRecordingPlan(req, cb) {
        return this.request("DeleteRecordingPlan", req, cb);
    }
    async ControlChannelPTZ(req, cb) {
        return this.request("ControlChannelPTZ", req, cb);
    }
    async ControlRecordStream(req, cb) {
        return this.request("ControlRecordStream", req, cb);
    }
    async DescribeLiveVideoList(req, cb) {
        return this.request("DescribeLiveVideoList", req, cb);
    }
    async ModifyBindSceneChannels(req, cb) {
        return this.request("ModifyBindSceneChannels", req, cb);
    }
    async DescribeDevicePassWord(req, cb) {
        return this.request("DescribeDevicePassWord", req, cb);
    }
    async DescribeLiveChannelList(req, cb) {
        return this.request("DescribeLiveChannelList", req, cb);
    }
    async DeleteMessageForward(req, cb) {
        return this.request("DeleteMessageForward", req, cb);
    }
    async ModifyPreset(req, cb) {
        return this.request("ModifyPreset", req, cb);
    }
    async DeleteDevice(req, cb) {
        return this.request("DeleteDevice", req, cb);
    }
    async ModifyDeviceData(req, cb) {
        return this.request("ModifyDeviceData", req, cb);
    }
    async DescribeGroupByPath(req, cb) {
        return this.request("DescribeGroupByPath", req, cb);
    }
    async DeleteLiveChannel(req, cb) {
        return this.request("DeleteLiveChannel", req, cb);
    }
    async GetRecordPlans(req, cb) {
        return this.request("GetRecordPlans", req, cb);
    }
    async GetRecordPlanByDev(req, cb) {
        return this.request("GetRecordPlanByDev", req, cb);
    }
    async DescribeSIPServer(req, cb) {
        return this.request("DescribeSIPServer", req, cb);
    }
    async DeleteLiveVideoList(req, cb) {
        return this.request("DeleteLiveVideoList", req, cb);
    }
    async DescribeVideoList(req, cb) {
        return this.request("DescribeVideoList", req, cb);
    }
    async ModifyLiveVideo(req, cb) {
        return this.request("ModifyLiveVideo", req, cb);
    }
    async DescribeXP2PData(req, cb) {
        return this.request("DescribeXP2PData", req, cb);
    }
    async DescribeScenes(req, cb) {
        return this.request("DescribeScenes", req, cb);
    }
    async BindGroupDevices(req, cb) {
        return this.request("BindGroupDevices", req, cb);
    }
    async DescribeLiveRecordPlanById(req, cb) {
        return this.request("DescribeLiveRecordPlanById", req, cb);
    }
    async DescribeRecordDatesByChannel(req, cb) {
        return this.request("DescribeRecordDatesByChannel", req, cb);
    }
}
