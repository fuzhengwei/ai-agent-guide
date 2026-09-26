"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20190923 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./ssm_models"));
const ssm_client_1 = require("./ssm_client");
exports.v20190923 = {
    Client: ssm_client_1.Client,
    Models: Models
};
