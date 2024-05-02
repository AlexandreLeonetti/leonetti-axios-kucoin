"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSymbolsTickerRequest = void 0;
const urls_1 = require("../utils/urls");
const createSymbolsTickerRequest = (get) => ({
    getSymbolsList: async (params) => get(urls_1.symbolTickersUrls.getSymbolsList, params),
    getTicker: async (params) => get(urls_1.symbolTickersUrls.getTicker, params),
    getAllTickers: async () => get(urls_1.symbolTickersUrls.getAllTickers, {}),
    get24hrStats: async (params) => get(urls_1.symbolTickersUrls.get24hrStats, params),
    getMarketList: async () => get(urls_1.symbolTickersUrls.getMarketList, {}),
});
exports.createSymbolsTickerRequest = createSymbolsTickerRequest;
