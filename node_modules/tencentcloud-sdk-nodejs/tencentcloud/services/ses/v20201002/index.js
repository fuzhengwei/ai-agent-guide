"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20201002 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./ses_models"));
const ses_client_1 = require("./ses_client");
exports.v20201002 = {
    Client: ses_client_1.Client,
    Models: Models
};
