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
 * bda client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("bda.tencentcloudapi.com", "2020-03-24", clientConfig);
    }
    /**
     * 即二分类人像分割，识别传入图片中人体的完整轮廓，进行抠像。
     */
    async SegmentPortraitPic(req, cb) {
        return this.request("SegmentPortraitPic", req, cb);
    }
    /**
     * 在前后景分割的基础上优化多分类分割，支持对头发、五官等的分割，既作为换发型、挂件等底层技术，也可用于抠人头、抠人脸等玩法
     */
    async SegmentCustomizedPortraitPic(req, cb) {
        return this.request("SegmentCustomizedPortraitPic", req, cb);
    }
    /**
     * 终止指定视频人像分割处理任务
     */
    async TerminateSegmentationTask(req, cb) {
        return this.request("TerminateSegmentationTask", req, cb);
    }
    /**
     * 可以查看单条任务的处理情况，包括处理状态，处理结果。
     */
    async DescribeSegmentationTask(req, cb) {
        return this.request("DescribeSegmentationTask", req, cb);
    }
    /**
     * 本接口为人像分割在线处理接口组中的提交任务接口，可以对提交的资源进行处理视频流/图片流识别视频作品中的人像区域，进行一键抠像、背景替换、人像虚化等后期处理。
     */
    async CreateSegmentationTask(req, cb) {
        return this.request("CreateSegmentationTask", req, cb);
    }
}
exports.Client = Client;
