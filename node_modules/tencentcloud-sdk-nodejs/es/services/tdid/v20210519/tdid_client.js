import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tdid.tencentcloudapi.com", "2021-05-19", clientConfig);
    }
    async GetOverSummary(req, cb) {
        return this.request("GetOverSummary", req, cb);
    }
    async QueryAuthorityInfo(req, cb) {
        return this.request("QueryAuthorityInfo", req, cb);
    }
    async VerifyCredentials(req, cb) {
        return this.request("VerifyCredentials", req, cb);
    }
    async QueryCPT(req, cb) {
        return this.request("QueryCPT", req, cb);
    }
    async CreatePresentation(req, cb) {
        return this.request("CreatePresentation", req, cb);
    }
    async CreateTDidByHost(req, cb) {
        return this.request("CreateTDidByHost", req, cb);
    }
    async GetTDidByObjectId(req, cb) {
        return this.request("GetTDidByObjectId", req, cb);
    }
    async CreateTDidByPubKey(req, cb) {
        return this.request("CreateTDidByPubKey", req, cb);
    }
    async VerifyPresentation(req, cb) {
        return this.request("VerifyPresentation", req, cb);
    }
    async CreateDisclosedCredential(req, cb) {
        return this.request("CreateDisclosedCredential", req, cb);
    }
    async GetAppSummary(req, cb) {
        return this.request("GetAppSummary", req, cb);
    }
    async GetTDidDocument(req, cb) {
        return this.request("GetTDidDocument", req, cb);
    }
    async GetTDidPubKey(req, cb) {
        return this.request("GetTDidPubKey", req, cb);
    }
    async SetTDidAttribute(req, cb) {
        return this.request("SetTDidAttribute", req, cb);
    }
    async UpdateCredentialState(req, cb) {
        return this.request("UpdateCredentialState", req, cb);
    }
    async DeactivateTDid(req, cb) {
        return this.request("DeactivateTDid", req, cb);
    }
    async GetCredentialState(req, cb) {
        return this.request("GetCredentialState", req, cb);
    }
    async IssueCredential(req, cb) {
        return this.request("IssueCredential", req, cb);
    }
}
