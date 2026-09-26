import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("btoe.tencentcloudapi.com", "2021-03-03", clientConfig);
    }
    async GetDepositCert(req, cb) {
        return this.request("GetDepositCert", req, cb);
    }
    async CreateHashDeposit(req, cb) {
        return this.request("CreateHashDeposit", req, cb);
    }
    async GetDepositFile(req, cb) {
        return this.request("GetDepositFile", req, cb);
    }
    async CreateVideoDeposit(req, cb) {
        return this.request("CreateVideoDeposit", req, cb);
    }
    async CreateDocDeposit(req, cb) {
        return this.request("CreateDocDeposit", req, cb);
    }
    async CreateHashDepositNoCert(req, cb) {
        return this.request("CreateHashDepositNoCert", req, cb);
    }
    async CreateImageDeposit(req, cb) {
        return this.request("CreateImageDeposit", req, cb);
    }
    async CreateAudioDeposit(req, cb) {
        return this.request("CreateAudioDeposit", req, cb);
    }
    async CreateHashDepositNoSeal(req, cb) {
        return this.request("CreateHashDepositNoSeal", req, cb);
    }
    async GetDepositInfo(req, cb) {
        return this.request("GetDepositInfo", req, cb);
    }
    async CreateWebpageDeposit(req, cb) {
        return this.request("CreateWebpageDeposit", req, cb);
    }
    async CreateDataDeposit(req, cb) {
        return this.request("CreateDataDeposit", req, cb);
    }
}
