import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("weilingwith.tencentcloudapi.com", "2023-04-27", clientConfig);
    }
    async DescribeVideoCloudRecord(req, cb) {
        return this.request("DescribeVideoCloudRecord", req, cb);
    }
    async DescribeBuildingProfile(req, cb) {
        return this.request("DescribeBuildingProfile", req, cb);
    }
    async ChangeAlarmStatus(req, cb) {
        return this.request("ChangeAlarmStatus", req, cb);
    }
    async DescribeLinkRuleList(req, cb) {
        return this.request("DescribeLinkRuleList", req, cb);
    }
    async DescribeElementProfileTree(req, cb) {
        return this.request("DescribeElementProfileTree", req, cb);
    }
    async DescribeAlarmStatusList(req, cb) {
        return this.request("DescribeAlarmStatusList", req, cb);
    }
    async DescribeDeviceStatusStat(req, cb) {
        return this.request("DescribeDeviceStatusStat", req, cb);
    }
    async DescribeSpaceDeviceIdList(req, cb) {
        return this.request("DescribeSpaceDeviceIdList", req, cb);
    }
    async DescribeVideoLiveStream(req, cb) {
        return this.request("DescribeVideoLiveStream", req, cb);
    }
    async DescribeTenantDepartmentList(req, cb) {
        return this.request("DescribeTenantDepartmentList", req, cb);
    }
    async ReportAppMessage(req, cb) {
        return this.request("ReportAppMessage", req, cb);
    }
    async DescribeTenantBuildingCountAndArea(req, cb) {
        return this.request("DescribeTenantBuildingCountAndArea", req, cb);
    }
    async DescribeWorkSpaceBuildingCountAndArea(req, cb) {
        return this.request("DescribeWorkSpaceBuildingCountAndArea", req, cb);
    }
    async DescribeDeviceShadowList(req, cb) {
        return this.request("DescribeDeviceShadowList", req, cb);
    }
    async DescribeDeviceTagList(req, cb) {
        return this.request("DescribeDeviceTagList", req, cb);
    }
    async DeleteDeviceGroup(req, cb) {
        return this.request("DeleteDeviceGroup", req, cb);
    }
    async DescribeAlarmTypeList(req, cb) {
        return this.request("DescribeAlarmTypeList", req, cb);
    }
    async DescribeSpaceTypeList(req, cb) {
        return this.request("DescribeSpaceTypeList", req, cb);
    }
    async ModifyDeviceGroup(req, cb) {
        return this.request("ModifyDeviceGroup", req, cb);
    }
    async DescribeDeviceTypeList(req, cb) {
        return this.request("DescribeDeviceTypeList", req, cb);
    }
    async DescribeSpaceInfoByDeviceId(req, cb) {
        return this.request("DescribeSpaceInfoByDeviceId", req, cb);
    }
    async DescribeWorkspaceList(req, cb) {
        return this.request("DescribeWorkspaceList", req, cb);
    }
    async DescribeRuleDetail(req, cb) {
        return this.request("DescribeRuleDetail", req, cb);
    }
    async UpdateWorkspaceParkAttributes(req, cb) {
        return this.request("UpdateWorkspaceParkAttributes", req, cb);
    }
    async StopVideoStreaming(req, cb) {
        return this.request("StopVideoStreaming", req, cb);
    }
    async DescribeModelList(req, cb) {
        return this.request("DescribeModelList", req, cb);
    }
    async DescribePropertyList(req, cb) {
        return this.request("DescribePropertyList", req, cb);
    }
    async DescribeProductList(req, cb) {
        return this.request("DescribeProductList", req, cb);
    }
    async BatchDeleteDevice(req, cb) {
        return this.request("BatchDeleteDevice", req, cb);
    }
    async DescribeActionList(req, cb) {
        return this.request("DescribeActionList", req, cb);
    }
    async DescribeSceneList(req, cb) {
        return this.request("DescribeSceneList", req, cb);
    }
    async DescribeSpaceRelationByDeviceId(req, cb) {
        return this.request("DescribeSpaceRelationByDeviceId", req, cb);
    }
    async DescribeDeviceList(req, cb) {
        return this.request("DescribeDeviceList", req, cb);
    }
    async BatchKillAlarm(req, cb) {
        return this.request("BatchKillAlarm", req, cb);
    }
    async DescribeWorkspaceUserList(req, cb) {
        return this.request("DescribeWorkspaceUserList", req, cb);
    }
    async ControlDevice(req, cb) {
        return this.request("ControlDevice", req, cb);
    }
    async BatchReportAppMessage(req, cb) {
        return this.request("BatchReportAppMessage", req, cb);
    }
    async DescribeElementProfilePage(req, cb) {
        return this.request("DescribeElementProfilePage", req, cb);
    }
    async ModifyDeviceName(req, cb) {
        return this.request("ModifyDeviceName", req, cb);
    }
    async DescribeEventList(req, cb) {
        return this.request("DescribeEventList", req, cb);
    }
    async DescribeAdministrationByTag(req, cb) {
        return this.request("DescribeAdministrationByTag", req, cb);
    }
    async BatchCreateDevice(req, cb) {
        return this.request("BatchCreateDevice", req, cb);
    }
    async ModifyDeviceTag(req, cb) {
        return this.request("ModifyDeviceTag", req, cb);
    }
    async DescribeCameraExtendInfo(req, cb) {
        return this.request("DescribeCameraExtendInfo", req, cb);
    }
    async DescribeFileDownloadURL(req, cb) {
        return this.request("DescribeFileDownloadURL", req, cb);
    }
    async DescribeEdgeApplicationToken(req, cb) {
        return this.request("DescribeEdgeApplicationToken", req, cb);
    }
    async DescribeBuildingModel(req, cb) {
        return this.request("DescribeBuildingModel", req, cb);
    }
    async DescribeDeviceGroupList(req, cb) {
        return this.request("DescribeDeviceGroupList", req, cb);
    }
    async DescribeSpaceDeviceRelationList(req, cb) {
        return this.request("DescribeSpaceDeviceRelationList", req, cb);
    }
    async DescribeBuildingList(req, cb) {
        return this.request("DescribeBuildingList", req, cb);
    }
    async SaveDeviceGroup(req, cb) {
        return this.request("SaveDeviceGroup", req, cb);
    }
    async ControlCameraPTZ(req, cb) {
        return this.request("ControlCameraPTZ", req, cb);
    }
    async DescribeInterfaceList(req, cb) {
        return this.request("DescribeInterfaceList", req, cb);
    }
    async DescribeVideoRecordStream(req, cb) {
        return this.request("DescribeVideoRecordStream", req, cb);
    }
    async DescribeAlarmList(req, cb) {
        return this.request("DescribeAlarmList", req, cb);
    }
    async DescribeApplicationList(req, cb) {
        return this.request("DescribeApplicationList", req, cb);
    }
    async AddAlarmProcessRecord(req, cb) {
        return this.request("AddAlarmProcessRecord", req, cb);
    }
    async DescribeFileUploadURL(req, cb) {
        return this.request("DescribeFileUploadURL", req, cb);
    }
    async DescribeTenantUserList(req, cb) {
        return this.request("DescribeTenantUserList", req, cb);
    }
    async DescribeAlarmLevelList(req, cb) {
        return this.request("DescribeAlarmLevelList", req, cb);
    }
    async CreateApplicationToken(req, cb) {
        return this.request("CreateApplicationToken", req, cb);
    }
    async DescribeDeviceStatusList(req, cb) {
        return this.request("DescribeDeviceStatusList", req, cb);
    }
    async ModifyDeviceField(req, cb) {
        return this.request("ModifyDeviceField", req, cb);
    }
}
