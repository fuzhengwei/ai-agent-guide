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
 * vod client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("vod.tencentcloudapi.com", "2024-07-18", clientConfig);
    }
    /**
     * 创建增量迁移策略。
     */
    async ModifyIncrementalMigrationStrategy(req, cb) {
        return this.request("ModifyIncrementalMigrationStrategy", req, cb);
    }
    /**
     * 查询增量迁移策略信息。
     */
    async DescribeIncrementalMigrationStrategyInfos(req, cb) {
        return this.request("DescribeIncrementalMigrationStrategyInfos", req, cb);
    }
    /**
     * 该接口用于为专业版应用创建存储桶。

注：
- 本接口仅用于专业版应用；
- 客户创建点播专业版应用时，系统默认为客户开通了部分地域的存储，用户如果需要开通其它地域的存储，可以通过该接口进行开通；
- 通过 [DescribeStorageRegions](https://cloud.tencent.com/document/product/266/72480) 接口可以查询到所有存储地域及已经开通存储桶的地域。
     */
    async CreateStorage(req, cb) {
        return this.request("CreateStorage", req, cb);
    }
    /**
     * 创建增量迁移策略。
     */
    async CreateIncrementalMigrationStrategy(req, cb) {
        return this.request("CreateIncrementalMigrationStrategy", req, cb);
    }
    /**
     * 删除增量迁移策略。
     */
    async DeleteIncrementalMigrationStrategy(req, cb) {
        return this.request("DeleteIncrementalMigrationStrategy", req, cb);
    }
    /**
     * 该接口用于查询专业版应用中的存储桶信息，同时支持分页查询。

注：
- 本接口仅用于专业版应用。
     */
    async DescribeStorage(req, cb) {
        return this.request("DescribeStorage", req, cb);
    }
    /**
     * 用于按指定策略，生成专业版应用的临时访问凭证，比如生成用于客户端上传的临时凭证。
     */
    async CreateStorageCredentials(req, cb) {
        return this.request("CreateStorageCredentials", req, cb);
    }
}
exports.Client = Client;
