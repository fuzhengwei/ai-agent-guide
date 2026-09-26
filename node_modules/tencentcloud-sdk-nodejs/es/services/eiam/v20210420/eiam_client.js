import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("eiam.tencentcloudapi.com", "2021-04-20", clientConfig);
    }
    async DescribeUserGroup(req, cb) {
        return this.request("DescribeUserGroup", req, cb);
    }
    async CreateAccountGroup(req, cb) {
        return this.request("CreateAccountGroup", req, cb);
    }
    async DescribeOrgResourcesAuthorization(req, cb) {
        return this.request("DescribeOrgResourcesAuthorization", req, cb);
    }
    async ModifyUserInfo(req, cb) {
        return this.request("ModifyUserInfo", req, cb);
    }
    async DescribePublicKey(req, cb) {
        return this.request("DescribePublicKey", req, cb);
    }
    async ListUsers(req, cb) {
        return this.request("ListUsers", req, cb);
    }
    async RemoveAccountFromAccountGroup(req, cb) {
        return this.request("RemoveAccountFromAccountGroup", req, cb);
    }
    async ListAccountInAccountGroup(req, cb) {
        return this.request("ListAccountInAccountGroup", req, cb);
    }
    async ListAuthorizedApplicationsToUserGroup(req, cb) {
        return this.request("ListAuthorizedApplicationsToUserGroup", req, cb);
    }
    async ListApplicationAuthorizations(req, cb) {
        return this.request("ListApplicationAuthorizations", req, cb);
    }
    async ModifyAccountGroup(req, cb) {
        return this.request("ModifyAccountGroup", req, cb);
    }
    async DescribeUserResourcesAuthorization(req, cb) {
        return this.request("DescribeUserResourcesAuthorization", req, cb);
    }
    async ModifyAppAccount(req, cb) {
        return this.request("ModifyAppAccount", req, cb);
    }
    async DescribeUserThirdPartyAccountInfo(req, cb) {
        return this.request("DescribeUserThirdPartyAccountInfo", req, cb);
    }
    async DeleteUserGroup(req, cb) {
        return this.request("DeleteUserGroup", req, cb);
    }
    async DeleteAccountGroup(req, cb) {
        return this.request("DeleteAccountGroup", req, cb);
    }
    async ModifyApplication(req, cb) {
        return this.request("ModifyApplication", req, cb);
    }
    async ListUserGroups(req, cb) {
        return this.request("ListUserGroups", req, cb);
    }
    async AddUserToUserGroup(req, cb) {
        return this.request("AddUserToUserGroup", req, cb);
    }
    async DeleteAppAccount(req, cb) {
        return this.request("DeleteAppAccount", req, cb);
    }
    async DescribeAccountGroup(req, cb) {
        return this.request("DescribeAccountGroup", req, cb);
    }
    async DeleteUsers(req, cb) {
        return this.request("DeleteUsers", req, cb);
    }
    async DescribeUserGroupResourcesAuthorization(req, cb) {
        return this.request("DescribeUserGroupResourcesAuthorization", req, cb);
    }
    async CreateAppAccount(req, cb) {
        return this.request("CreateAppAccount", req, cb);
    }
    async ListUsersInUserGroup(req, cb) {
        return this.request("ListUsersInUserGroup", req, cb);
    }
    async ListUserGroupsOfUser(req, cb) {
        return this.request("ListUserGroupsOfUser", req, cb);
    }
    async ListAuthorizedApplicationsToUser(req, cb) {
        return this.request("ListAuthorizedApplicationsToUser", req, cb);
    }
    async DescribeAppAccount(req, cb) {
        return this.request("DescribeAppAccount", req, cb);
    }
    async DescribeOrgNode(req, cb) {
        return this.request("DescribeOrgNode", req, cb);
    }
    async DescribeUserInfo(req, cb) {
        return this.request("DescribeUserInfo", req, cb);
    }
    async RemoveUserFromUserGroup(req, cb) {
        return this.request("RemoveUserFromUserGroup", req, cb);
    }
    async CreateOrgNode(req, cb) {
        return this.request("CreateOrgNode", req, cb);
    }
    async DeleteUser(req, cb) {
        return this.request("DeleteUser", req, cb);
    }
    async ListApplications(req, cb) {
        return this.request("ListApplications", req, cb);
    }
    async ListAuthorizedApplicationsToOrgNode(req, cb) {
        return this.request("ListAuthorizedApplicationsToOrgNode", req, cb);
    }
    async DeleteOrgNode(req, cb) {
        return this.request("DeleteOrgNode", req, cb);
    }
    async AddAccountToAccountGroup(req, cb) {
        return this.request("AddAccountToAccountGroup", req, cb);
    }
    async CreateUserGroup(req, cb) {
        return this.request("CreateUserGroup", req, cb);
    }
    async CreateUser(req, cb) {
        return this.request("CreateUser", req, cb);
    }
    async DescribeApplication(req, cb) {
        return this.request("DescribeApplication", req, cb);
    }
    async ListUsersInOrgNode(req, cb) {
        return this.request("ListUsersInOrgNode", req, cb);
    }
    async UpdateOrgNode(req, cb) {
        return this.request("UpdateOrgNode", req, cb);
    }
}
