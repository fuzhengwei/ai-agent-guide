import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("eis.tencentcloudapi.com", "2020-07-15", clientConfig);
    }
    async ListEisConnectorOperations(req, cb) {
        return this.request("ListEisConnectorOperations", req, cb);
    }
    async ListEisConnectors(req, cb) {
        return this.request("ListEisConnectors", req, cb);
    }
    async DescribeEisConnectorConfig(req, cb) {
        return this.request("DescribeEisConnectorConfig", req, cb);
    }
}
