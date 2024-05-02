"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderRequest = void 0;
const urls_1 = require("../utils/urls");
const createOrderRequest = (get, post, del) => ({
    placeNewOrder: async (body) => post(urls_1.ordersUrl.placeNewOrder, body),
    placeMarginOrder: async (body) => post(urls_1.ordersUrl.placeMarginOrder, body),
    placeBulkOrders: async (body) => post(urls_1.ordersUrl.placeBulkOrders, body),
    cancelOrder: async (params) => del(`${urls_1.ordersUrl.cancelOrder}/${params.orderId}`, {}),
    cancelSingleOrder: async (params) => del(`${urls_1.ordersUrl.cancelSingleOrder}/${params.clientOid}`, {}),
    cancelAllOrder: async (params) => del(urls_1.ordersUrl.cancelAllOrder, params),
    listOrders: async (params) => get(urls_1.ordersUrl.listOrders, params),
    recentOrders: async () => get(urls_1.ordersUrl.recentOrders, {}),
    getAnOrder: async (params) => get(`${urls_1.ordersUrl.getAnOrder}/${params}`, {}),
    getSingleActiveOrder: async (params) => get(`${urls_1.ordersUrl.getSingleActiveOrder}/${params.clientOid}`, {}),
});
exports.createOrderRequest = createOrderRequest;
