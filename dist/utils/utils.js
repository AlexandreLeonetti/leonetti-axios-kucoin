"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryString = exports.formatter = exports.sleep = void 0;
const node_crypto_1 = require("node:crypto"); /* corresponding type @types/node */
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function formatter(s, factor, precision) {
    if (typeof s === "string") {
        let n = factor * parseFloat(s);
        let p = Math.pow(10, precision);
        n = Math.trunc(n * p) / p;
        n = parseFloat(n.toFixed(precision));
        return n;
    }
    else {
        // When s is a number, directly apply the factor and precision
        let n = s * factor;
        let p = Math.pow(10, precision);
        n = Math.trunc(n * p) / p;
        n = parseFloat(n.toFixed(precision));
        return n;
    }
}
exports.formatter = formatter;
function generateQueryString(params, apiSecret) {
    console.log(params);
    let queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    const signature = (0, node_crypto_1.createHmac)('sha256', apiSecret)
        .update(queryString)
        .digest('hex');
    return `${queryString}&signature=${signature}`;
}
exports.generateQueryString = generateQueryString;
