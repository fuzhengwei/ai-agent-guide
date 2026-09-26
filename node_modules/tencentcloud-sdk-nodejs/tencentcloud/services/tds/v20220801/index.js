"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20220801 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./tds_models"));
const tds_client_1 = require("./tds_client");
exports.v20220801 = {
    Client: tds_client_1.Client,
    Models: Models
};
