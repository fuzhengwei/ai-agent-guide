"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20180412 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./redis_models"));
const redis_client_1 = require("./redis_client");
exports.v20180412 = {
    Client: redis_client_1.Client,
    Models: Models
};
