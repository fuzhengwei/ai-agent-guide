import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeKnowledgeSetListRequest, UploadKnowledgeDocumentSetRequest, UpdateKnowledgeSetResponse, DescribeAppsRequest, DescribeKnowledgeDocumentSetListResponse, DeleteAppBindWxAppResponse, CheckDeployAppResponse, SearchDocListResponse, CheckDeployAppRequest, DescribeKnowledgeDocumentSetListRequest, PutWxAppIdToWeAppRequest, UpdateKnowledgeSetRequest, DeployAppRequest, DescribeKnowledgeDocumentSetDetailRequest, DeployAppResponse, DeleteKnowledgeSetRequest, DeleteKnowledgeSetResponse, DescribeDataSourceListRequest, DeleteKnowledgeDocumentSetRequest, DescribeResourceRoleListResponse, DescribeRelatedUsersResponse, DescribeKnowledgeSetListResponse, DescribeDataSourceListResponse, DescribeAppsResponse, DeleteAppBindWxAppRequest, UploadKnowledgeDocumentSetResponse, DeleteKnowledgeDocumentSetResponse, CreateKnowledgeSetRequest, DescribeKnowledgeDocumentSetDetailResponse, SearchDocListRequest, DescribeResourceRoleListRequest, DescribeRelatedUsersRequest, PutWxAppIdToWeAppResponse, CreateKnowledgeSetResponse } from "./lowcode_models";
/**
 * lowcode client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 创建知识库
     */
    CreateKnowledgeSet(req: CreateKnowledgeSetRequest, cb?: (error: string, rep: CreateKnowledgeSetResponse) => void): Promise<CreateKnowledgeSetResponse>;
    /**
     * 检查应用发布状态
     */
    CheckDeployApp(req: CheckDeployAppRequest, cb?: (error: string, rep: CheckDeployAppResponse) => void): Promise<CheckDeployAppResponse>;
    /**
     * 更新知识库
     */
    UpdateKnowledgeSet(req: UpdateKnowledgeSetRequest, cb?: (error: string, rep: UpdateKnowledgeSetResponse) => void): Promise<UpdateKnowledgeSetResponse>;
    /**
     * 分页获取当前用户的应用列表
     */
    DescribeApps(req: DescribeAppsRequest, cb?: (error: string, rep: DescribeAppsResponse) => void): Promise<DescribeAppsResponse>;
    /**
     * 获取角色关联的用户列表
     */
    DescribeRelatedUsers(req: DescribeRelatedUsersRequest, cb?: (error: string, rep: DescribeRelatedUsersResponse) => void): Promise<DescribeRelatedUsersResponse>;
    /**
     * 查询知识库
     */
    DescribeKnowledgeSetList(req: DescribeKnowledgeSetListRequest, cb?: (error: string, rep: DescribeKnowledgeSetListResponse) => void): Promise<DescribeKnowledgeSetListResponse>;
    /**
     * 知识库文档搜索接口
     */
    SearchDocList(req: SearchDocListRequest, cb?: (error: string, rep: SearchDocListResponse) => void): Promise<SearchDocListResponse>;
    /**
     * 获取数据源详情列表
     */
    DescribeDataSourceList(req: DescribeDataSourceListRequest, cb?: (error: string, rep: DescribeDataSourceListResponse) => void): Promise<DescribeDataSourceListResponse>;
    /**
     * 接口提供应用绑定微信ID功能。
     */
    PutWxAppIdToWeApp(req: PutWxAppIdToWeAppRequest, cb?: (error: string, rep: PutWxAppIdToWeAppResponse) => void): Promise<PutWxAppIdToWeAppResponse>;
    /**
     * 删除知识库下文档
     */
    DeleteKnowledgeDocumentSet(req: DeleteKnowledgeDocumentSetRequest, cb?: (error: string, rep: DeleteKnowledgeDocumentSetResponse) => void): Promise<DeleteKnowledgeDocumentSetResponse>;
    /**
     * 获取知识库下文档详情
     */
    DescribeKnowledgeDocumentSetDetail(req: DescribeKnowledgeDocumentSetDetailRequest, cb?: (error: string, rep: DescribeKnowledgeDocumentSetDetailResponse) => void): Promise<DescribeKnowledgeDocumentSetDetailResponse>;
    /**
     * 更新知识库
     */
    UploadKnowledgeDocumentSet(req: UploadKnowledgeDocumentSetRequest, cb?: (error: string, rep: UploadKnowledgeDocumentSetResponse) => void): Promise<UploadKnowledgeDocumentSetResponse>;
    /**
     * 删除应用绑定小程序
     */
    DeleteAppBindWxApp(req: DeleteAppBindWxAppRequest, cb?: (error: string, rep: DeleteAppBindWxAppResponse) => void): Promise<DeleteAppBindWxAppResponse>;
    /**
     * 查询知识库下文件集合
     */
    DescribeKnowledgeDocumentSetList(req: DescribeKnowledgeDocumentSetListRequest, cb?: (error: string, rep: DescribeKnowledgeDocumentSetListResponse) => void): Promise<DescribeKnowledgeDocumentSetListResponse>;
    /**
     * 发布应用
     */
    DeployApp(req: DeployAppRequest, cb?: (error: string, rep: DeployAppResponse) => void): Promise<DeployAppResponse>;
    /**
     * 查询资源关联的角色列表
     */
    DescribeResourceRoleList(req: DescribeResourceRoleListRequest, cb?: (error: string, rep: DescribeResourceRoleListResponse) => void): Promise<DescribeResourceRoleListResponse>;
    /**
     * 删除知识库
     */
    DeleteKnowledgeSet(req: DeleteKnowledgeSetRequest, cb?: (error: string, rep: DeleteKnowledgeSetResponse) => void): Promise<DeleteKnowledgeSetResponse>;
}
