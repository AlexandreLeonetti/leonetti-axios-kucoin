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
const orders_1 = require("./trade/orders");
const dotenv = __importStar(require("dotenv"));
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
        const bodyToSend = body ? JSON.stringify(body) : '';
        const timestamp = Date.now().toString();
        const signature = (0, helpers_1.sign)(timestamp + method.toUpperCase() + url + bodyToSend, this.secrets.secret);
        const passphrase = (0, helpers_1.sign)(this.secrets.password, this.secrets.secret);
        return {
            headers: {
                'KC-API-KEY': this.secrets.key,
                'KC-API-SIGN': signature,
                'KC-API-TIMESTAMP': timestamp,
                'KC-API-PASSPHRASE': passphrase,
                'KC-API-KEY-VERSION': '2',
            },
        };
    }
    get = (endpoint, params) => {
        const endpointQuery = (0, helpers_1.buildEndpointQuery)(endpoint, params);
        return axios_1.default.get(this.baseUrl + endpointQuery, this.createAuth('GET', endpointQuery));
    };
    post = (endpoint, body) => {
        return axios_1.default.post(this.baseUrl + endpoint, body, this.createAuth('POST', endpoint, body));
    };
    delete = (endpoint, params) => {
        const endpointQuery = (0, helpers_1.buildEndpointQuery)(endpoint, params);
        return axios_1.default.delete(this.baseUrl + endpointQuery, this.createAuth('DELETE', endpointQuery));
    };
    orders = (0, orders_1.createOrderRequest)(this.get, this.post, this.delete);
}
exports.Client = Client;
exports.default = Client;
const k1 = new Client({
    secret: process.env.KUCOIN_SECRET,
    password: process.env.PASS_PHRASE,
    key: process.env.KUCOIN_KEY,
});
async function main() {
    const uuid4 = uuid.v4();
    let marketParams = {
        clientOid: uuid4,
        side: "buy",
        symbol: "TON-USDT",
        type: "market",
        //tradeType : "MARGIN_TRADE",
        size: "1.5",
        //isIsolated: true,
        marginModel: "isolated"
    };
    const trade = await k1.orders.placeMarginOrder(marketParams);
}
main();
/*

import  uuid from "uuid";

async function isolatedBuyBor(symbol:string, quantity:number, apiKey:string, apiSecret:string){
    try{
        const uuid4 = uuid.v4();
        console.log(uuid4);
        
        let marketParams = {
            clientOid : uuid4,
            side      : "buy",
            symbol    : "TON-USDT",
            type      : "market",
            //tradeType : "MARGIN_TRADE",
            size      : "2",
            isIsolated: true,
            marginModel:"isolated"
        };
        
        fetch('https://openapi-v2.kucoin.com/api/v1/margin/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marketParams)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Response from the server
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }catch(error){
             console.log("Error", error)
             throw error;
    }
}
export {
    isolatedBuyBor
}
*/
