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
 * vdb client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("vdb.tencentcloudapi.com", "2023-06-16", clientConfig);
    }
    /**
     * 本接口（DescribeInstanceMaintenanceWindow）用于查看实例维护时间窗。
     */
    async DescribeInstanceMaintenanceWindow(req, cb) {
        return this.request("DescribeInstanceMaintenanceWindow", req, cb);
    }
    /**
     * 本接口 (AssociateSecurityGroups) 用于安全组批量绑定多个指定实例。
     */
    async AssociateSecurityGroups(req, cb) {
        return this.request("AssociateSecurityGroups", req, cb);
    }
    /**
     * 查询实例列表
     */
    async DescribeInstances(req, cb) {
        return this.request("DescribeInstances", req, cb);
    }
    /**
     * 本接口（ModifyInstanceMaintenanceWindow）用于修改实例维护时间窗范围。
     */
    async ModifyInstanceMaintenanceWindow(req, cb) {
        return this.request("ModifyInstanceMaintenanceWindow", req, cb);
    }
    /**
     * 本接口（CreateInstance）用于创建向量数据库实例。
     */
    async CreateInstance(req, cb) {
        return this.request("CreateInstance", req, cb);
    }
    /**
     * 本接口(ModifyDBInstanceSecurityGroups)用于修改实例绑定的安全组。
     */
    async ModifyDBInstanceSecurityGroups(req, cb) {
        return this.request("ModifyDBInstanceSecurityGroups", req, cb);
    }
    /**
     * 本接口(DescribeDBSecurityGroups)用于查询实例的安全组详情。
     */
    async DescribeDBSecurityGroups(req, cb) {
        return this.request("DescribeDBSecurityGroups", req, cb);
    }
    /**
     * 本接口（RecoverInstance）用于恢复在回收站隔离的实例。
     */
    async RecoverInstance(req, cb) {
        return this.request("RecoverInstance", req, cb);
    }
    /**
     * 查询实例pod列表
     */
    async DescribeInstanceNodes(req, cb) {
        return this.request("DescribeInstanceNodes", req, cb);
    }
    /**
     * 本接口（IsolateInstance）用于隔离实例于回收站，在回收站保护时长内可恢复实例。
     */
    async IsolateInstance(req, cb) {
        return this.request("IsolateInstance", req, cb);
    }
    /**
     * 本接口（DestroyInstances）用于销毁实例。
     */
    async DestroyInstances(req, cb) {
        return this.request("DestroyInstances", req, cb);
    }
    /**
     * 本接口（ScaleUpInstance）用于升级节点配置规格。
     */
    async ScaleUpInstance(req, cb) {
        return this.request("ScaleUpInstance", req, cb);
    }
    /**
     * 查询实例变配价格
     */
    async DescribePriceResizeInstance(req, cb) {
        return this.request("DescribePriceResizeInstance", req, cb);
    }
    /**
     * 查询实例续费价格（包年包月）
     */
    async DescribePriceRenewInstance(req, cb) {
        return this.request("DescribePriceRenewInstance", req, cb);
    }
    /**
     * 本接口（ScaleOutInstance）用于水平扩容节点数量。
     */
    async ScaleOutInstance(req, cb) {
        return this.request("ScaleOutInstance", req, cb);
    }
    /**
     * 查询新购实例价格
     */
    async DescribePriceCreateInstance(req, cb) {
        return this.request("DescribePriceCreateInstance", req, cb);
    }
    /**
     * 本接口(DisassociateSecurityGroups)用于安全组批量解绑实例。
     */
    async DisassociateSecurityGroups(req, cb) {
        return this.request("DisassociateSecurityGroups", req, cb);
    }
}
exports.Client = Client;
