import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("lke.tencentcloudapi.com", "2023-11-30", clientConfig);
    }
    async ListUnsatisfiedReply(req, cb) {
        return this.request("ListUnsatisfiedReply", req, cb);
    }
    async DeleteAttributeLabel(req, cb) {
        return this.request("DeleteAttributeLabel", req, cb);
    }
    async GetVarList(req, cb) {
        return this.request("GetVarList", req, cb);
    }
    async DescribeKnowledgeUsagePieGraph(req, cb) {
        return this.request("DescribeKnowledgeUsagePieGraph", req, cb);
    }
    async ModifyQAAttrRange(req, cb) {
        return this.request("ModifyQAAttrRange", req, cb);
    }
    async ListSelectDoc(req, cb) {
        return this.request("ListSelectDoc", req, cb);
    }
    async ModifyDocAttrRange(req, cb) {
        return this.request("ModifyDocAttrRange", req, cb);
    }
    async CreateRelease(req, cb) {
        return this.request("CreateRelease", req, cb);
    }
    async DeleteQA(req, cb) {
        return this.request("DeleteQA", req, cb);
    }
    async CallbackWorkflowToolNode(req, cb) {
        return this.request("CallbackWorkflowToolNode", req, cb);
    }
    async StopWorkflowRun(req, cb) {
        return this.request("StopWorkflowRun", req, cb);
    }
    async CreateAttributeLabel(req, cb) {
        return this.request("CreateAttributeLabel", req, cb);
    }
    async ListDocCate(req, cb) {
        return this.request("ListDocCate", req, cb);
    }
    async ListSharedKnowledge(req, cb) {
        return this.request("ListSharedKnowledge", req, cb);
    }
    async DescribeAttributeLabel(req, cb) {
        return this.request("DescribeAttributeLabel", req, cb);
    }
    async ListRejectedQuestionPreview(req, cb) {
        return this.request("ListRejectedQuestionPreview", req, cb);
    }
    async DescribeSharedKnowledge(req, cb) {
        return this.request("DescribeSharedKnowledge", req, cb);
    }
    async RetryDocParse(req, cb) {
        return this.request("RetryDocParse", req, cb);
    }
    async CreateQA(req, cb) {
        return this.request("CreateQA", req, cb);
    }
    async DescribeTokenUsageGraph(req, cb) {
        return this.request("DescribeTokenUsageGraph", req, cb);
    }
    async GenerateQA(req, cb) {
        return this.request("GenerateQA", req, cb);
    }
    async DescribeApp(req, cb) {
        return this.request("DescribeApp", req, cb);
    }
    async GetWsToken(req, cb) {
        return this.request("GetWsToken", req, cb);
    }
    async ListAttributeLabel(req, cb) {
        return this.request("ListAttributeLabel", req, cb);
    }
    async ListReleaseConfigPreview(req, cb) {
        return this.request("ListReleaseConfigPreview", req, cb);
    }
    async ListReferShareKnowledge(req, cb) {
        return this.request("ListReferShareKnowledge", req, cb);
    }
    async DescribeSearchStatsGraph(req, cb) {
        return this.request("DescribeSearchStatsGraph", req, cb);
    }
    async ListWorkflowRuns(req, cb) {
        return this.request("ListWorkflowRuns", req, cb);
    }
    async VerifyQA(req, cb) {
        return this.request("VerifyQA", req, cb);
    }
    async CreateDocCate(req, cb) {
        return this.request("CreateDocCate", req, cb);
    }
    async CheckAttributeLabelExist(req, cb) {
        return this.request("CheckAttributeLabelExist", req, cb);
    }
    async RenameDoc(req, cb) {
        return this.request("RenameDoc", req, cb);
    }
    async DescribeDoc(req, cb) {
        return this.request("DescribeDoc", req, cb);
    }
    async ListUsageCallDetail(req, cb) {
        return this.request("ListUsageCallDetail", req, cb);
    }
    async DescribeStorageCredential(req, cb) {
        return this.request("DescribeStorageCredential", req, cb);
    }
    async RateMsgRecord(req, cb) {
        return this.request("RateMsgRecord", req, cb);
    }
    async ListReleaseQAPreview(req, cb) {
        return this.request("ListReleaseQAPreview", req, cb);
    }
    async ModifyQACate(req, cb) {
        return this.request("ModifyQACate", req, cb);
    }
    async DeleteApp(req, cb) {
        return this.request("DeleteApp", req, cb);
    }
    async CheckAttributeLabelRefer(req, cb) {
        return this.request("CheckAttributeLabelRefer", req, cb);
    }
    async CreateSharedKnowledge(req, cb) {
        return this.request("CreateSharedKnowledge", req, cb);
    }
    async DescribeUnsatisfiedReplyContext(req, cb) {
        return this.request("DescribeUnsatisfiedReplyContext", req, cb);
    }
    async GroupDoc(req, cb) {
        return this.request("GroupDoc", req, cb);
    }
    async ListApp(req, cb) {
        return this.request("ListApp", req, cb);
    }
    async DescribeTokenUsage(req, cb) {
        return this.request("DescribeTokenUsage", req, cb);
    }
    async DescribeNodeRun(req, cb) {
        return this.request("DescribeNodeRun", req, cb);
    }
    async DeleteDocCate(req, cb) {
        return this.request("DeleteDocCate", req, cb);
    }
    async ListQACate(req, cb) {
        return this.request("ListQACate", req, cb);
    }
    async DescribeQA(req, cb) {
        return this.request("DescribeQA", req, cb);
    }
    async CreateApp(req, cb) {
        return this.request("CreateApp", req, cb);
    }
    async ModifyDoc(req, cb) {
        return this.request("ModifyDoc", req, cb);
    }
    async DeleteAgent(req, cb) {
        return this.request("DeleteAgent", req, cb);
    }
    async CreateQACate(req, cb) {
        return this.request("CreateQACate", req, cb);
    }
    async UpdateSharedKnowledge(req, cb) {
        return this.request("UpdateSharedKnowledge", req, cb);
    }
    async ListChannel(req, cb) {
        return this.request("ListChannel", req, cb);
    }
    async ExportAttributeLabel(req, cb) {
        return this.request("ExportAttributeLabel", req, cb);
    }
    async DescribeRefer(req, cb) {
        return this.request("DescribeRefer", req, cb);
    }
    async DescribeKnowledgeUsage(req, cb) {
        return this.request("DescribeKnowledgeUsage", req, cb);
    }
    async DeleteSharedKnowledge(req, cb) {
        return this.request("DeleteSharedKnowledge", req, cb);
    }
    async ModifyDocCate(req, cb) {
        return this.request("ModifyDocCate", req, cb);
    }
    async ListDoc(req, cb) {
        return this.request("ListDoc", req, cb);
    }
    async CreateWorkflowRun(req, cb) {
        return this.request("CreateWorkflowRun", req, cb);
    }
    async ListQA(req, cb) {
        return this.request("ListQA", req, cb);
    }
    async CreateVar(req, cb) {
        return this.request("CreateVar", req, cb);
    }
    async GetLikeDataCount(req, cb) {
        return this.request("GetLikeDataCount", req, cb);
    }
    async DescribeRobotBizIDByAppKey(req, cb) {
        return this.request("DescribeRobotBizIDByAppKey", req, cb);
    }
    async ExportQAList(req, cb) {
        return this.request("ExportQAList", req, cb);
    }
    async UploadAttributeLabel(req, cb) {
        return this.request("UploadAttributeLabel", req, cb);
    }
    async GetDocPreview(req, cb) {
        return this.request("GetDocPreview", req, cb);
    }
    async DescribeConcurrencyUsage(req, cb) {
        return this.request("DescribeConcurrencyUsage", req, cb);
    }
    async ModifyRejectedQuestion(req, cb) {
        return this.request("ModifyRejectedQuestion", req, cb);
    }
    async IsTransferIntent(req, cb) {
        return this.request("IsTransferIntent", req, cb);
    }
    async IgnoreUnsatisfiedReply(req, cb) {
        return this.request("IgnoreUnsatisfiedReply", req, cb);
    }
    async UpdateVar(req, cb) {
        return this.request("UpdateVar", req, cb);
    }
    async ReferShareKnowledge(req, cb) {
        return this.request("ReferShareKnowledge", req, cb);
    }
    async ListRelease(req, cb) {
        return this.request("ListRelease", req, cb);
    }
    async ListModel(req, cb) {
        return this.request("ListModel", req, cb);
    }
    async ListRejectedQuestion(req, cb) {
        return this.request("ListRejectedQuestion", req, cb);
    }
    async DeleteQACate(req, cb) {
        return this.request("DeleteQACate", req, cb);
    }
    async ExportUnsatisfiedReply(req, cb) {
        return this.request("ExportUnsatisfiedReply", req, cb);
    }
    async RetryRelease(req, cb) {
        return this.request("RetryRelease", req, cb);
    }
    async ModifyQA(req, cb) {
        return this.request("ModifyQA", req, cb);
    }
    async SaveDoc(req, cb) {
        return this.request("SaveDoc", req, cb);
    }
    async DeleteDoc(req, cb) {
        return this.request("DeleteDoc", req, cb);
    }
    async DeleteRejectedQuestion(req, cb) {
        return this.request("DeleteRejectedQuestion", req, cb);
    }
    async DeleteVar(req, cb) {
        return this.request("DeleteVar", req, cb);
    }
    async ModifyApp(req, cb) {
        return this.request("ModifyApp", req, cb);
    }
    async GetAppSecret(req, cb) {
        return this.request("GetAppSecret", req, cb);
    }
    async ModifyAttributeLabel(req, cb) {
        return this.request("ModifyAttributeLabel", req, cb);
    }
    async GetAnswerTypeDataCount(req, cb) {
        return this.request("GetAnswerTypeDataCount", req, cb);
    }
    async DescribeWorkflowRun(req, cb) {
        return this.request("DescribeWorkflowRun", req, cb);
    }
    async DescribeAppAgentList(req, cb) {
        return this.request("DescribeAppAgentList", req, cb);
    }
    async RetryDocAudit(req, cb) {
        return this.request("RetryDocAudit", req, cb);
    }
    async ListReleaseDocPreview(req, cb) {
        return this.request("ListReleaseDocPreview", req, cb);
    }
    async DescribeRelease(req, cb) {
        return this.request("DescribeRelease", req, cb);
    }
    async GetAppKnowledgeCount(req, cb) {
        return this.request("GetAppKnowledgeCount", req, cb);
    }
    async DescribeConcurrencyUsageGraph(req, cb) {
        return this.request("DescribeConcurrencyUsageGraph", req, cb);
    }
    async GetMsgRecord(req, cb) {
        return this.request("GetMsgRecord", req, cb);
    }
    async CreateRejectedQuestion(req, cb) {
        return this.request("CreateRejectedQuestion", req, cb);
    }
    async DescribeCallStatsGraph(req, cb) {
        return this.request("DescribeCallStatsGraph", req, cb);
    }
    async GroupQA(req, cb) {
        return this.request("GroupQA", req, cb);
    }
    async DescribeSegments(req, cb) {
        return this.request("DescribeSegments", req, cb);
    }
    async GetTaskStatus(req, cb) {
        return this.request("GetTaskStatus", req, cb);
    }
    async StopDocParse(req, cb) {
        return this.request("StopDocParse", req, cb);
    }
    async ListAppKnowledgeDetail(req, cb) {
        return this.request("ListAppKnowledgeDetail", req, cb);
    }
    async DescribeReleaseInfo(req, cb) {
        return this.request("DescribeReleaseInfo", req, cb);
    }
}
