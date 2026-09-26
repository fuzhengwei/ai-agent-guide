"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20180301 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./faceid_models"));
const faceid_client_1 = require("./faceid_client");
exports.v20180301 = {
    Client: faceid_client_1.Client,
    Models: Models
};
