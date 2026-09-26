import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeFakeWechatOfficialsResponse, CreateEnterpriseResponse, CreateAssetResponse, DescribeFakeAppsRequest, DescribeJobRecordsResponse, CreateWechatAppletRequest, DescribeAppsRequest, DescribeSensitiveInfosRequest, DeleteAssetsRequest, DescribeWechatAppletsResponse, DescribeCustomersRequest, ModifyLabelRequest, DescribeFakeWebsitesResponse, CreatePortResponse, DeletePortsResponse, DeleteManagesRequest, DescribeManagesRequest, DescribeNetDisksResponse, CreateJobRecordResponse, DescribeCustomersResponse, DescribeDomainsResponse, ModifySeedStatusResponse, DeleteEnterprisesResponse, CreateSeedsRequest, DescribePortsResponse, DeleteWechatAppletsRequest, DescribeSensitiveInfosResponse, DescribeConfigsResponse, CreateAppResponse, DeleteSubDomainsResponse, CreateSeedsResponse, DeleteSuspiciousAssetsRequest, DescribeFakeWebsitesRequest, ModifyCustomerResponse, CreateJobRecordRequest, DescribeSuspiciousAssetsResponse, DescribeSeedsResponse, DescribeAssetsRequest, DescribeJobRecordDetailsRequest, DescribeSubDomainsRequest, DescribeVulsResponse, CreateSuspiciousAssetResponse, DescribeLeakageEmailsResponse, CreateHttpRequest, DescribeAssetsResponse, DeleteAssetsResponse, DeletePortsRequest, DeleteManagesResponse, StopJobRecordRequest, ModifyLabelResponse, DescribeEnterprisesRequest, DescribeLeakageCodesRequest, DeleteHttpsRequest, CreateAppRequest, CreateDomainResponse, DeleteWechatOfficialAccountsRequest, DeleteSeedsResponse, DescribePortsRequest, DescribeGithubsRequest, DescribeConfigsRequest, DeleteSeedsRequest, CreateHttpResponse, DescribeSeedsRequest, CreateSubDomainRequest, DescribeWechatOfficialAccountsRequest, DescribeDarkWebsRequest, DescribeHttpsRequest, DescribeEnterprisesResponse, DeleteSuspiciousAssetsResponse, DescribeNetDisksRequest, IgnoreDataRequest, CreateDomainRequest, DeleteDomainsRequest, ModifyCustomerRequest, DescribeApiSecsResponse, CreateAssetRequest, DeleteHttpsResponse, CreatePortRequest, DescribeSuspiciousAssetsRequest, IgnoreDataResponse, CreateWechatAppletResponse, DescribeWechatAppletsRequest, DescribeFakeAppsResponse, DescribeLeakageEmailsRequest, DescribeGithubsResponse, CreateCustomerResponse, CreateWechatOfficialAccountRequest, DeleteWechatOfficialAccountsResponse, DescribeManagesResponse, CreateEnterpriseRequest, DeleteDomainsResponse, DescribeWeakPasswordsRequest, StopJobRecordResponse, CreateManageResponse, DescribeFakeMiniProgramsRequest, CreateManageRequest, ModifySeedStatusRequest, CreateCustomerRequest, DeleteEnterprisesRequest, DescribeLeakageDatasRequest, DescribeJobRecordDetailsResponse, DeleteSubDomainsRequest, DescribeVulsRequest, CreateWechatOfficialAccountResponse, CreateSubDomainResponse, DeleteAppsResponse, DescribeFakeMiniProgramsResponse, DescribeSubDomainsResponse, DescribeHttpsResponse, DescribeWechatOfficialAccountsResponse, DescribeLeakageDatasResponse, DeleteWechatAppletsResponse, CreateSuspiciousAssetRequest, DescribeAppsResponse, DescribeWeakPasswordsResponse, DescribeFakeWechatOfficialsRequest, DescribeApiSecsRequest, DescribeJobRecordsRequest, DescribeLeakageCodesResponse, DescribeDomainsRequest, DeleteAppsRequest, DescribeDarkWebsResponse } from "./ctem_models";
/**
 * ctem client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * 添加微信小程序资产
     */
    CreateWechatApplet(req: CreateWechatAppletRequest, cb?: (error: string, rep: CreateWechatAppletResponse) => void): Promise<CreateWechatAppletResponse>;
    /**
     * 查看网盘泄露数据
     */
    DescribeNetDisks(req: DescribeNetDisksRequest, cb?: (error: string, rep: DescribeNetDisksResponse) => void): Promise<DescribeNetDisksResponse>;
    /**
     * 添加后台数据
     */
    CreateManage(req: CreateManageRequest, cb?: (error: string, rep: CreateManageResponse) => void): Promise<CreateManageResponse>;
    /**
     * 查看后台管理数据
     */
    DescribeManages(req: DescribeManagesRequest, cb?: (error: string, rep: DescribeManagesResponse) => void): Promise<DescribeManagesResponse>;
    /**
     * 获取数据泄露事件
     */
    DescribeLeakageDatas(req: DescribeLeakageDatasRequest, cb?: (error: string, rep: DescribeLeakageDatasResponse) => void): Promise<DescribeLeakageDatasResponse>;
    /**
     * 查看http数据
     */
    DescribeHttps(req: DescribeHttpsRequest, cb?: (error: string, rep: DescribeHttpsResponse) => void): Promise<DescribeHttpsResponse>;
    /**
     * 编辑企业
     */
    ModifyCustomer(req: ModifyCustomerRequest, cb?: (error: string, rep: ModifyCustomerResponse) => void): Promise<ModifyCustomerResponse>;
    /**
     * 添加主机资产
     */
    CreateAsset(req: CreateAssetRequest, cb?: (error: string, rep: CreateAssetResponse) => void): Promise<CreateAssetResponse>;
    /**
     * 删除后台数据
     */
    DeleteManages(req: DeleteManagesRequest, cb?: (error: string, rep: DeleteManagesResponse) => void): Promise<DeleteManagesResponse>;
    /**
     * 删除网站资产数据
     */
    DeleteHttps(req: DeleteHttpsRequest, cb?: (error: string, rep: DeleteHttpsResponse) => void): Promise<DeleteHttpsResponse>;
    /**
     * 添加影子资产
     */
    CreateSuspiciousAsset(req: CreateSuspiciousAssetRequest, cb?: (error: string, rep: CreateSuspiciousAssetResponse) => void): Promise<CreateSuspiciousAssetResponse>;
    /**
     * 删除影子资产数据
     */
    DeleteSuspiciousAssets(req: DeleteSuspiciousAssetsRequest, cb?: (error: string, rep: DeleteSuspiciousAssetsResponse) => void): Promise<DeleteSuspiciousAssetsResponse>;
    /**
     * 查看API安全数据
     */
    DescribeApiSecs(req: DescribeApiSecsRequest, cb?: (error: string, rep: DescribeApiSecsResponse) => void): Promise<DescribeApiSecsResponse>;
    /**
     * 查看主域名数据
     */
    DescribeDomains(req: DescribeDomainsRequest, cb?: (error: string, rep: DescribeDomainsResponse) => void): Promise<DescribeDomainsResponse>;
    /**
     * 查看主机资产
     */
    DescribeAssets(req: DescribeAssetsRequest, cb?: (error: string, rep: DescribeAssetsResponse) => void): Promise<DescribeAssetsResponse>;
    /**
     * 删除子域名数据
     */
    DeleteSubDomains(req: DeleteSubDomainsRequest, cb?: (error: string, rep: DeleteSubDomainsResponse) => void): Promise<DeleteSubDomainsResponse>;
    /**
     * 查看漏洞数据
     */
    DescribeVuls(req: DescribeVulsRequest, cb?: (error: string, rep: DescribeVulsResponse) => void): Promise<DescribeVulsResponse>;
    /**
     * 查看种子列表
     */
    DescribeSeeds(req: DescribeSeedsRequest, cb?: (error: string, rep: DescribeSeedsResponse) => void): Promise<DescribeSeedsResponse>;
    /**
     * 查看目录爆破数据
     */
    DescribeConfigs(req: DescribeConfigsRequest, cb?: (error: string, rep: DescribeConfigsResponse) => void): Promise<DescribeConfigsResponse>;
    /**
     * 删除微信公众号数据
     */
    DeleteWechatOfficialAccounts(req: DeleteWechatOfficialAccountsRequest, cb?: (error: string, rep: DeleteWechatOfficialAccountsResponse) => void): Promise<DeleteWechatOfficialAccountsResponse>;
    /**
     * 删除微信小程序数据
     */
    DeleteWechatApplets(req: DeleteWechatAppletsRequest, cb?: (error: string, rep: DeleteWechatAppletsResponse) => void): Promise<DeleteWechatAppletsResponse>;
    /**
     * 查询仿冒网站
     */
    DescribeFakeWebsites(req: DescribeFakeWebsitesRequest, cb?: (error: string, rep: DescribeFakeWebsitesResponse) => void): Promise<DescribeFakeWebsitesResponse>;
    /**
     * 忽略数据
     */
    IgnoreData(req: IgnoreDataRequest, cb?: (error: string, rep: IgnoreDataResponse) => void): Promise<IgnoreDataResponse>;
    /**
     * 查看敏感信息泄露数据
     */
    DescribeSensitiveInfos(req: DescribeSensitiveInfosRequest, cb?: (error: string, rep: DescribeSensitiveInfosResponse) => void): Promise<DescribeSensitiveInfosResponse>;
    /**
     * 添加子域名数据
     */
    CreateSubDomain(req: CreateSubDomainRequest, cb?: (error: string, rep: CreateSubDomainResponse) => void): Promise<CreateSubDomainResponse>;
    /**
     * 查询仿冒小程序
     */
    DescribeFakeMiniPrograms(req: DescribeFakeMiniProgramsRequest, cb?: (error: string, rep: DescribeFakeMiniProgramsResponse) => void): Promise<DescribeFakeMiniProgramsResponse>;
    /**
     * 查看子域名数据
     */
    DescribeSubDomains(req: DescribeSubDomainsRequest, cb?: (error: string, rep: DescribeSubDomainsResponse) => void): Promise<DescribeSubDomainsResponse>;
    /**
     * 查看企业列表
     */
    DescribeCustomers(req: DescribeCustomersRequest, cb?: (error: string, rep: DescribeCustomersResponse) => void): Promise<DescribeCustomersResponse>;
    /**
     * 获取邮箱泄露数据
     */
    DescribeLeakageEmails(req: DescribeLeakageEmailsRequest, cb?: (error: string, rep: DescribeLeakageEmailsResponse) => void): Promise<DescribeLeakageEmailsResponse>;
    /**
     * 删除端口数据
     */
    DeletePorts(req: DeletePortsRequest, cb?: (error: string, rep: DeletePortsResponse) => void): Promise<DeletePortsResponse>;
    /**
     * 添加端口服务资产
     */
    CreatePort(req: CreatePortRequest, cb?: (error: string, rep: CreatePortResponse) => void): Promise<CreatePortResponse>;
    /**
     * 查询仿冒应用
     */
    DescribeFakeApps(req: DescribeFakeAppsRequest, cb?: (error: string, rep: DescribeFakeAppsResponse) => void): Promise<DescribeFakeAppsResponse>;
    /**
     * 修改标签
     */
    ModifyLabel(req: ModifyLabelRequest, cb?: (error: string, rep: ModifyLabelResponse) => void): Promise<ModifyLabelResponse>;
    /**
     * 查看移动端资产
     */
    DescribeApps(req: DescribeAppsRequest, cb?: (error: string, rep: DescribeAppsResponse) => void): Promise<DescribeAppsResponse>;
    /**
     * 添加微信公众号资产
     */
    CreateWechatOfficialAccount(req: CreateWechatOfficialAccountRequest, cb?: (error: string, rep: CreateWechatOfficialAccountResponse) => void): Promise<CreateWechatOfficialAccountResponse>;
    /**
     * 查询仿冒公众号
     */
    DescribeFakeWechatOfficials(req: DescribeFakeWechatOfficialsRequest, cb?: (error: string, rep: DescribeFakeWechatOfficialsResponse) => void): Promise<DescribeFakeWechatOfficialsResponse>;
    /**
     * 查看链路详情
     */
    DescribeJobRecordDetails(req: DescribeJobRecordDetailsRequest, cb?: (error: string, rep: DescribeJobRecordDetailsResponse) => void): Promise<DescribeJobRecordDetailsResponse>;
    /**
     * 查看影子资产
     */
    DescribeSuspiciousAssets(req: DescribeSuspiciousAssetsRequest, cb?: (error: string, rep: DescribeSuspiciousAssetsResponse) => void): Promise<DescribeSuspiciousAssetsResponse>;
    /**
     * 查看Github泄露数据
     */
    DescribeGithubs(req: DescribeGithubsRequest, cb?: (error: string, rep: DescribeGithubsResponse) => void): Promise<DescribeGithubsResponse>;
    /**
     * 查看端口数据
     */
    DescribePorts(req: DescribePortsRequest, cb?: (error: string, rep: DescribePortsResponse) => void): Promise<DescribePortsResponse>;
    /**
     * 启动测绘
     */
    CreateJobRecord(req: CreateJobRecordRequest, cb?: (error: string, rep: CreateJobRecordResponse) => void): Promise<CreateJobRecordResponse>;
    /**
     * 添加网站资产
     */
    CreateHttp(req: CreateHttpRequest, cb?: (error: string, rep: CreateHttpResponse) => void): Promise<CreateHttpResponse>;
    /**
     * 删除APP数据
     */
    DeleteApps(req: DeleteAppsRequest, cb?: (error: string, rep: DeleteAppsResponse) => void): Promise<DeleteAppsResponse>;
    /**
     * 创建种子
     */
    CreateSeeds(req: CreateSeedsRequest, cb?: (error: string, rep: CreateSeedsResponse) => void): Promise<CreateSeedsResponse>;
    /**
     * 删除企业架构数据
     */
    DeleteEnterprises(req: DeleteEnterprisesRequest, cb?: (error: string, rep: DeleteEnterprisesResponse) => void): Promise<DeleteEnterprisesResponse>;
    /**
     * 修改种子状态
     */
    ModifySeedStatus(req: ModifySeedStatusRequest, cb?: (error: string, rep: ModifySeedStatusResponse) => void): Promise<ModifySeedStatusResponse>;
    /**
     * 删除主域名数据
     */
    DeleteDomains(req: DeleteDomainsRequest, cb?: (error: string, rep: DeleteDomainsResponse) => void): Promise<DeleteDomainsResponse>;
    /**
     * 删除主机资产数据
     */
    DeleteAssets(req: DeleteAssetsRequest, cb?: (error: string, rep: DeleteAssetsResponse) => void): Promise<DeleteAssetsResponse>;
    /**
     * 添加APP资产
     */
    CreateApp(req: CreateAppRequest, cb?: (error: string, rep: CreateAppResponse) => void): Promise<CreateAppResponse>;
    /**
     * 查看暗网数据
     */
    DescribeDarkWebs(req: DescribeDarkWebsRequest, cb?: (error: string, rep: DescribeDarkWebsResponse) => void): Promise<DescribeDarkWebsResponse>;
    /**
     * 添加主域名数据
     */
    CreateDomain(req: CreateDomainRequest, cb?: (error: string, rep: CreateDomainResponse) => void): Promise<CreateDomainResponse>;
    /**
     * 获取代码泄露数据
     */
    DescribeLeakageCodes(req: DescribeLeakageCodesRequest, cb?: (error: string, rep: DescribeLeakageCodesResponse) => void): Promise<DescribeLeakageCodesResponse>;
    /**
     * 查看公众号数据
     */
    DescribeWechatOfficialAccounts(req: DescribeWechatOfficialAccountsRequest, cb?: (error: string, rep: DescribeWechatOfficialAccountsResponse) => void): Promise<DescribeWechatOfficialAccountsResponse>;
    /**
     * 查看企业架构数据
     */
    DescribeEnterprises(req: DescribeEnterprisesRequest, cb?: (error: string, rep: DescribeEnterprisesResponse) => void): Promise<DescribeEnterprisesResponse>;
    /**
     * 添加企业架构资产
     */
    CreateEnterprise(req: CreateEnterpriseRequest, cb?: (error: string, rep: CreateEnterpriseResponse) => void): Promise<CreateEnterpriseResponse>;
    /**
     * 创建企业
     */
    CreateCustomer(req: CreateCustomerRequest, cb?: (error: string, rep: CreateCustomerResponse) => void): Promise<CreateCustomerResponse>;
    /**
     * 停止扫描
     */
    StopJobRecord(req: StopJobRecordRequest, cb?: (error: string, rep: StopJobRecordResponse) => void): Promise<StopJobRecordResponse>;
    /**
     * 查看任务运行记录列表
     */
    DescribeJobRecords(req: DescribeJobRecordsRequest, cb?: (error: string, rep: DescribeJobRecordsResponse) => void): Promise<DescribeJobRecordsResponse>;
    /**
     * 查看弱口令数据
     */
    DescribeWeakPasswords(req: DescribeWeakPasswordsRequest, cb?: (error: string, rep: DescribeWeakPasswordsResponse) => void): Promise<DescribeWeakPasswordsResponse>;
    /**
     * 查看微信小程序
     */
    DescribeWechatApplets(req: DescribeWechatAppletsRequest, cb?: (error: string, rep: DescribeWechatAppletsResponse) => void): Promise<DescribeWechatAppletsResponse>;
    /**
     * 删除种子
     */
    DeleteSeeds(req: DeleteSeedsRequest, cb?: (error: string, rep: DeleteSeedsResponse) => void): Promise<DeleteSeedsResponse>;
}
