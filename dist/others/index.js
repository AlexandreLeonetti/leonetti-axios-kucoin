"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOthersRequest = void 0;
const url = {
    getServerTime: '/api/v1/timestamp',
    serviceStatus: '/api/v1/status',
};
const createOthersRequest = (get) => ({
    getServerTime: async () => get(url.getServerTime, {}),
    serviceStatus: async () => get(url.serviceStatus, {}),
});
exports.createOthersRequest = createOthersRequest;
