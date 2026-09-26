"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20191213 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./fmu_models"));
const fmu_client_1 = require("./fmu_client");
exports.v20191213 = {
    Client: fmu_client_1.Client,
    Models: Models
};
