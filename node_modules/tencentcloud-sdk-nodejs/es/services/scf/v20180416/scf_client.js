import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("scf.tencentcloudapi.com", "2018-04-16", clientConfig);
    }
    async UpdateAlias(req, cb) {
        return this.request("UpdateAlias", req, cb);
    }
    async UpdateNamespace(req, cb) {
        return this.request("UpdateNamespace", req, cb);
    }
    async InvokeFunction(req, cb) {
        return this.request("InvokeFunction", req, cb);
    }
    async DeleteFunction(req, cb) {
        return this.request("DeleteFunction", req, cb);
    }
    async TerminateAsyncEvent(req, cb) {
        return this.request("TerminateAsyncEvent", req, cb);
    }
    async ListTriggers(req, cb) {
        return this.request("ListTriggers", req, cb);
    }
    async ListVersionByFunction(req, cb) {
        return this.request("ListVersionByFunction", req, cb);
    }
    async GetLayerVersion(req, cb) {
        return this.request("GetLayerVersion", req, cb);
    }
    async CreateTrigger(req, cb) {
        return this.request("CreateTrigger", req, cb);
    }
    async CreateNamespace(req, cb) {
        return this.request("CreateNamespace", req, cb);
    }
    async CopyFunction(req, cb) {
        return this.request("CopyFunction", req, cb);
    }
    async DeleteTrigger(req, cb) {
        return this.request("DeleteTrigger", req, cb);
    }
    async ListAliases(req, cb) {
        return this.request("ListAliases", req, cb);
    }
    async DeleteNamespace(req, cb) {
        return this.request("DeleteNamespace", req, cb);
    }
    async GetProvisionedConcurrencyConfig(req, cb) {
        return this.request("GetProvisionedConcurrencyConfig", req, cb);
    }
    async PublishLayerVersion(req, cb) {
        return this.request("PublishLayerVersion", req, cb);
    }
    async ListCustomDomains(req, cb) {
        return this.request("ListCustomDomains", req, cb);
    }
    async DeleteProvisionedConcurrencyConfig(req, cb) {
        return this.request("DeleteProvisionedConcurrencyConfig", req, cb);
    }
    async PublishVersion(req, cb) {
        return this.request("PublishVersion", req, cb);
    }
    async DeleteLayerVersion(req, cb) {
        return this.request("DeleteLayerVersion", req, cb);
    }
    async GetFunction(req, cb) {
        return this.request("GetFunction", req, cb);
    }
    async DeleteAlias(req, cb) {
        return this.request("DeleteAlias", req, cb);
    }
    async GetAsyncEventStatus(req, cb) {
        return this.request("GetAsyncEventStatus", req, cb);
    }
    async PutTotalConcurrencyConfig(req, cb) {
        return this.request("PutTotalConcurrencyConfig", req, cb);
    }
    async UpdateTriggerStatus(req, cb) {
        return this.request("UpdateTriggerStatus", req, cb);
    }
    async DeleteFunctionVersion(req, cb) {
        return this.request("DeleteFunctionVersion", req, cb);
    }
    async GetFunctionLogs(req, cb) {
        return this.request("GetFunctionLogs", req, cb);
    }
    async CreateAlias(req, cb) {
        return this.request("CreateAlias", req, cb);
    }
    async PutProvisionedConcurrencyConfig(req, cb) {
        return this.request("PutProvisionedConcurrencyConfig", req, cb);
    }
    async DeleteCustomDomain(req, cb) {
        return this.request("DeleteCustomDomain", req, cb);
    }
    async UpdateFunctionEventInvokeConfig(req, cb) {
        return this.request("UpdateFunctionEventInvokeConfig", req, cb);
    }
    async GetFunctionEventInvokeConfig(req, cb) {
        return this.request("GetFunctionEventInvokeConfig", req, cb);
    }
    async ListLayers(req, cb) {
        return this.request("ListLayers", req, cb);
    }
    async ListAsyncEvents(req, cb) {
        return this.request("ListAsyncEvents", req, cb);
    }
    async ListLayerVersions(req, cb) {
        return this.request("ListLayerVersions", req, cb);
    }
    async UpdateTrigger(req, cb) {
        return this.request("UpdateTrigger", req, cb);
    }
    async CreateCustomDomain(req, cb) {
        return this.request("CreateCustomDomain", req, cb);
    }
    async ListFunctions(req, cb) {
        return this.request("ListFunctions", req, cb);
    }
    async UpdateFunctionConfiguration(req, cb) {
        return this.request("UpdateFunctionConfiguration", req, cb);
    }
    async PutReservedConcurrencyConfig(req, cb) {
        return this.request("PutReservedConcurrencyConfig", req, cb);
    }
    async GetAccount(req, cb) {
        return this.request("GetAccount", req, cb);
    }
    async DeleteReservedConcurrencyConfig(req, cb) {
        return this.request("DeleteReservedConcurrencyConfig", req, cb);
    }
    async Invoke(req, cb) {
        return this.request("Invoke", req, cb);
    }
    async GetFunctionAddress(req, cb) {
        return this.request("GetFunctionAddress", req, cb);
    }
    async GetAlias(req, cb) {
        return this.request("GetAlias", req, cb);
    }
    async GetReservedConcurrencyConfig(req, cb) {
        return this.request("GetReservedConcurrencyConfig", req, cb);
    }
    async GetCustomDomain(req, cb) {
        return this.request("GetCustomDomain", req, cb);
    }
    async UpdateCustomDomain(req, cb) {
        return this.request("UpdateCustomDomain", req, cb);
    }
    async CreateFunction(req, cb) {
        return this.request("CreateFunction", req, cb);
    }
    async ListNamespaces(req, cb) {
        return this.request("ListNamespaces", req, cb);
    }
    async UpdateFunctionCode(req, cb) {
        return this.request("UpdateFunctionCode", req, cb);
    }
    async GetRequestStatus(req, cb) {
        return this.request("GetRequestStatus", req, cb);
    }
}
