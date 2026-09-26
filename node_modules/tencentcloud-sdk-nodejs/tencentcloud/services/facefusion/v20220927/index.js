"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20220927 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./facefusion_models"));
const facefusion_client_1 = require("./facefusion_client");
exports.v20220927 = {
    Client: facefusion_client_1.Client,
    Models: Models
};
