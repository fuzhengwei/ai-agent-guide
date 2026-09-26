"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const https_proxy_agent_1 = tslib_1.__importDefault(require("https-proxy-agent"));
function default_1(url, options) {
    const instanceOptions = options || {};
    const proxy = options.proxy || process.env.http_proxy;
    if (!options.agent && proxy) {
        instanceOptions.agent = new https_proxy_agent_1.default(proxy);
    }
    return (0, node_fetch_1.default)(url, instanceOptions);
}
