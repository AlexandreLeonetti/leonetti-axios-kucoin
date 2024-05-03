"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEndpointQuery = exports.isEmptyParams = exports.sign = void 0;
//import { createHmac } from 'crypto';
const querystring_1 = __importDefault(require("querystring"));
const node_crypto_1 = require("node:crypto"); /* corresponding type @types/node */
function sign(text, secret) {
    return (0, node_crypto_1.createHmac)('sha256', secret).update(text).digest('base64');
}
exports.sign = sign;
function isEmptyParams(params) {
    return !params || Object.keys(params).length === 0;
}
exports.isEmptyParams = isEmptyParams;
function buildEndpointQuery(endpoint, params) {
    return `${endpoint}${isEmptyParams(params) ? '' : '?' + querystring_1.default.stringify(params)}`;
}
exports.buildEndpointQuery = buildEndpointQuery;
