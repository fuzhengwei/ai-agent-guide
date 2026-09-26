"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20170312 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./vpc_models"));
const vpc_client_1 = require("./vpc_client");
exports.v20170312 = {
    Client: vpc_client_1.Client,
    Models: Models
};
