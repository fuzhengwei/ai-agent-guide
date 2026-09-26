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
 * gs client
 * @class
 */
class Client extends abstract_client_1.AbstractClient {
    constructor(clientConfig) {
        super("gs.tencentcloudapi.com", "2019-11-18", clientConfig);
    }
    /**
     * 备份云手机数据到指定存储，支持 COS 和兼容 AWS S3 协议的对象存储服务。如果是备份到 COS 时，会使用公网流量，授权 COS bucket 请在控制台中操作。
     */
    async BackUpAndroidInstanceToStorage(req, cb) {
        return this.request("BackUpAndroidInstanceToStorage", req, cb);
    }
    /**
     * 批量修改安卓实例的用户ID
     */
    async ModifyAndroidInstancesUserId(req, cb) {
        return this.request("ModifyAndroidInstancesUserId", req, cb);
    }
    /**
     * 尝试锁定机器
     */
    async TrylockWorker(req, cb) {
        return this.request("TrylockWorker", req, cb);
    }
    /**
     * 批量修改安卓实例属性
     */
    async ModifyAndroidInstancesProperties(req, cb) {
        return this.request("ModifyAndroidInstancesProperties", req, cb);
    }
    /**
     * 关机安卓实例
     */
    async StopAndroidInstances(req, cb) {
        return this.request("StopAndroidInstances", req, cb);
    }
    /**
     * 在安卓实例上同步执行命令，仅支持1秒内可以返回结果的命令，例如：ls、cd。同时执行的实例数量不能过多，否则可能云api返回超时。不支持超过1秒无法返回或无法自主结束的命令，例如：top、vim，执行结果最大1KB
     */
    async SyncExecuteCommandOnAndroidInstances(req, cb) {
        return this.request("SyncExecuteCommandOnAndroidInstances", req, cb);
    }
    /**
     * 批量禁用安卓实例应用
     */
    async DisableAndroidInstancesApp(req, cb) {
        return this.request("DisableAndroidInstancesApp", req, cb);
    }
    /**
     * 将文件下载到指定实例列表的实例上，每个实例都会从公网下载文件。如果您需要将同一个文件分发到多个实例，建议使用 DistributeFileToAndroidInstances 接口减少公网下载的流量。如果您需要将不同的文件下载到不同的实例，可考虑使用 UploadFilesToAndroidInstances 接口批量将不同文件下载到不同的实例。
     */
    async UploadFileToAndroidInstances(req, cb) {
        return this.request("UploadFileToAndroidInstances", req, cb);
    }
    /**
     * 使用指定存储数据还原云手机，支持 COS 和兼容 AWS S3 协议的对象存储服务。如果还原数据来自 COS 时，会使用公网流量，授权 COS bucket 请在控制台中操作。
     */
    async RestoreAndroidInstanceFromStorage(req, cb) {
        return this.request("RestoreAndroidInstanceFromStorage", req, cb);
    }
    /**
     * 批量清理安卓实例应用数据
     */
    async CleanAndroidInstancesAppData(req, cb) {
        return this.request("CleanAndroidInstancesAppData", req, cb);
    }
    /**
     * 创建安卓实例 SSH 连接信息，请将返回结果的 PrivateKey 字段保存为 pem 文件，并将 pem 文件权限设置为 600，再参考返回结果的 ConnectCommand 使用 ssh 连接实例。
     */
    async CreateAndroidInstanceSSH(req, cb) {
        return this.request("CreateAndroidInstanceSSH", req, cb);
    }
    /**
     * 安卓实例截图
     */
    async CreateAndroidInstancesScreenshot(req, cb) {
        return this.request("CreateAndroidInstancesScreenshot", req, cb);
    }
    /**
     * 卸载安卓实例应用
     */
    async UninstallAndroidInstancesApp(req, cb) {
        return this.request("UninstallAndroidInstancesApp", req, cb);
    }
    /**
     * 使用指定的安卓实例创建镜像，创建镜像时指定的实例会关机，镜像创建完成后实例会自动开机。当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像创建完成处于可用状态。
     */
    async CreateAndroidInstanceImage(req, cb) {
        return this.request("CreateAndroidInstanceImage", req, cb);
    }
    /**
     * 批量启用安卓实例应用
     */
    async EnableAndroidInstancesApp(req, cb) {
        return this.request("EnableAndroidInstancesApp", req, cb);
    }
    /**
     * 开始云端推流
     */
    async StartPublishStreamToCSS(req, cb) {
        return this.request("StartPublishStreamToCSS", req, cb);
    }
    /**
     * 批量删除安卓实例备份
     */
    async DeleteAndroidInstanceBackups(req, cb) {
        return this.request("DeleteAndroidInstanceBackups", req, cb);
    }
    /**
     * 修改安卓实例的信息
     */
    async ModifyAndroidInstanceInformation(req, cb) {
        return this.request("ModifyAndroidInstanceInformation", req, cb);
    }
    /**
     * 删除安卓实例镜像
     */
    async DeleteAndroidInstanceImages(req, cb) {
        return this.request("DeleteAndroidInstanceImages", req, cb);
    }
    /**
     * 批量修改安卓实例信息
     */
    async ModifyAndroidInstancesInformation(req, cb) {
        return this.request("ModifyAndroidInstancesInformation", req, cb);
    }
    /**
     * 修改安卓实例应用黑名单
     */
    async ModifyAndroidInstancesAppBlacklist(req, cb) {
        return this.request("ModifyAndroidInstancesAppBlacklist", req, cb);
    }
    /**
     * 通过 URL 安装安卓实例应用
     */
    async InstallAndroidInstancesAppWithURL(req, cb) {
        return this.request("InstallAndroidInstancesAppWithURL", req, cb);
    }
    /**
     * 还原安卓实例。该接口需要联系我们开通内网存储才能使用。
     */
    async RestoreAndroidInstance(req, cb) {
        return this.request("RestoreAndroidInstance", req, cb);
    }
    /**
     * 查询安卓实例标签
     */
    async DescribeAndroidInstanceLabels(req, cb) {
        return this.request("DescribeAndroidInstanceLabels", req, cb);
    }
    /**
     * 查询安卓实例镜像信息，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像处于可用状态。
     */
    async DescribeAndroidInstanceImages(req, cb) {
        return this.request("DescribeAndroidInstanceImages", req, cb);
    }
    /**
     * 续期安卓实例访问Token
     */
    async RenewAndroidInstancesAccessToken(req, cb) {
        return this.request("RenewAndroidInstancesAccessToken", req, cb);
    }
    /**
     * 启动安卓实例应用
     */
    async StartAndroidInstancesApp(req, cb) {
        return this.request("StartAndroidInstancesApp", req, cb);
    }
    /**
     * 重启安卓实例应用
     */
    async RestartAndroidInstancesApp(req, cb) {
        return this.request("RestartAndroidInstancesApp", req, cb);
    }
    /**
     * 修改安卓实例分辨率。需要注意的是该接口需要重启才能生效。
     */
    async ModifyAndroidInstancesResolution(req, cb) {
        return this.request("ModifyAndroidInstancesResolution", req, cb);
    }
    /**
     * 查询安卓实例备份列表
     */
    async DescribeAndroidInstanceBackups(req, cb) {
        return this.request("DescribeAndroidInstanceBackups", req, cb);
    }
    /**
     * 删除安卓实例标签
     */
    async DeleteAndroidInstanceLabel(req, cb) {
        return this.request("DeleteAndroidInstanceLabel", req, cb);
    }
    /**
     * 分发安卓实例镜像至宿主机
     */
    async DistributeAndroidInstanceImageToHosts(req, cb) {
        return this.request("DistributeAndroidInstanceImageToHosts", req, cb);
    }
    /**
     * 创建安卓实例标签
     */
    async CreateAndroidInstanceLabel(req, cb) {
        return this.request("CreateAndroidInstanceLabel", req, cb);
    }
    /**
     * 创建安卓实例加速Token
     */
    async CreateAndroidInstanceAcceleratorToken(req, cb) {
        return this.request("CreateAndroidInstanceAcceleratorToken", req, cb);
    }
    /**
     * 创建安卓应用
     */
    async CreateAndroidApp(req, cb) {
        return this.request("CreateAndroidApp", req, cb);
    }
    /**
     * 批量修改安卓实例资源限制
     */
    async ModifyAndroidInstancesResources(req, cb) {
        return this.request("ModifyAndroidInstancesResources", req, cb);
    }
    /**
     * 创建安卓实例 WebShell 连接信息，返回的 ConnectUrl 可通过浏览器直接打开访问，链接有效期 1 小时，链接打开后可持续使用。
     */
    async CreateAndroidInstanceWebShell(req, cb) {
        return this.request("CreateAndroidInstanceWebShell", req, cb);
    }
    /**
     * 停止安卓实例应用
     */
    async StopAndroidInstancesApp(req, cb) {
        return this.request("StopAndroidInstancesApp", req, cb);
    }
    /**
     * 开始云端推流
     */
    async StartPublishStream(req, cb) {
        return this.request("StartPublishStream", req, cb);
    }
    /**
     * 查询安卓实例
     */
    async DescribeAndroidInstances(req, cb) {
        return this.request("DescribeAndroidInstances", req, cb);
    }
    /**
     * 批量将不同的文件下载到不同的实例，每个实例下载文件都是从公网下载，建议只用在文件下载使用一次的场景。如果您需要将同一个文件分发到不同实例，建议使用 DistributeFileToAndroidInstances 接口。
     */
    async UploadFilesToAndroidInstances(req, cb) {
        return this.request("UploadFilesToAndroidInstances", req, cb);
    }
    /**
     * 同步安卓实例镜像到其他区域，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像已经同步完成处于可用状态。
     */
    async SyncAndroidInstanceImage(req, cb) {
        return this.request("SyncAndroidInstanceImage", req, cb);
    }
    /**
     * 将一张照片批量分发到多个实例的相册中，一次接口调用触发一次照片分发，一次照片分发只会从公网下载一次，然后照片会走内网分发到实例列表中的实例。
     */
    async DistributePhotoToAndroidInstances(req, cb) {
        return this.request("DistributePhotoToAndroidInstances", req, cb);
    }
    /**
     * 查询安卓实例黑名单
     */
    async DescribeAndroidInstancesAppBlacklist(req, cb) {
        return this.request("DescribeAndroidInstancesAppBlacklist", req, cb);
    }
    /**
     * 断开安卓实例加速节点
     */
    async DisconnectAndroidInstanceAccelerator(req, cb) {
        return this.request("DisconnectAndroidInstanceAccelerator", req, cb);
    }
    /**
     * 获取并发总数和运行数
     */
    async DescribeInstancesCount(req, cb) {
        return this.request("DescribeInstancesCount", req, cb);
    }
    /**
     * 创建安卓实例
     */
    async CreateAndroidInstances(req, cb) {
        return this.request("CreateAndroidInstances", req, cb);
    }
    /**
     * 用于创建 Cos 临时密钥
     */
    async CreateCosCredential(req, cb) {
        return this.request("CreateCosCredential", req, cb);
    }
    /**
     * 备份安卓实例。该接口需要联系我们开通内网存储才能使用。
     */
    async BackUpAndroidInstance(req, cb) {
        return this.request("BackUpAndroidInstance", req, cb);
    }
    /**
     * 修改安卓应用信息
     */
    async ModifyAndroidApp(req, cb) {
        return this.request("ModifyAndroidApp", req, cb);
    }
    /**
     * 开机安卓实例
     */
    async StartAndroidInstances(req, cb) {
        return this.request("StartAndroidInstances", req, cb);
    }
    /**
     * 修改安卓实例分辨率。需要注意的是该接口可能导致正在运行的应用出现闪退，所以建议在实例维护时期才进行调用。
     */
    async ModifyAndroidInstanceResolution(req, cb) {
        return this.request("ModifyAndroidInstanceResolution", req, cb);
    }
    /**
     * 连接安卓实例
     */
    async ConnectAndroidInstance(req, cb) {
        return this.request("ConnectAndroidInstance", req, cb);
    }
    /**
     * 停止云端推流
     */
    async StopPublishStream(req, cb) {
        return this.request("StopPublishStream", req, cb);
    }
    /**
     * 断开安卓实例
     */
    async DisconnectAndroidInstance(req, cb) {
        return this.request("DisconnectAndroidInstance", req, cb);
    }
    /**
     * 查询安卓实例应用
     */
    async DescribeAndroidInstanceApps(req, cb) {
        return this.request("DescribeAndroidInstanceApps", req, cb);
    }
    /**
     * 切换游戏存档
     */
    async SwitchGameArchive(req, cb) {
        return this.request("SwitchGameArchive", req, cb);
    }
    /**
     * 将一个文件批量分发到多个实例，一次接口调用触发一次文件分发，一次文件分发只会从公网下载一次，然后文件会走内网分发到实例列表中的实例。
     */
    async DistributeFileToAndroidInstances(req, cb) {
        return this.request("DistributeFileToAndroidInstances", req, cb);
    }
    /**
     * 重启安卓实例宿主机。请注意：

- 当前每 15 分钟只能重启一次
- 一个宿主机可能有多个云手机实例，重启宿主机会影响运行在上面的所有实例，请确保该宿主机上的所有云手机实例未投入业务使用
     */
    async RebootAndroidInstanceHosts(req, cb) {
        return this.request("RebootAndroidInstanceHosts", req, cb);
    }
    /**
     * 创建会话
     */
    async CreateSession(req, cb) {
        return this.request("CreateSession", req, cb);
    }
    /**
     * 删除安卓应用版本
     */
    async DeleteAndroidAppVersion(req, cb) {
        return this.request("DeleteAndroidAppVersion", req, cb);
    }
    /**
     * 重置安卓实例
     */
    async ResetAndroidInstances(req, cb) {
        return this.request("ResetAndroidInstances", req, cb);
    }
    /**
     * 安装安卓实例应用
     */
    async InstallAndroidInstancesApp(req, cb) {
        return this.request("InstallAndroidInstancesApp", req, cb);
    }
    /**
     * 批量设置安卓实例应用前台保活，开启应用保活，只是降低应用被杀死或回收的优先级，并不能保证应用不会被杀死或回收（如出现内存不足等资源限制时，应用也有概率被杀死或回收）
     */
    async SetAndroidInstancesFGAppKeepAlive(req, cb) {
        return this.request("SetAndroidInstancesFGAppKeepAlive", req, cb);
    }
    /**
     * 查询安卓应用信息
     */
    async DescribeAndroidApps(req, cb) {
        return this.request("DescribeAndroidApps", req, cb);
    }
    /**
     * 创建安卓实例访问Token
     */
    async CreateAndroidInstancesAccessToken(req, cb) {
        return this.request("CreateAndroidInstancesAccessToken", req, cb);
    }
    /**
     * 复制安卓实例：
1. 排除和包含文件只能指定 /data 下的文件，不指定时复制整个 /data 目录
2. 源实例和目的实例必须在同一区域
3. 复制时，源实例和目的实例都会停机，复制完后实例会自动启动
4. 复制时会产生大量内网流量，请限制并发
     */
    async CopyAndroidInstance(req, cb) {
        return this.request("CopyAndroidInstance", req, cb);
    }
    /**
     * 创建安卓应用版本
     */
    async CreateAndroidAppVersion(req, cb) {
        return this.request("CreateAndroidAppVersion", req, cb);
    }
    /**
     * 销毁安卓实例
     */
    async DestroyAndroidInstances(req, cb) {
        return this.request("DestroyAndroidInstances", req, cb);
    }
    /**
     * 删除安卓应用
     */
    async DeleteAndroidApp(req, cb) {
        return this.request("DeleteAndroidApp", req, cb);
    }
    /**
     * 创建云手机实例 ADB 连接信息，请将返回结果的 PrivateKey 字段保存为 pem 文件，并将 pem 文件权限设置为 600，再参考返回结果的 ConnectCommand 使用 adb 连接实例。
     */
    async CreateAndroidInstanceADB(req, cb) {
        return this.request("CreateAndroidInstanceADB", req, cb);
    }
    /**
     * 批量设置安卓实例应用后台保活，开启应用保活，只是降低应用被杀死或回收的优先级，并不能保证应用不会被杀死或回收（如出现内存不足等资源限制时，应用也有概率被杀死或回收）
     */
    async SetAndroidInstancesBGAppKeepAlive(req, cb) {
        return this.request("SetAndroidInstancesBGAppKeepAlive", req, cb);
    }
    /**
     * 强制退出游戏
     */
    async StopGame(req, cb) {
        return this.request("StopGame", req, cb);
    }
    /**
     * 批量将实例的 logcat 日志文件上传到您已授权的 COS bucket 中，授权 COS bucket 请在控制台中操作。
     */
    async FetchAndroidInstancesLogs(req, cb) {
        return this.request("FetchAndroidInstancesLogs", req, cb);
    }
    /**
     * 在安卓实例上异步执行命令，命令输出结果如果内容过长会被截断
     */
    async ExecuteCommandOnAndroidInstances(req, cb) {
        return this.request("ExecuteCommandOnAndroidInstances", req, cb);
    }
    /**
     * 重启安卓实例
     */
    async RebootAndroidInstances(req, cb) {
        return this.request("RebootAndroidInstances", req, cb);
    }
    /**
     * 导入安卓实例镜像，当镜像的 AndroidInstanceImageState 为 NORMAL 时，镜像导入完成处于可用状态。
     */
    async ImportAndroidInstanceImage(req, cb) {
        return this.request("ImportAndroidInstanceImage", req, cb);
    }
    /**
     * 批量查询安装指定应用的安卓实例
     */
    async DescribeAndroidInstancesByApps(req, cb) {
        return this.request("DescribeAndroidInstancesByApps", req, cb);
    }
    /**
     * 删除安卓实例备份文件
     */
    async DeleteAndroidInstanceBackupFiles(req, cb) {
        return this.request("DeleteAndroidInstanceBackupFiles", req, cb);
    }
    /**
     * 修改安卓应用版本
     */
    async ModifyAndroidAppVersion(req, cb) {
        return this.request("ModifyAndroidAppVersion", req, cb);
    }
    /**
     * 批量修改安卓实例的标签
     */
    async ModifyAndroidInstancesLabels(req, cb) {
        return this.request("ModifyAndroidInstancesLabels", req, cb);
    }
    /**
     * 保存游戏存档
     */
    async SaveGameArchive(req, cb) {
        return this.request("SaveGameArchive", req, cb);
    }
    /**
     * 查询安卓实例任务状态
     */
    async DescribeAndroidInstanceTasksStatus(req, cb) {
        return this.request("DescribeAndroidInstanceTasksStatus", req, cb);
    }
}
exports.Client = Client;
