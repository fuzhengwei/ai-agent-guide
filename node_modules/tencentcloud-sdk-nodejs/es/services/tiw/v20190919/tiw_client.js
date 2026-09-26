import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tiw.tencentcloudapi.com", "2019-09-19", clientConfig);
    }
    async SetOnlineRecordCallback(req, cb) {
        return this.request("SetOnlineRecordCallback", req, cb);
    }
    async SetVideoGenerationTaskCallback(req, cb) {
        return this.request("SetVideoGenerationTaskCallback", req, cb);
    }
    async CreateVideoGenerationTask(req, cb) {
        return this.request("CreateVideoGenerationTask", req, cb);
    }
    async SetOnlineRecordCallbackKey(req, cb) {
        return this.request("SetOnlineRecordCallbackKey", req, cb);
    }
    async SetTranscodeCallback(req, cb) {
        return this.request("SetTranscodeCallback", req, cb);
    }
    async ResumeOnlineRecord(req, cb) {
        return this.request("ResumeOnlineRecord", req, cb);
    }
    async DescribePPTCheckCallback(req, cb) {
        return this.request("DescribePPTCheckCallback", req, cb);
    }
    async SetWarningCallback(req, cb) {
        return this.request("SetWarningCallback", req, cb);
    }
    async SetTranscodeCallbackKey(req, cb) {
        return this.request("SetTranscodeCallbackKey", req, cb);
    }
    async SetPPTCheckCallbackKey(req, cb) {
        return this.request("SetPPTCheckCallbackKey", req, cb);
    }
    async CreateSnapshotTask(req, cb) {
        return this.request("CreateSnapshotTask", req, cb);
    }
    async SetPPTCheckCallback(req, cb) {
        return this.request("SetPPTCheckCallback", req, cb);
    }
    async DescribeTranscodeByUrl(req, cb) {
        return this.request("DescribeTranscodeByUrl", req, cb);
    }
    async DescribeOnlineRecord(req, cb) {
        return this.request("DescribeOnlineRecord", req, cb);
    }
    async DescribeOnlineRecordCallback(req, cb) {
        return this.request("DescribeOnlineRecordCallback", req, cb);
    }
    async DescribeWhiteboardPushCallback(req, cb) {
        return this.request("DescribeWhiteboardPushCallback", req, cb);
    }
    async StartWhiteboardPush(req, cb) {
        return this.request("StartWhiteboardPush", req, cb);
    }
    async StartOnlineRecord(req, cb) {
        return this.request("StartOnlineRecord", req, cb);
    }
    async CreateTranscode(req, cb) {
        return this.request("CreateTranscode", req, cb);
    }
    async DescribeVideoGenerationTaskCallback(req, cb) {
        return this.request("DescribeVideoGenerationTaskCallback", req, cb);
    }
    async SetWhiteboardPushCallback(req, cb) {
        return this.request("SetWhiteboardPushCallback", req, cb);
    }
    async DescribeWarningCallback(req, cb) {
        return this.request("DescribeWarningCallback", req, cb);
    }
    async CreatePPTCheckTask(req, cb) {
        return this.request("CreatePPTCheckTask", req, cb);
    }
    async StopOnlineRecord(req, cb) {
        return this.request("StopOnlineRecord", req, cb);
    }
    async SetWhiteboardPushCallbackKey(req, cb) {
        return this.request("SetWhiteboardPushCallbackKey", req, cb);
    }
    async DescribeTranscode(req, cb) {
        return this.request("DescribeTranscode", req, cb);
    }
    async DescribeRunningTasks(req, cb) {
        return this.request("DescribeRunningTasks", req, cb);
    }
    async StopWhiteboardPush(req, cb) {
        return this.request("StopWhiteboardPush", req, cb);
    }
    async PauseOnlineRecord(req, cb) {
        return this.request("PauseOnlineRecord", req, cb);
    }
    async DescribeTranscodeCallback(req, cb) {
        return this.request("DescribeTranscodeCallback", req, cb);
    }
    async SetVideoGenerationTaskCallbackKey(req, cb) {
        return this.request("SetVideoGenerationTaskCallbackKey", req, cb);
    }
    async DescribeWhiteboardPush(req, cb) {
        return this.request("DescribeWhiteboardPush", req, cb);
    }
    async DescribeVideoGenerationTask(req, cb) {
        return this.request("DescribeVideoGenerationTask", req, cb);
    }
    async DescribePPTCheck(req, cb) {
        return this.request("DescribePPTCheck", req, cb);
    }
    async DescribeSnapshotTask(req, cb) {
        return this.request("DescribeSnapshotTask", req, cb);
    }
}
