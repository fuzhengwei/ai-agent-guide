import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { CreateRoleUserRequest, CompleteApprovalRequest, DeleteRoleUserRequest, DeleteRoleUserResponse, PutEventResponse, CreateRoleUserResponse, PutEventRequest, CompleteApprovalResponse, PutMessageResponse, PutMessageRequest } from "./evt_models";
/**
 * evt client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 推送事件数据
     */
    PutEvent(req: PutEventRequest, cb?: (error: string, rep: PutEventResponse) => void): Promise<PutEventResponse>;
    /**
     * 删除自定义用户
     */
    DeleteRoleUser(req: DeleteRoleUserRequest, cb?: (error: string, rep: DeleteRoleUserResponse) => void): Promise<DeleteRoleUserResponse>;
    /**
     * 创建人员
     */
    CreateRoleUser(req: CreateRoleUserRequest, cb?: (error: string, rep: CreateRoleUserResponse) => void): Promise<CreateRoleUserResponse>;
    /**
     * 执行审批
     */
    CompleteApproval(req: CompleteApprovalRequest, cb?: (error: string, rep: CompleteApprovalResponse) => void): Promise<CompleteApprovalResponse>;
    /**
     * 推送事件数据
     */
    PutMessage(req: PutMessageRequest, cb?: (error: string, rep: PutMessageResponse) => void): Promise<PutMessageResponse>;
}
