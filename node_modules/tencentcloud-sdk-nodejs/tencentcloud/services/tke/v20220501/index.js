"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20220501 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./tke_models"));
const tke_client_1 = require("./tke_client");
exports.v20220501 = {
    Client: tke_client_1.Client,
    Models: Models
};
