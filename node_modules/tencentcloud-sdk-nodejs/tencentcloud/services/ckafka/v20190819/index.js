"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20190819 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./ckafka_models"));
const ckafka_client_1 = require("./ckafka_client");
exports.v20190819 = {
    Client: ckafka_client_1.Client,
    Models: Models
};
