"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20190107 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./cynosdb_models"));
const cynosdb_client_1 = require("./cynosdb_client");
exports.v20190107 = {
    Client: cynosdb_client_1.Client,
    Models: Models
};
