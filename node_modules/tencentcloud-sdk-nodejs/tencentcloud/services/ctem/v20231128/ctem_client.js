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
 * ctem client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("ctem.tencentcloudapi.com", "2023-11-28", clientConfig);
    }
    /**
     * 添加微信小程序资产
     */
    async CreateWechatApplet(req, cb) {
        return this.request("CreateWechatApplet", req, cb);
    }
    /**
     * 查看网盘泄露数据
     */
    async DescribeNetDisks(req, cb) {
        return this.request("DescribeNetDisks", req, cb);
    }
    /**
     * 添加后台数据
     */
    async CreateManage(req, cb) {
        return this.request("CreateManage", req, cb);
    }
    /**
     * 查看后台管理数据
     */
    async DescribeManages(req, cb) {
        return this.request("DescribeManages", req, cb);
    }
    /**
     * 获取数据泄露事件
     */
    async DescribeLeakageDatas(req, cb) {
        return this.request("DescribeLeakageDatas", req, cb);
    }
    /**
     * 查看http数据
     */
    async DescribeHttps(req, cb) {
        return this.request("DescribeHttps", req, cb);
    }
    /**
     * 编辑企业
     */
    async ModifyCustomer(req, cb) {
        return this.request("ModifyCustomer", req, cb);
    }
    /**
     * 添加主机资产
     */
    async CreateAsset(req, cb) {
        return this.request("CreateAsset", req, cb);
    }
    /**
     * 删除后台数据
     */
    async DeleteManages(req, cb) {
        return this.request("DeleteManages", req, cb);
    }
    /**
     * 删除网站资产数据
     */
    async DeleteHttps(req, cb) {
        return this.request("DeleteHttps", req, cb);
    }
    /**
     * 添加影子资产
     */
    async CreateSuspiciousAsset(req, cb) {
        return this.request("CreateSuspiciousAsset", req, cb);
    }
    /**
     * 删除影子资产数据
     */
    async DeleteSuspiciousAssets(req, cb) {
        return this.request("DeleteSuspiciousAssets", req, cb);
    }
    /**
     * 查看API安全数据
     */
    async DescribeApiSecs(req, cb) {
        return this.request("DescribeApiSecs", req, cb);
    }
    /**
     * 查看主域名数据
     */
    async DescribeDomains(req, cb) {
        return this.request("DescribeDomains", req, cb);
    }
    /**
     * 查看主机资产
     */
    async DescribeAssets(req, cb) {
        return this.request("DescribeAssets", req, cb);
    }
    /**
     * 删除子域名数据
     */
    async DeleteSubDomains(req, cb) {
        return this.request("DeleteSubDomains", req, cb);
    }
    /**
     * 查看漏洞数据
     */
    async DescribeVuls(req, cb) {
        return this.request("DescribeVuls", req, cb);
    }
    /**
     * 查看种子列表
     */
    async DescribeSeeds(req, cb) {
        return this.request("DescribeSeeds", req, cb);
    }
    /**
     * 查看目录爆破数据
     */
    async DescribeConfigs(req, cb) {
        return this.request("DescribeConfigs", req, cb);
    }
    /**
     * 删除微信公众号数据
     */
    async DeleteWechatOfficialAccounts(req, cb) {
        return this.request("DeleteWechatOfficialAccounts", req, cb);
    }
    /**
     * 删除微信小程序数据
     */
    async DeleteWechatApplets(req, cb) {
        return this.request("DeleteWechatApplets", req, cb);
    }
    /**
     * 查询仿冒网站
     */
    async DescribeFakeWebsites(req, cb) {
        return this.request("DescribeFakeWebsites", req, cb);
    }
    /**
     * 忽略数据
     */
    async IgnoreData(req, cb) {
        return this.request("IgnoreData", req, cb);
    }
    /**
     * 查看敏感信息泄露数据
     */
    async DescribeSensitiveInfos(req, cb) {
        return this.request("DescribeSensitiveInfos", req, cb);
    }
    /**
     * 添加子域名数据
     */
    async CreateSubDomain(req, cb) {
        return this.request("CreateSubDomain", req, cb);
    }
    /**
     * 查询仿冒小程序
     */
    async DescribeFakeMiniPrograms(req, cb) {
        return this.request("DescribeFakeMiniPrograms", req, cb);
    }
    /**
     * 查看子域名数据
     */
    async DescribeSubDomains(req, cb) {
        return this.request("DescribeSubDomains", req, cb);
    }
    /**
     * 查看企业列表
     */
    async DescribeCustomers(req, cb) {
        return this.request("DescribeCustomers", req, cb);
    }
    /**
     * 获取邮箱泄露数据
     */
    async DescribeLeakageEmails(req, cb) {
        return this.request("DescribeLeakageEmails", req, cb);
    }
    /**
     * 删除端口数据
     */
    async DeletePorts(req, cb) {
        return this.request("DeletePorts", req, cb);
    }
    /**
     * 添加端口服务资产
     */
    async CreatePort(req, cb) {
        return this.request("CreatePort", req, cb);
    }
    /**
     * 查询仿冒应用
     */
    async DescribeFakeApps(req, cb) {
        return this.request("DescribeFakeApps", req, cb);
    }
    /**
     * 修改标签
     */
    async ModifyLabel(req, cb) {
        return this.request("ModifyLabel", req, cb);
    }
    /**
     * 查看移动端资产
     */
    async DescribeApps(req, cb) {
        return this.request("DescribeApps", req, cb);
    }
    /**
     * 添加微信公众号资产
     */
    async CreateWechatOfficialAccount(req, cb) {
        return this.request("CreateWechatOfficialAccount", req, cb);
    }
    /**
     * 查询仿冒公众号
     */
    async DescribeFakeWechatOfficials(req, cb) {
        return this.request("DescribeFakeWechatOfficials", req, cb);
    }
    /**
     * 查看链路详情
     */
    async DescribeJobRecordDetails(req, cb) {
        return this.request("DescribeJobRecordDetails", req, cb);
    }
    /**
     * 查看影子资产
     */
    async DescribeSuspiciousAssets(req, cb) {
        return this.request("DescribeSuspiciousAssets", req, cb);
    }
    /**
     * 查看Github泄露数据
     */
    async DescribeGithubs(req, cb) {
        return this.request("DescribeGithubs", req, cb);
    }
    /**
     * 查看端口数据
     */
    async DescribePorts(req, cb) {
        return this.request("DescribePorts", req, cb);
    }
    /**
     * 启动测绘
     */
    async CreateJobRecord(req, cb) {
        return this.request("CreateJobRecord", req, cb);
    }
    /**
     * 添加网站资产
     */
    async CreateHttp(req, cb) {
        return this.request("CreateHttp", req, cb);
    }
    /**
     * 删除APP数据
     */
    async DeleteApps(req, cb) {
        return this.request("DeleteApps", req, cb);
    }
    /**
     * 创建种子
     */
    async CreateSeeds(req, cb) {
        return this.request("CreateSeeds", req, cb);
    }
    /**
     * 删除企业架构数据
     */
    async DeleteEnterprises(req, cb) {
        return this.request("DeleteEnterprises", req, cb);
    }
    /**
     * 修改种子状态
     */
    async ModifySeedStatus(req, cb) {
        return this.request("ModifySeedStatus", req, cb);
    }
    /**
     * 删除主域名数据
     */
    async DeleteDomains(req, cb) {
        return this.request("DeleteDomains", req, cb);
    }
    /**
     * 删除主机资产数据
     */
    async DeleteAssets(req, cb) {
        return this.request("DeleteAssets", req, cb);
    }
    /**
     * 添加APP资产
     */
    async CreateApp(req, cb) {
        return this.request("CreateApp", req, cb);
    }
    /**
     * 查看暗网数据
     */
    async DescribeDarkWebs(req, cb) {
        return this.request("DescribeDarkWebs", req, cb);
    }
    /**
     * 添加主域名数据
     */
    async CreateDomain(req, cb) {
        return this.request("CreateDomain", req, cb);
    }
    /**
     * 获取代码泄露数据
     */
    async DescribeLeakageCodes(req, cb) {
        return this.request("DescribeLeakageCodes", req, cb);
    }
    /**
     * 查看公众号数据
     */
    async DescribeWechatOfficialAccounts(req, cb) {
        return this.request("DescribeWechatOfficialAccounts", req, cb);
    }
    /**
     * 查看企业架构数据
     */
    async DescribeEnterprises(req, cb) {
        return this.request("DescribeEnterprises", req, cb);
    }
    /**
     * 添加企业架构资产
     */
    async CreateEnterprise(req, cb) {
        return this.request("CreateEnterprise", req, cb);
    }
    /**
     * 创建企业
     */
    async CreateCustomer(req, cb) {
        return this.request("CreateCustomer", req, cb);
    }
    /**
     * 停止扫描
     */
    async StopJobRecord(req, cb) {
        return this.request("StopJobRecord", req, cb);
    }
    /**
     * 查看任务运行记录列表
     */
    async DescribeJobRecords(req, cb) {
        return this.request("DescribeJobRecords", req, cb);
    }
    /**
     * 查看弱口令数据
     */
    async DescribeWeakPasswords(req, cb) {
        return this.request("DescribeWeakPasswords", req, cb);
    }
    /**
     * 查看微信小程序
     */
    async DescribeWechatApplets(req, cb) {
        return this.request("DescribeWechatApplets", req, cb);
    }
    /**
     * 删除种子
     */
    async DeleteSeeds(req, cb) {
        return this.request("DeleteSeeds", req, cb);
    }
}
exports.Client = Client;
