import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("vrs.tencentcloudapi.com", "2020-08-24", clientConfig);
    }
    async GetVRSVoiceTypeInfo(req, cb) {
        return this.request("GetVRSVoiceTypeInfo", req, cb);
    }
    async DownloadVRSModel(req, cb) {
        return this.request("DownloadVRSModel", req, cb);
    }
    async CancelVRSTask(req, cb) {
        return this.request("CancelVRSTask", req, cb);
    }
    async DetectEnvAndSoundQuality(req, cb) {
        return this.request("DetectEnvAndSoundQuality", req, cb);
    }
    async DescribeVRSTaskStatus(req, cb) {
        return this.request("DescribeVRSTaskStatus", req, cb);
    }
    async CreateVRSTask(req, cb) {
        return this.request("CreateVRSTask", req, cb);
    }
    async GetVRSVoiceTypes(req, cb) {
        return this.request("GetVRSVoiceTypes", req, cb);
    }
    async GetTrainingText(req, cb) {
        return this.request("GetTrainingText", req, cb);
    }
}
