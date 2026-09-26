"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20211108 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./dbs_models"));
const dbs_client_1 = require("./dbs_client");
exports.v20211108 = {
    Client: dbs_client_1.Client,
    Models: Models
};
