import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("aca.tencentcloudapi.com", "2021-03-23", clientConfig);
    }
    async LoginHisTool(req, cb) {
        return this.request("LoginHisTool", req, cb);
    }
    async GetDrugIndications(req, cb) {
        return this.request("GetDrugIndications", req, cb);
    }
    async LoginOutHisTool(req, cb) {
        return this.request("LoginOutHisTool", req, cb);
    }
    async SmartPredict(req, cb) {
        return this.request("SmartPredict", req, cb);
    }
    async SmartDrugInfo(req, cb) {
        return this.request("SmartDrugInfo", req, cb);
    }
    async SyncDepartment(req, cb) {
        return this.request("SyncDepartment", req, cb);
    }
    async SyncStandardDict(req, cb) {
        return this.request("SyncStandardDict", req, cb);
    }
    async UploadDrugs(req, cb) {
        return this.request("UploadDrugs", req, cb);
    }
}
