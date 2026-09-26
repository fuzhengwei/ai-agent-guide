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
 * igtm client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("igtm.tencentcloudapi.com", "2023-10-24", clientConfig);
    }
    /**
     * 地址池列表
     */
    async DescribeAddressPoolList(req, cb) {
        return this.request("DescribeAddressPoolList", req, cb);
    }
    /**
     * 修改地址池
     */
    async ModifyAddressPool(req, cb) {
        return this.request("ModifyAddressPool", req, cb);
    }
    /**
     * 修改实例配置
     */
    async ModifyInstanceConfig(req, cb) {
        return this.request("ModifyInstanceConfig", req, cb);
    }
    /**
     * 探测任务包详情
     */
    async DescribeDetectPackageDetail(req, cb) {
        return this.request("DescribeDetectPackageDetail", req, cb);
    }
    /**
     * 创建地址池
     */
    async CreateAddressPool(req, cb) {
        return this.request("CreateAddressPool", req, cb);
    }
    /**
     * 实例详情
     */
    async DescribeInstanceDetail(req, cb) {
        return this.request("DescribeInstanceDetail", req, cb);
    }
    /**
     * 获取地址所属地域
     */
    async DescribeAddressLocation(req, cb) {
        return this.request("DescribeAddressLocation", req, cb);
    }
    /**
     * 新建策略接口
     */
    async CreateStrategy(req, cb) {
        return this.request("CreateStrategy", req, cb);
    }
    /**
     * 获取探测节点列表接口
     */
    async DescribeDetectors(req, cb) {
        return this.request("DescribeDetectors", req, cb);
    }
    /**
     * 删除策略接口
     */
    async DeleteStrategy(req, cb) {
        return this.request("DeleteStrategy", req, cb);
    }
    /**
     * 删除监控器
     */
    async DeleteMonitor(req, cb) {
        return this.request("DeleteMonitor", req, cb);
    }
    /**
     * 修改监控器
     */
    async ModifyMonitor(req, cb) {
        return this.request("ModifyMonitor", req, cb);
    }
    /**
     * 获取所有监控器
     */
    async DescribeMonitors(req, cb) {
        return this.request("DescribeMonitors", req, cb);
    }
    /**
     * 新增监控器
     */
    async CreateMonitor(req, cb) {
        return this.request("CreateMonitor", req, cb);
    }
    /**
     * 查询分组线路列表接口
     */
    async DescribeDnsLineList(req, cb) {
        return this.request("DescribeDnsLineList", req, cb);
    }
    /**
     * 创建实例接口，仅供免费实例使用
     */
    async CreateInstance(req, cb) {
        return this.request("CreateInstance", req, cb);
    }
    /**
     * 实例列表
     */
    async DescribeInstanceList(req, cb) {
        return this.request("DescribeInstanceList", req, cb);
    }
    /**
     * 设置自动续费接口
     */
    async ModifyPackageAutoRenew(req, cb) {
        return this.request("ModifyPackageAutoRenew", req, cb);
    }
    /**
     * 查询监控器详情接口
     */
    async DescribeMonitorDetail(req, cb) {
        return this.request("DescribeMonitorDetail", req, cb);
    }
    /**
     * 探测任务套餐列表
     */
    async DescribeDetectTaskPackageList(req, cb) {
        return this.request("DescribeDetectTaskPackageList", req, cb);
    }
    /**
     * 策略列表接口
     */
    async DescribeStrategyList(req, cb) {
        return this.request("DescribeStrategyList", req, cb);
    }
    /**
     * 购买套餐并支付，此接口会在余额扣费，谨慎调用
     */
    async CreatePackageAndPay(req, cb) {
        return this.request("CreatePackageAndPay", req, cb);
    }
    /**
     * 配额查询
     */
    async DescribeQuotas(req, cb) {
        return this.request("DescribeQuotas", req, cb);
    }
    /**
     * 地址池详情
     */
    async DescribeAddressPoolDetail(req, cb) {
        return this.request("DescribeAddressPoolDetail", req, cb);
    }
    /**
     * 修改策略接口
     */
    async ModifyStrategy(req, cb) {
        return this.request("ModifyStrategy", req, cb);
    }
    /**
     * 删除地址池
     */
    async DeleteAddressPool(req, cb) {
        return this.request("DeleteAddressPool", req, cb);
    }
    /**
     * 策略详情
     */
    async DescribeStrategyDetail(req, cb) {
        return this.request("DescribeStrategyDetail", req, cb);
    }
    /**
     * 实例套餐列表
     */
    async DescribeInstancePackageList(req, cb) {
        return this.request("DescribeInstancePackageList", req, cb);
    }
}
exports.Client = Client;
