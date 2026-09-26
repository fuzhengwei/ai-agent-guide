import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("ciam.tencentcloudapi.com", "2022-03-31", clientConfig);
    }
    async UpdateUserStatus(req, cb) {
        return this.request("UpdateUserStatus", req, cb);
    }
    async ListJobs(req, cb) {
        return this.request("ListJobs", req, cb);
    }
    async DeleteUserStore(req, cb) {
        return this.request("DeleteUserStore", req, cb);
    }
    async DeleteUserGroups(req, cb) {
        return this.request("DeleteUserGroups", req, cb);
    }
    async UpdateUserStore(req, cb) {
        return this.request("UpdateUserStore", req, cb);
    }
    async CreateApiImportUserJob(req, cb) {
        return this.request("CreateApiImportUserJob", req, cb);
    }
    async LinkAccount(req, cb) {
        return this.request("LinkAccount", req, cb);
    }
    async ResetPassword(req, cb) {
        return this.request("ResetPassword", req, cb);
    }
    async UpdateUser(req, cb) {
        return this.request("UpdateUser", req, cb);
    }
    async DescribeUser(req, cb) {
        return this.request("DescribeUser", req, cb);
    }
    async ListUserGroups(req, cb) {
        return this.request("ListUserGroups", req, cb);
    }
    async ListUser(req, cb) {
        return this.request("ListUser", req, cb);
    }
    async UpdateUserGroup(req, cb) {
        return this.request("UpdateUserGroup", req, cb);
    }
    async CreateUserStore(req, cb) {
        return this.request("CreateUserStore", req, cb);
    }
    async DeleteUsers(req, cb) {
        return this.request("DeleteUsers", req, cb);
    }
    async ListUserByProperty(req, cb) {
        return this.request("ListUserByProperty", req, cb);
    }
    async DescribeUserById(req, cb) {
        return this.request("DescribeUserById", req, cb);
    }
    async SetPassword(req, cb) {
        return this.request("SetPassword", req, cb);
    }
    async CreateFileExportUserJob(req, cb) {
        return this.request("CreateFileExportUserJob", req, cb);
    }
    async ListUserStore(req, cb) {
        return this.request("ListUserStore", req, cb);
    }
    async CreateUserGroup(req, cb) {
        return this.request("CreateUserGroup", req, cb);
    }
    async CreateUser(req, cb) {
        return this.request("CreateUser", req, cb);
    }
    async ListLogMessageByCondition(req, cb) {
        return this.request("ListLogMessageByCondition", req, cb);
    }
}
