"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20170312 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./postgres_models"));
const postgres_client_1 = require("./postgres_client");
exports.v20170312 = {
    Client: postgres_client_1.Client,
    Models: Models
};
