import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { DescribeEcdnStatisticsRequest, DescribeDomainsConfigResponse, DescribeEcdnDomainStatisticsResponse, DescribeEcdnDomainLogsResponse, DescribeDomainsConfigRequest, DescribeDomainsResponse, DescribeEcdnStatisticsResponse, DescribeIpStatusResponse, DescribeEcdnDomainStatisticsRequest, DescribeEcdnDomainLogsRequest, DescribeIpStatusRequest, DescribeDomainsRequest } from "./ecdn_models";
/**
 * ecdn client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * ECDN平台下线，接口开始预下线处理

DescribeIpStatus 用于查询域名所在加速平台的所有节点信息, 如果您的源站有白名单设置,可以通过本接口获取ECDN服务的节点IP进行加白, 本接口为内测接口,请联系腾讯云工程师开白。

由于产品服务节点常有更新，对于源站开白的使用场景，请定期调用接口获取最新节点信息，若新增服务节点发布7日后您尚未更新加白导致回源失败等问题，ECDN侧不对此承担责任。
     */
    DescribeIpStatus(req: DescribeIpStatusRequest, cb?: (error: string, rep: DescribeIpStatusResponse) => void): Promise<DescribeIpStatusResponse>;
    /**
     * ECDN平台下线，接口开始预下线处理

本接口（DescribeEcdnDomainLogs）用于查询域名的访问日志下载地址。
     */
    DescribeEcdnDomainLogs(req: DescribeEcdnDomainLogsRequest, cb?: (error: string, rep: DescribeEcdnDomainLogsResponse) => void): Promise<DescribeEcdnDomainLogsResponse>;
    /**
     * ECDN平台下线，接口开始预下线处理

本接口（DescribeDomainsConfig）用于查询CDN加速域名详细配置信息。

>?  若您的业务已迁移至 CDN 控制台，请参考<a href="https://cloud.tencent.com/document/api/228/41117"> CDN 接口文档</a>，使用  CDN 相关API 进行操作。
     */
    DescribeDomainsConfig(req: DescribeDomainsConfigRequest, cb?: (error: string, rep: DescribeDomainsConfigResponse) => void): Promise<DescribeDomainsConfigResponse>;
    /**
     * ECDN平台下线，接口开始预下线处理

本接口（DescribeDomains）用于查询CDN域名基本信息，包括项目id，状态，业务类型，创建时间，更新时间等。

>?  若您的业务已迁移至 CDN 控制台，请参考<a href="https://cloud.tencent.com/document/api/228/41118"> CDN 接口文档</a>，使用  CDN 相关API 进行操作。
     */
    DescribeDomains(req: DescribeDomainsRequest, cb?: (error: string, rep: DescribeDomainsResponse) => void): Promise<DescribeDomainsResponse>;
    /**
     * ECDN平台下线，接口开始预下线处理

DescribeEcdnStatistics用于查询 ECDN 实时访问监控数据，支持以下指标查询：

+ 流量（单位为 byte）
+ 带宽（单位为 bps）
+ 请求数（单位为 次）
+ 状态码 2xx 汇总及各 2 开头状态码明细（单位为 个）
+ 状态码 3xx 汇总及各 3 开头状态码明细（单位为 个）
+ 状态码 4xx 汇总及各 4 开头状态码明细（单位为 个）
+ 状态码 5xx 汇总及各 5 开头状态码明细（单位为 个）
     */
    DescribeEcdnStatistics(req: DescribeEcdnStatisticsRequest, cb?: (error: string, rep: DescribeEcdnStatisticsResponse) => void): Promise<DescribeEcdnStatisticsResponse>;
    /**
     * ECDN平台下线，接口开始预下线处理

本接口（DescribeEcdnDomainStatistics）用于查询指定时间段内的域名访问统计指标。

>?  若您的业务已迁移至 CDN 控制台，请参考<a href="https://cloud.tencent.com/document/api/228/30986"> CDN 接口文档</a>，使用  CDN 相关API 进行操作。
     */
    DescribeEcdnDomainStatistics(req: DescribeEcdnDomainStatisticsRequest, cb?: (error: string, rep: DescribeEcdnDomainStatisticsResponse) => void): Promise<DescribeEcdnDomainStatisticsResponse>;
}
