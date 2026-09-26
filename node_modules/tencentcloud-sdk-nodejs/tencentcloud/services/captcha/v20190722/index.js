"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v20190722 = void 0;
const tslib_1 = require("tslib");
const Models = tslib_1.__importStar(require("./captcha_models"));
const captcha_client_1 = require("./captcha_client");
exports.v20190722 = {
    Client: captcha_client_1.Client,
    Models: Models
};
