"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20180709 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./billing_models"));
const billing_client_1 = require("./billing_client");
exports.v20180709 = {
    Client: billing_client_1.Client,
    Models: Models
};
