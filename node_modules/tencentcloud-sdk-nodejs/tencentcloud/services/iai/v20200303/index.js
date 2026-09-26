"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20200303 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./iai_models"));
const iai_client_1 = require("./iai_client");
exports.v20200303 = {
    Client: iai_client_1.Client,
    Models: Models
};
