"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20190318 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./memcached_models"));
const memcached_client_1 = require("./memcached_client");
exports.v20190318 = {
    Client: memcached_client_1.Client,
    Models: Models
};
