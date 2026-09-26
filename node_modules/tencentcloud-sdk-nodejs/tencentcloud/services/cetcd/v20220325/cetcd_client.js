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
 * cetcd client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("cetcd.tencentcloudapi.com", "2022-03-25", clientConfig);
    }
    /**
     * 修改etcd实例配置
     */
    async ModifyEtcdConfiguration(req, cb) {
        return this.request("ModifyEtcdConfiguration", req, cb);
    }
    /**
     * 查看etcd快照策略
     */
    async DescribeEtcdSnapshotPolicies(req, cb) {
        return this.request("DescribeEtcdSnapshotPolicies", req, cb);
    }
    /**
     * 升级etcd实例
     */
    async UpgradeEtcdInstance(req, cb) {
        return this.request("UpgradeEtcdInstance", req, cb);
    }
    /**
     * 扩容etcd实例
     */
    async ResizeEtcdInstance(req, cb) {
        return this.request("ResizeEtcdInstance", req, cb);
    }
    /**
     * 创建etcd快照
     */
    async CreateEtcdSnapshot(req, cb) {
        return this.request("CreateEtcdSnapshot", req, cb);
    }
    /**
     * 查看etcd快照列表
     */
    async DescribeEtcdSnapshots(req, cb) {
        return this.request("DescribeEtcdSnapshots", req, cb);
    }
    /**
     * 查询etcd访问凭证
     */
    async DescribeEtcdCredentials(req, cb) {
        return this.request("DescribeEtcdCredentials", req, cb);
    }
    /**
     * 修改etcd快照策略
     */
    async ModifyEtcdSnapshotPolicy(req, cb) {
        return this.request("ModifyEtcdSnapshotPolicy", req, cb);
    }
    /**
     * 启用etcd实例删除保护
     */
    async EnableEtcdInstanceDeletionProtection(req, cb) {
        return this.request("EnableEtcdInstanceDeletionProtection", req, cb);
    }
    /**
     * 查询etcd实例列表
     */
    async DescribeEtcdInstances(req, cb) {
        return this.request("DescribeEtcdInstances", req, cb);
    }
    /**
     * 修改etcd实例属性
     */
    async ModifyEtcdAttribute(req, cb) {
        return this.request("ModifyEtcdAttribute", req, cb);
    }
    /**
     * 查看etcd可用版本
     */
    async DescribeEtcdAvailableVersions(req, cb) {
        return this.request("DescribeEtcdAvailableVersions", req, cb);
    }
    /**
     * 查看etcd集群创建进度
     */
    async DescribeEtcdCreatingProgress(req, cb) {
        return this.request("DescribeEtcdCreatingProgress", req, cb);
    }
    /**
     * 创建etcd快照策略
     */
    async CreateEtcdSnapshotPolicy(req, cb) {
        return this.request("CreateEtcdSnapshotPolicy", req, cb);
    }
    /**
     * 关闭etcd实例删除保护
     */
    async DisableEtcdInstanceDeletionProtection(req, cb) {
        return this.request("DisableEtcdInstanceDeletionProtection", req, cb);
    }
    /**
     * 获取etcd集群的gRPC方法列表
     */
    async DescribeRPCMethodList(req, cb) {
        return this.request("DescribeRPCMethodList", req, cb);
    }
    /**
     * 查看etcd相关tasks
     */
    async DescribeEtcdTasks(req, cb) {
        return this.request("DescribeEtcdTasks", req, cb);
    }
    /**
     * 创建etcd实例
     */
    async CreateEtcdInstance(req, cb) {
        return this.request("CreateEtcdInstance", req, cb);
    }
    /**
     * 查看etcd集群配额
     */
    async DescribeEtcdQuota(req, cb) {
        return this.request("DescribeEtcdQuota", req, cb);
    }
    /**
     * 查看etcd支持地域
     */
    async DescribeEtcdRegions(req, cb) {
        return this.request("DescribeEtcdRegions", req, cb);
    }
}
exports.Client = Client;
