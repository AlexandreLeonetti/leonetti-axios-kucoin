"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("./utils/helpers");
const urls_1 = require("./utils/urls");
const uuid = __importStar(require("uuid"));
const stopOrders_1 = require("./trade/stopOrders");
const symbolsTicker_1 = require("./marketData/symbolsTicker");
const utils_1 = require("@leonetti/utils");
const orders_1 = require("./trade/orders");
const dotenv = __importStar(require("dotenv"));
const others_1 = require("./others");
console.log("baseUrl ", urls_1.baseUrl);
dotenv.config();
const key1 = process.env.KUCOIN_KEY;
const secret1 = process.env.KUCOIN_SECRET;
const passphrase1 = process.env.PASS_PHRASE;
class Client {
    secrets;
    baseUrl = urls_1.baseUrl;
    constructor(secrets) {
        this.secrets = secrets;
    }
    createAuth(method, url, body) {
        const bodyToSend = body ? JSON.stringify(body) : "";
        const timestamp = Date.now().toString();
        const signature = (0, helpers_1.sign)(timestamp + method.toUpperCase() + url + bodyToSend, this.secrets.secret);
        const passphrase = (0, helpers_1.sign)(this.secrets.password, this.secrets.secret);
        return {
            headers: {
                "KC-API-KEY": this.secrets.key,
                "KC-API-SIGN": signature,
                "KC-API-TIMESTAMP": timestamp,
                "KC-API-PASSPHRASE": passphrase,
                "KC-API-KEY-VERSION": "2",
            },
        };
    }
    get = (endpoint, params) => {
        const endpointQuery = (0, helpers_1.buildEndpointQuery)(endpoint, params);
        return axios_1.default.get(this.baseUrl + endpointQuery, this.createAuth("GET", endpointQuery));
    };
    post = (endpoint, body) => {
        return axios_1.default.post(this.baseUrl + endpoint, body, this.createAuth("POST", endpoint, body));
    };
    delete = (endpoint, params) => {
        const endpointQuery = (0, helpers_1.buildEndpointQuery)(endpoint, params);
        return axios_1.default.delete(this.baseUrl + endpointQuery, this.createAuth("DELETE", endpointQuery));
    };
    orders = (0, orders_1.createOrderRequest)(this.get, this.post, this.delete);
    other = (0, others_1.createOthersRequest)(this.get);
    stopOrder = (0, stopOrders_1.createStopOrderRequest)(this.get, this.post, this.delete);
    symbolsTicker = (0, symbolsTicker_1.createSymbolsTickerRequest)(this.get);
    async getAvg(mktId) {
        let avg = 0;
        // get data...
        console.log("inside if ");
        /*
         * get order details, and avg buying price */
        const details = await this.orders.getAnOrder(mktId);
        let res = details.data.data;
        console.log("details", res);
        let dealFunds = res.dealFunds;
        let dealSize = res.dealSize;
        dealFunds = Number.parseFloat(dealFunds);
        dealSize = Number.parseFloat(dealSize);
        avg = dealFunds / dealSize;
        return avg;
    }
}
exports.Client = Client;
exports.default = Client;
/* Robot starts here */
//const test = await k1.other.getServerTime();
//const test2 = await k1.other.serviceStatus();
//const { data } = test2;
const k1 = new Client({
    secret: process.env.KUCOIN_SECRET,
    password: process.env.PASS_PHRASE,
    key: process.env.KUCOIN_KEY,
});
async function main() {
    let size = 1.5;
    let str_size = size.toFixed(3);
    let size_stop = (size * 0.995).toFixed(3);
    let stopLoss = 0.005;
    let limitLoss = 0.007;
    const prom_price = await k1.symbolsTicker.getTicker({ symbol: "TON-USDT" });
    const price = prom_price.data.data.price;
    const { data } = await k1.orders.placeMarginOrder({
        clientOid: Date.now().toString(),
        side: "buy",
        symbol: "TON-USDT",
        type: "market",
        size: str_size,
        marginModel: "isolated",
    });
    const avgBuy = await k1.getAvg(data.data.orderId);
    console.log("avgBuy : ", avgBuy);
    // stop loss orders
    let stop_price = (avgBuy * (1 - stopLoss)).toFixed(3);
    let lim_price = (avgBuy * (1 - limitLoss)).toFixed(3);
    await (0, utils_1.sleep)(1000);
    const uuid4b = uuid.v4();
    const sl1 = await k1.stopOrder.placeNewOrder({
        clientOid: uuid4b,
        side: "sell",
        symbol: "TON-USDT",
        stop: "loss",
        stopPrice: stop_price,
        price: lim_price,
        size: size_stop,
        tradeType: "MARGIN_ISOLATED_TRADE",
    });
}
main();
