"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20180328 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./sqlserver_models"));
const sqlserver_client_1 = require("./sqlserver_client");
exports.v20180328 = {
    Client: sqlserver_client_1.Client,
    Models: Models
};
