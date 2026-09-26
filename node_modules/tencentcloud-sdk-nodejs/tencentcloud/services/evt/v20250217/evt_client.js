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
 * evt client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("evt.tencentcloudapi.com", "2025-02-17", clientConfig);
    }
    /**
     * 推送事件数据
     */
    async PutEvent(req, cb) {
        return this.request("PutEvent", req, cb);
    }
    /**
     * 删除自定义用户
     */
    async DeleteRoleUser(req, cb) {
        return this.request("DeleteRoleUser", req, cb);
    }
    /**
     * 创建人员
     */
    async CreateRoleUser(req, cb) {
        return this.request("CreateRoleUser", req, cb);
    }
    /**
     * 执行审批
     */
    async CompleteApproval(req, cb) {
        return this.request("CompleteApproval", req, cb);
    }
    /**
     * 推送事件数据
     */
    async PutMessage(req, cb) {
        return this.request("PutMessage", req, cb);
    }
}
exports.Client = Client;
