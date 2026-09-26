import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("tbaas.tencentcloudapi.com", "2018-04-16", clientConfig);
    }
    async QueryChainMakerTransaction(req, cb) {
        return this.request("QueryChainMakerTransaction", req, cb);
    }
    async ApplyChainMakerBatchUserCert(req, cb) {
        return this.request("ApplyChainMakerBatchUserCert", req, cb);
    }
    async QueryChainMakerDemoTransaction(req, cb) {
        return this.request("QueryChainMakerDemoTransaction", req, cb);
    }
    async QueryChainMakerContract(req, cb) {
        return this.request("QueryChainMakerContract", req, cb);
    }
    async QueryChainMakerDemoBlockTransaction(req, cb) {
        return this.request("QueryChainMakerDemoBlockTransaction", req, cb);
    }
    async DescribeFabricBlock(req, cb) {
        return this.request("DescribeFabricBlock", req, cb);
    }
    async Invoke(req, cb) {
        return this.request("Invoke", req, cb);
    }
    async GetClusterSummary(req, cb) {
        return this.request("GetClusterSummary", req, cb);
    }
    async GetLatestTransactionList(req, cb) {
        return this.request("GetLatestTransactionList", req, cb);
    }
    async DownloadUserCert(req, cb) {
        return this.request("DownloadUserCert", req, cb);
    }
    async ApplyUserCert(req, cb) {
        return this.request("ApplyUserCert", req, cb);
    }
    async InvokeChainMakerContract(req, cb) {
        return this.request("InvokeChainMakerContract", req, cb);
    }
    async GetInvokeTx(req, cb) {
        return this.request("GetInvokeTx", req, cb);
    }
    async QueryChainMakerBlockTransaction(req, cb) {
        return this.request("QueryChainMakerBlockTransaction", req, cb);
    }
    async QueryChainMakerDemoContract(req, cb) {
        return this.request("QueryChainMakerDemoContract", req, cb);
    }
    async GetTransactionDetailForUser(req, cb) {
        return this.request("GetTransactionDetailForUser", req, cb);
    }
    async QueryFabricChaincode(req, cb) {
        return this.request("QueryFabricChaincode", req, cb);
    }
    async SrvInvoke(req, cb) {
        return this.request("SrvInvoke", req, cb);
    }
    async DescribeFabricTransaction(req, cb) {
        return this.request("DescribeFabricTransaction", req, cb);
    }
    async InvokeChainMakerDemoContract(req, cb) {
        return this.request("InvokeChainMakerDemoContract", req, cb);
    }
    async GetBlockTransactionListForUser(req, cb) {
        return this.request("GetBlockTransactionListForUser", req, cb);
    }
    async GetBlockList(req, cb) {
        return this.request("GetBlockList", req, cb);
    }
    async InvokeFabricChaincode(req, cb) {
        return this.request("InvokeFabricChaincode", req, cb);
    }
    async Query(req, cb) {
        return this.request("Query", req, cb);
    }
}
