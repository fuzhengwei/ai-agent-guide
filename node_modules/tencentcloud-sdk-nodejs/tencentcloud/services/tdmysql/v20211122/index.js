"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20211122 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./tdmysql_models"));
const tdmysql_client_1 = require("./tdmysql_client");
exports.v20211122 = {
    Client: tdmysql_client_1.Client,
    Models: Models
};
