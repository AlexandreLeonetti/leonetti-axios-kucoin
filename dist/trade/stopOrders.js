"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStopOrderRequest = void 0;
const urls_1 = require("../utils/urls");
const createStopOrderRequest = (get, post, del) => ({
    placeNewOrder: async (body) => post(urls_1.stopOrderUrls.placeNewOrder, body),
    cancelOrder: async (params) => del(`${urls_1.stopOrderUrls.cancelOrder}/${params.orderId}`, {}),
    cancelOrders: async (params) => del(urls_1.stopOrderUrls.cancelOrders, params),
    getSingleOrderInfo: async (params) => get(`${urls_1.stopOrderUrls.getSingleOrderInfo}/${params.orderId}`, {}),
    listStopOrders: async (params) => get(urls_1.stopOrderUrls.listStopOrders, params),
    getSingleOrder: async (params) => get(urls_1.stopOrderUrls.getSingleOrder, params),
    cancelSingleOrder: async (params) => del(urls_1.stopOrderUrls.cancelSingleOrder, params),
});
exports.createStopOrderRequest = createStopOrderRequest;
