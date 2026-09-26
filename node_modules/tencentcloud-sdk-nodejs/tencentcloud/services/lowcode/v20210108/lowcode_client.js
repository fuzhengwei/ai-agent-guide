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
 * lowcode client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("lowcode.tencentcloudapi.com", "2021-01-08", clientConfig);
    }
    /**
     * 创建知识库
     */
    async CreateKnowledgeSet(req, cb) {
        return this.request("CreateKnowledgeSet", req, cb);
    }
    /**
     * 检查应用发布状态
     */
    async CheckDeployApp(req, cb) {
        return this.request("CheckDeployApp", req, cb);
    }
    /**
     * 更新知识库
     */
    async UpdateKnowledgeSet(req, cb) {
        return this.request("UpdateKnowledgeSet", req, cb);
    }
    /**
     * 分页获取当前用户的应用列表
     */
    async DescribeApps(req, cb) {
        return this.request("DescribeApps", req, cb);
    }
    /**
     * 获取角色关联的用户列表
     */
    async DescribeRelatedUsers(req, cb) {
        return this.request("DescribeRelatedUsers", req, cb);
    }
    /**
     * 查询知识库
     */
    async DescribeKnowledgeSetList(req, cb) {
        return this.request("DescribeKnowledgeSetList", req, cb);
    }
    /**
     * 知识库文档搜索接口
     */
    async SearchDocList(req, cb) {
        return this.request("SearchDocList", req, cb);
    }
    /**
     * 获取数据源详情列表
     */
    async DescribeDataSourceList(req, cb) {
        return this.request("DescribeDataSourceList", req, cb);
    }
    /**
     * 接口提供应用绑定微信ID功能。
     */
    async PutWxAppIdToWeApp(req, cb) {
        return this.request("PutWxAppIdToWeApp", req, cb);
    }
    /**
     * 删除知识库下文档
     */
    async DeleteKnowledgeDocumentSet(req, cb) {
        return this.request("DeleteKnowledgeDocumentSet", req, cb);
    }
    /**
     * 获取知识库下文档详情
     */
    async DescribeKnowledgeDocumentSetDetail(req, cb) {
        return this.request("DescribeKnowledgeDocumentSetDetail", req, cb);
    }
    /**
     * 更新知识库
     */
    async UploadKnowledgeDocumentSet(req, cb) {
        return this.request("UploadKnowledgeDocumentSet", req, cb);
    }
    /**
     * 删除应用绑定小程序
     */
    async DeleteAppBindWxApp(req, cb) {
        return this.request("DeleteAppBindWxApp", req, cb);
    }
    /**
     * 查询知识库下文件集合
     */
    async DescribeKnowledgeDocumentSetList(req, cb) {
        return this.request("DescribeKnowledgeDocumentSetList", req, cb);
    }
    /**
     * 发布应用
     */
    async DeployApp(req, cb) {
        return this.request("DeployApp", req, cb);
    }
    /**
     * 查询资源关联的角色列表
     */
    async DescribeResourceRoleList(req, cb) {
        return this.request("DescribeResourceRoleList", req, cb);
    }
    /**
     * 删除知识库
     */
    async DeleteKnowledgeSet(req, cb) {
        return this.request("DeleteKnowledgeSet", req, cb);
    }
}
exports.Client = Client;
