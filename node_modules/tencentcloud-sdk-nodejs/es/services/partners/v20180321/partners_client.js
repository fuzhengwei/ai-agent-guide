import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("partners.tencentcloudapi.com", "2018-03-21", clientConfig);
    }
    async AssignClientsToSales(req, cb) {
        return this.request("AssignClientsToSales", req, cb);
    }
    async DescribeAgentBills(req, cb) {
        return this.request("DescribeAgentBills", req, cb);
    }
    async AgentTransferMoney(req, cb) {
        return this.request("AgentTransferMoney", req, cb);
    }
    async DescribeRebateInfos(req, cb) {
        return this.request("DescribeRebateInfos", req, cb);
    }
    async RemovePayRelationForClient(req, cb) {
        return this.request("RemovePayRelationForClient", req, cb);
    }
    async ModifyClientRemark(req, cb) {
        return this.request("ModifyClientRemark", req, cb);
    }
    async DescribeClientBalanceNew(req, cb) {
        return this.request("DescribeClientBalanceNew", req, cb);
    }
    async DescribeUnbindClientList(req, cb) {
        return this.request("DescribeUnbindClientList", req, cb);
    }
    async AgentPayDeals(req, cb) {
        return this.request("AgentPayDeals", req, cb);
    }
    async DescribeSalesmans(req, cb) {
        return this.request("DescribeSalesmans", req, cb);
    }
    async AuditApplyClient(req, cb) {
        return this.request("AuditApplyClient", req, cb);
    }
    async DescribeClientSwitchTraTaskInfo(req, cb) {
        return this.request("DescribeClientSwitchTraTaskInfo", req, cb);
    }
    async DescribeAgentPayDealsV2(req, cb) {
        return this.request("DescribeAgentPayDealsV2", req, cb);
    }
    async DescribeAgentAuditedClients(req, cb) {
        return this.request("DescribeAgentAuditedClients", req, cb);
    }
    async DescribeAgentDealsPriceDetailByDealName(req, cb) {
        return this.request("DescribeAgentDealsPriceDetailByDealName", req, cb);
    }
    async DescribeClientJoinIncreaseList(req, cb) {
        return this.request("DescribeClientJoinIncreaseList", req, cb);
    }
    async DescribeAgentSelfPayDealsV2(req, cb) {
        return this.request("DescribeAgentSelfPayDealsV2", req, cb);
    }
    async DescribeAgentRelateBigDealIds(req, cb) {
        return this.request("DescribeAgentRelateBigDealIds", req, cb);
    }
    async DescribeAgentDealsByCache(req, cb) {
        return this.request("DescribeAgentDealsByCache", req, cb);
    }
    async DescribeAgentClientGrade(req, cb) {
        return this.request("DescribeAgentClientGrade", req, cb);
    }
    async DescribeRebateInfosNew(req, cb) {
        return this.request("DescribeRebateInfosNew", req, cb);
    }
    async DescribeAgentClients(req, cb) {
        return this.request("DescribeAgentClients", req, cb);
    }
    async CreatePayRelationForClient(req, cb) {
        return this.request("CreatePayRelationForClient", req, cb);
    }
}
