# Tencent Cloud Base(TCB) Server Node.js SDK

[![NPM Version](https://img.shields.io/npm/v/@cloudbase/node-sdk)](https://www.npmjs.com/package/@cloudbase/node-sdk)
![node (scoped)](https://img.shields.io/node/v/@cloudbase/node-sdk)

Cloudbase Server Node.js SDK 让您可以在服务端（如腾讯云云函数或 云主机 等）使用 Node.js 服务访问 TCB 的的服务，如云函数调用，文件上传下载，数据库集合文档操作等，方便快速搭建应用。

## 目录

- [介绍](#介绍)
- [安装](#安装)
- [文档](#文档)

## 介绍

TCB 提供开发应用所需服务和基础设施。CloudBase server node.js SDK 让你可以在服务端（如腾讯云云函数或 云主机 等）使用 Node.js 服务访问 CloudBase 的的服务。

> 注意：从 `v3` 开始需要 Node.js `v12.0` 及以上版本，需要更低的 Node.js 版本可以选择 `v2` 版本。
> 注意：从 `v3` 版本开始，TCB 云函数中如果 `tcb.init({})` 未指定环境 ID，则使用当前云函数所在环境的环境 ID，而不是云开发默认环境 ID，即可以不再使用 `tcb.SYMBOL_CURRENT_ENV` 字段。

## 安装

```sh
npm install --save @cloudbase/node-sdk
```

要在你的项目中使用模块可以

```ts
import tcb from "@cloudbase/node-sdk"
```

或

```js
const tcb = require("@cloudbase/node-sdk")
```

## 文档

- [初始化](docs/initialization.md)
- [存储](docs/storage.md)
- [数据库](docs/database/database.md)
- [数据模型](./docs/models.md)
- [云函数/云函数2.0](docs/functions.md)
- [云托管](docs/cloudrun.md)
- [鉴权](./docs/auth.md)
- [环境](./docs/env.md)
- [通知消息](./docs/templateNotify.md)
