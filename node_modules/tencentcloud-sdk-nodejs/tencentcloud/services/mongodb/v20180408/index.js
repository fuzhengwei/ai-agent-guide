"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20180408 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./mongodb_models"));
const mongodb_client_1 = require("./mongodb_client");
exports.v20180408 = {
    Client: mongodb_client_1.Client,
    Models: Models
};
