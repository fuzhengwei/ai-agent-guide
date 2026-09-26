import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("organization.tencentcloudapi.com", "2018-12-25", clientConfig);
    }
    async DenyOrganizationInvitation(req, cb) {
        return this.request("DenyOrganizationInvitation", req, cb);
    }
    async ListOrganizationInvitations(req, cb) {
        return this.request("ListOrganizationInvitations", req, cb);
    }
    async UpdateOrganizationNode(req, cb) {
        return this.request("UpdateOrganizationNode", req, cb);
    }
    async AcceptOrganizationInvitation(req, cb) {
        return this.request("AcceptOrganizationInvitation", req, cb);
    }
    async GetOrganizationMember(req, cb) {
        return this.request("GetOrganizationMember", req, cb);
    }
    async GetOrganization(req, cb) {
        return this.request("GetOrganization", req, cb);
    }
    async ListOrganizationNodes(req, cb) {
        return this.request("ListOrganizationNodes", req, cb);
    }
    async UpdateOrganizationMember(req, cb) {
        return this.request("UpdateOrganizationMember", req, cb);
    }
    async QuitOrganization(req, cb) {
        return this.request("QuitOrganization", req, cb);
    }
    async DeleteOrganizationNodes(req, cb) {
        return this.request("DeleteOrganizationNodes", req, cb);
    }
    async ListOrganizationMembers(req, cb) {
        return this.request("ListOrganizationMembers", req, cb);
    }
    async DeleteOrganizationMemberFromNode(req, cb) {
        return this.request("DeleteOrganizationMemberFromNode", req, cb);
    }
    async AddOrganizationNode(req, cb) {
        return this.request("AddOrganizationNode", req, cb);
    }
    async SendOrganizationInvitation(req, cb) {
        return this.request("SendOrganizationInvitation", req, cb);
    }
    async CancelOrganizationInvitation(req, cb) {
        return this.request("CancelOrganizationInvitation", req, cb);
    }
    async DeleteOrganization(req, cb) {
        return this.request("DeleteOrganization", req, cb);
    }
    async DeleteOrganizationMembers(req, cb) {
        return this.request("DeleteOrganizationMembers", req, cb);
    }
    async ListOrganizationNodeMembers(req, cb) {
        return this.request("ListOrganizationNodeMembers", req, cb);
    }
    async CreateOrganization(req, cb) {
        return this.request("CreateOrganization", req, cb);
    }
    async MoveOrganizationMembersToNode(req, cb) {
        return this.request("MoveOrganizationMembersToNode", req, cb);
    }
}
