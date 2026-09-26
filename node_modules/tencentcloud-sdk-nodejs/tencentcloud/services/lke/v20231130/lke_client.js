"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright (c) 2018 Tencent. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const abstract_client_1 = require("../../../common/abstract_client");
/**
 * lke client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("lke.tencentcloudapi.com", "2023-11-30", clientConfig);
    }
    /**
     * 查询不满意回复列表
     */
    async ListUnsatisfiedReply(req, cb) {
        return this.request("ListUnsatisfiedReply", req, cb);
    }
    /**
     * 删除属性标签
     */
    async DeleteAttributeLabel(req, cb) {
        return this.request("DeleteAttributeLabel", req, cb);
    }
    /**
     * 查询自定义变量列表
     */
    async GetVarList(req, cb) {
        return this.request("GetVarList", req, cb);
    }
    /**
     * 查询企业知识库容量饼图
     */
    async DescribeKnowledgeUsagePieGraph(req, cb) {
        return this.request("DescribeKnowledgeUsagePieGraph", req, cb);
    }
    /**
     * 批量修改问答适用范围
     */
    async ModifyQAAttrRange(req, cb) {
        return this.request("ModifyQAAttrRange", req, cb);
    }
    /**
     * 获取文档下拉列表。
     */
    async ListSelectDoc(req, cb) {
        return this.request("ListSelectDoc", req, cb);
    }
    /**
     * 批量修改文档适用范围
     */
    async ModifyDocAttrRange(req, cb) {
        return this.request("ModifyDocAttrRange", req, cb);
    }
    /**
     * 创建发布
     */
    async CreateRelease(req, cb) {
        return this.request("CreateRelease", req, cb);
    }
    /**
     * 删除问答
     */
    async DeleteQA(req, cb) {
        return this.request("DeleteQA", req, cb);
    }
    /**
     * 工作流工具节点异步回调
     */
    async CallbackWorkflowToolNode(req, cb) {
        return this.request("CallbackWorkflowToolNode", req, cb);
    }
    /**
     * 此接口用来停止正在进行的工作流异步运行实例。
     */
    async StopWorkflowRun(req, cb) {
        return this.request("StopWorkflowRun", req, cb);
    }
    /**
     * 创建标签
     */
    async CreateAttributeLabel(req, cb) {
        return this.request("CreateAttributeLabel", req, cb);
    }
    /**
     * 获取Doc分类
     */
    async ListDocCate(req, cb) {
        return this.request("ListDocCate", req, cb);
    }
    /**
     * 列举共享知识库。
     */
    async ListSharedKnowledge(req, cb) {
        return this.request("ListSharedKnowledge", req, cb);
    }
    /**
     * 查询属性标签详情
     */
    async DescribeAttributeLabel(req, cb) {
        return this.request("DescribeAttributeLabel", req, cb);
    }
    /**
     * 发布拒答问题预览
     */
    async ListRejectedQuestionPreview(req, cb) {
        return this.request("ListRejectedQuestionPreview", req, cb);
    }
    /**
     * 查询共享知识库。
     */
    async DescribeSharedKnowledge(req, cb) {
        return this.request("DescribeSharedKnowledge", req, cb);
    }
    /**
     * 文档解析重试
     */
    async RetryDocParse(req, cb) {
        return this.request("RetryDocParse", req, cb);
    }
    /**
     * 录入问答
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async CreateQA(req, cb) {
        return this.request("CreateQA", req, cb);
    }
    /**
     * 接口调用token折线图
     */
    async DescribeTokenUsageGraph(req, cb) {
        return this.request("DescribeTokenUsageGraph", req, cb);
    }
    /**
     * 文档生成问答
     */
    async GenerateQA(req, cb) {
        return this.request("GenerateQA", req, cb);
    }
    /**
     * 获取企业下应用详情
     */
    async DescribeApp(req, cb) {
        return this.request("DescribeApp", req, cb);
    }
    /**
     * 获取ws token
     */
    async GetWsToken(req, cb) {
        return this.request("GetWsToken", req, cb);
    }
    /**
     * 查询属性标签列表
     */
    async ListAttributeLabel(req, cb) {
        return this.request("ListAttributeLabel", req, cb);
    }
    /**
     * 发布配置项预览
     */
    async ListReleaseConfigPreview(req, cb) {
        return this.request("ListReleaseConfigPreview", req, cb);
    }
    /**
     * 查看应用引用了哪些共享知识库，可以看到共享知识库的基础信息，包括名称，id等
     */
    async ListReferShareKnowledge(req, cb) {
        return this.request("ListReferShareKnowledge", req, cb);
    }
    /**
     * 查询搜索服务调用折线图
     */
    async DescribeSearchStatsGraph(req, cb) {
        return this.request("DescribeSearchStatsGraph", req, cb);
    }
    /**
     * 此接口可查询已创建的所有工作流异步运行实例。
     */
    async ListWorkflowRuns(req, cb) {
        return this.request("ListWorkflowRuns", req, cb);
    }
    /**
     * 校验问答
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async VerifyQA(req, cb) {
        return this.request("VerifyQA", req, cb);
    }
    /**
     * 创建Doc分类
     */
    async CreateDocCate(req, cb) {
        return this.request("CreateDocCate", req, cb);
    }
    /**
     * 检查属性下的标签名是否存在
     */
    async CheckAttributeLabelExist(req, cb) {
        return this.request("CheckAttributeLabelExist", req, cb);
    }
    /**
     * 文档重命名
     */
    async RenameDoc(req, cb) {
        return this.request("RenameDoc", req, cb);
    }
    /**
     * 文档详情
     */
    async DescribeDoc(req, cb) {
        return this.request("DescribeDoc", req, cb);
    }
    /**
     * 列表查询单次调用明细
     */
    async ListUsageCallDetail(req, cb) {
        return this.request("ListUsageCallDetail", req, cb);
    }
    /**
     * 获取文件上传临时密钥
     */
    async DescribeStorageCredential(req, cb) {
        return this.request("DescribeStorageCredential", req, cb);
    }
    /**
     * 点赞点踩消息
     */
    async RateMsgRecord(req, cb) {
        return this.request("RateMsgRecord", req, cb);
    }
    /**
     * 文档列表
     */
    async ListReleaseQAPreview(req, cb) {
        return this.request("ListReleaseQAPreview", req, cb);
    }
    /**
     * 更新QA分类
     */
    async ModifyQACate(req, cb) {
        return this.request("ModifyQACate", req, cb);
    }
    /**
     * 删除应用
     */
    async DeleteApp(req, cb) {
        return this.request("DeleteApp", req, cb);
    }
    /**
     * 检查属性标签引用
     */
    async CheckAttributeLabelRefer(req, cb) {
        return this.request("CheckAttributeLabelRefer", req, cb);
    }
    /**
     * 创建共享知识库。
     */
    async CreateSharedKnowledge(req, cb) {
        return this.request("CreateSharedKnowledge", req, cb);
    }
    /**
     * 获取不满意回复上下文
     */
    async DescribeUnsatisfiedReplyContext(req, cb) {
        return this.request("DescribeUnsatisfiedReplyContext", req, cb);
    }
    /**
     * Doc分组
     */
    async GroupDoc(req, cb) {
        return this.request("GroupDoc", req, cb);
    }
    /**
     * 获取企业下应用列表
     */
    async ListApp(req, cb) {
        return this.request("ListApp", req, cb);
    }
    /**
     * 接口调用token详情
     */
    async DescribeTokenUsage(req, cb) {
        return this.request("DescribeTokenUsage", req, cb);
    }
    /**
     * 通过DescribeWorkflowRun接口获取了工作流异步运行的整体内容，其中包含了基本的节点信息，再通过本接口可查看节点的运行详情（包括输入、输出、日志等）。
     */
    async DescribeNodeRun(req, cb) {
        return this.request("DescribeNodeRun", req, cb);
    }
    /**
     * Doc分类删除
     */
    async DeleteDocCate(req, cb) {
        return this.request("DeleteDocCate", req, cb);
    }
    /**
     * 获取QA分类
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async ListQACate(req, cb) {
        return this.request("ListQACate", req, cb);
    }
    /**
     * 问答详情
     */
    async DescribeQA(req, cb) {
        return this.request("DescribeQA", req, cb);
    }
    /**
     * 创建知识引擎应用。
     */
    async CreateApp(req, cb) {
        return this.request("CreateApp", req, cb);
    }
    /**
     * 修改文档
     */
    async ModifyDoc(req, cb) {
        return this.request("ModifyDoc", req, cb);
    }
    /**
     * 删除Agent
     */
    async DeleteAgent(req, cb) {
        return this.request("DeleteAgent", req, cb);
    }
    /**
     * 创建QA分类
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
单个知识库内支持创建的分类数量上限为 2000 个。
     */
    async CreateQACate(req, cb) {
        return this.request("CreateQACate", req, cb);
    }
    /**
     * 更新共享知识库。
     */
    async UpdateSharedKnowledge(req, cb) {
        return this.request("UpdateSharedKnowledge", req, cb);
    }
    /**
     * 获取发布渠道列表
     */
    async ListChannel(req, cb) {
        return this.request("ListChannel", req, cb);
    }
    /**
     * 导出标签
     */
    async ExportAttributeLabel(req, cb) {
        return this.request("ExportAttributeLabel", req, cb);
    }
    /**
     * 获取来源详情列表
     */
    async DescribeRefer(req, cb) {
        return this.request("DescribeRefer", req, cb);
    }
    /**
     * 查询知识库用量
     */
    async DescribeKnowledgeUsage(req, cb) {
        return this.request("DescribeKnowledgeUsage", req, cb);
    }
    /**
     * 删除共享知识库。
     */
    async DeleteSharedKnowledge(req, cb) {
        return this.request("DeleteSharedKnowledge", req, cb);
    }
    /**
     * 修改Doc分类
     */
    async ModifyDocCate(req, cb) {
        return this.request("ModifyDocCate", req, cb);
    }
    /**
     * 文档列表
     */
    async ListDoc(req, cb) {
        return this.request("ListDoc", req, cb);
    }
    /**
     * 本接口用来创建工作流的异步运行实例，创建成功后工作流会在后台异步运行，接口返回工作流运行实例ID（WorkflowRunId）等信息。后面可通过调用DescribeWorkflowRun接口查工作流运行的详情。
注意：工作流的异步运行是基于应用的，需要先把对应的应用配置成“单工作流模式”，才能创建成功。
     */
    async CreateWorkflowRun(req, cb) {
        return this.request("CreateWorkflowRun", req, cb);
    }
    /**
     * 问答列表
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async ListQA(req, cb) {
        return this.request("ListQA", req, cb);
    }
    /**
     * 创建变量
     */
    async CreateVar(req, cb) {
        return this.request("CreateVar", req, cb);
    }
    /**
     * 点赞点踩数据统计
     */
    async GetLikeDataCount(req, cb) {
        return this.request("GetLikeDataCount", req, cb);
    }
    /**
     * 通过appKey获取应用业务ID
     */
    async DescribeRobotBizIDByAppKey(req, cb) {
        return this.request("DescribeRobotBizIDByAppKey", req, cb);
    }
    /**
     * 导出QA列表
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async ExportQAList(req, cb) {
        return this.request("ExportQAList", req, cb);
    }
    /**
     * 上传导入属性标签
     */
    async UploadAttributeLabel(req, cb) {
        return this.request("UploadAttributeLabel", req, cb);
    }
    /**
     * 获取文档预览信息
     */
    async GetDocPreview(req, cb) {
        return this.request("GetDocPreview", req, cb);
    }
    /**
     * 并发调用响应
     */
    async DescribeConcurrencyUsage(req, cb) {
        return this.request("DescribeConcurrencyUsage", req, cb);
    }
    /**
     * 修改拒答问题
     */
    async ModifyRejectedQuestion(req, cb) {
        return this.request("ModifyRejectedQuestion", req, cb);
    }
    /**
     * 是否意图转人工
     */
    async IsTransferIntent(req, cb) {
        return this.request("IsTransferIntent", req, cb);
    }
    /**
     * 忽略不满意回复
     */
    async IgnoreUnsatisfiedReply(req, cb) {
        return this.request("IgnoreUnsatisfiedReply", req, cb);
    }
    /**
     * 更新变量
     */
    async UpdateVar(req, cb) {
        return this.request("UpdateVar", req, cb);
    }
    /**
     * 应用引用共享知识库，可以引用一个或多个，每次都是全量覆盖
     */
    async ReferShareKnowledge(req, cb) {
        return this.request("ReferShareKnowledge", req, cb);
    }
    /**
     * 发布列表
     */
    async ListRelease(req, cb) {
        return this.request("ListRelease", req, cb);
    }
    /**
     * 获取模型列表
     */
    async ListModel(req, cb) {
        return this.request("ListModel", req, cb);
    }
    /**
     * 获取拒答问题
     */
    async ListRejectedQuestion(req, cb) {
        return this.request("ListRejectedQuestion", req, cb);
    }
    /**
     * 分类删除
     */
    async DeleteQACate(req, cb) {
        return this.request("DeleteQACate", req, cb);
    }
    /**
     * 导出不满意回复
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async ExportUnsatisfiedReply(req, cb) {
        return this.request("ExportUnsatisfiedReply", req, cb);
    }
    /**
     * 发布暂停后重试
     */
    async RetryRelease(req, cb) {
        return this.request("RetryRelease", req, cb);
    }
    /**
     * 更新问答
     */
    async ModifyQA(req, cb) {
        return this.request("ModifyQA", req, cb);
    }
    /**
     * 知识库文档问答保存。
将文件存储到应用的知识库内需要三步：
1.获取临时密钥，参考[接口文档](https://cloud.tencent.com/document/product/1759/105050)。获取临时密钥不同参数组合权限不一样，可参考 [智能体开发平台操作 cos 指南](https://cloud.tencent.com/document/product/1759/116238)
2.调用腾讯云提供的 cos 存储接口，将文件存储到智能体开发平台 cos 中：具体可参考[ COS SDK 概览](https://cloud.tencent.com/document/product/436/6474), 注意使用的是临时密钥的方式操作 COS
3.调用本接口，将文件的基础信息存储到智能体开发平台中。
以上步骤可参考[文档](https://cloud.tencent.com/document/product/1759/108903)，文档最后有[代码demo](https://cloud.tencent.com/document/product/1759/108903#demo)，可作为参考。
     */
    async SaveDoc(req, cb) {
        return this.request("SaveDoc", req, cb);
    }
    /**
     * 删除文档
     */
    async DeleteDoc(req, cb) {
        return this.request("DeleteDoc", req, cb);
    }
    /**
     * 删除拒答问题
     */
    async DeleteRejectedQuestion(req, cb) {
        return this.request("DeleteRejectedQuestion", req, cb);
    }
    /**
     * 删除变量
     */
    async DeleteVar(req, cb) {
        return this.request("DeleteVar", req, cb);
    }
    /**
     * 修改应用请求结构体
     */
    async ModifyApp(req, cb) {
        return this.request("ModifyApp", req, cb);
    }
    /**
     * 获取应用密钥
     */
    async GetAppSecret(req, cb) {
        return this.request("GetAppSecret", req, cb);
    }
    /**
     * 编辑属性标签
     */
    async ModifyAttributeLabel(req, cb) {
        return this.request("ModifyAttributeLabel", req, cb);
    }
    /**
     * 回答类型数据统计
     */
    async GetAnswerTypeDataCount(req, cb) {
        return this.request("GetAnswerTypeDataCount", req, cb);
    }
    /**
     * 创建了工作流的异步运行实例后，通过本接口可以查询整体的运行详情。
     */
    async DescribeWorkflowRun(req, cb) {
        return this.request("DescribeWorkflowRun", req, cb);
    }
    /**
     * 查询指定应用下的Agent列表
     */
    async DescribeAppAgentList(req, cb) {
        return this.request("DescribeAppAgentList", req, cb);
    }
    /**
     * 文档解析重试
     */
    async RetryDocAudit(req, cb) {
        return this.request("RetryDocAudit", req, cb);
    }
    /**
     * 发布文档预览
     */
    async ListReleaseDocPreview(req, cb) {
        return this.request("ListReleaseDocPreview", req, cb);
    }
    /**
     * 发布详情
     */
    async DescribeRelease(req, cb) {
        return this.request("DescribeRelease", req, cb);
    }
    /**
     * 获取模型列表
     */
    async GetAppKnowledgeCount(req, cb) {
        return this.request("GetAppKnowledgeCount", req, cb);
    }
    /**
     * 并发调用折线图
     */
    async DescribeConcurrencyUsageGraph(req, cb) {
        return this.request("DescribeConcurrencyUsageGraph", req, cb);
    }
    /**
     * 获取聊天历史
根据会话session id获取聊天历史（仅保留180天内的历史对话数据）
     */
    async GetMsgRecord(req, cb) {
        return this.request("GetMsgRecord", req, cb);
    }
    /**
     * 创建拒答问题
     */
    async CreateRejectedQuestion(req, cb) {
        return this.request("CreateRejectedQuestion", req, cb);
    }
    /**
     * 接口调用折线图
     */
    async DescribeCallStatsGraph(req, cb) {
        return this.request("DescribeCallStatsGraph", req, cb);
    }
    /**
     * 用户将多个问答批量的分类到知识库的具体分类
知识库相关背景知识介绍
“知识库检索范围”文档：https://cloud.tencent.com/document/product/1759/112704
“标签”文档：https://cloud.tencent.com/document/product/1759/112956
     */
    async GroupQA(req, cb) {
        return this.request("GroupQA", req, cb);
    }
    /**
     * 获取片段详情
     */
    async DescribeSegments(req, cb) {
        return this.request("DescribeSegments", req, cb);
    }
    /**
     * 获取任务状态
     */
    async GetTaskStatus(req, cb) {
        return this.request("GetTaskStatus", req, cb);
    }
    /**
     * 终止文档解析
     */
    async StopDocParse(req, cb) {
        return this.request("StopDocParse", req, cb);
    }
    /**
     * 列表查询知识库容量详情
     */
    async ListAppKnowledgeDetail(req, cb) {
        return this.request("ListAppKnowledgeDetail", req, cb);
    }
    /**
     * 拉取发布按钮状态、最后发布时间
     */
    async DescribeReleaseInfo(req, cb) {
        return this.request("DescribeReleaseInfo", req, cb);
    }
}
exports.Client = Client;
