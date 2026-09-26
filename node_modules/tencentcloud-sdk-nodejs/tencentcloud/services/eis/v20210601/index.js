"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20210601 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./eis_models"));
const eis_client_1 = require("./eis_client");
exports.v20210601 = {
    Client: eis_client_1.Client,
    Models: Models
};
