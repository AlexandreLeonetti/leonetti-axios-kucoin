"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lendingMarketUrls = exports.marginTradingUrls = exports.isolatedMarginUrls = exports.borrowLendUrls = exports.marginInfoUrls = exports.currenciesUrls = exports.historiesUrls = exports.orderBookUrls = exports.symbolTickersUrls = exports.stopOrderUrls = exports.fillsUrls = exports.ordersUrl = exports.tradeFeeUrls = exports.withdrawalUrls = exports.depositUrls = exports.accountUrls = exports.UserUrls = exports.baseUrl = void 0;
//export const baseUrl = 'https://api.kucoin.com';
exports.baseUrl = 'https://openapi-v2.kucoin.com';
exports.UserUrls = {
    getSubAccounts: '/api/v2/sub/user',
};
exports.accountUrls = {
    listAccounts: '/api/v1/accounts',
    getAnAccount: '/api/v1/accounts',
    getAccountLedgers: '/api/v1/accounts/ledgers',
    getAccountSummaryInfo: '/api/v2/user-info',
    createSubAccount: '/api/v2/sub/user/created',
    getSubAccountSpotList: '/api/v1/sub/api-key',
    createSpotForSubAccount: '/api/v1/sub/api-key',
    modifySubAccountSpot: '/api/v1/sub/api-key/update',
    getAccountBalanceSubAccount: '/api/v1/sub-accounts',
    getPaginatedSubAccountInfo: '/api/v2/sub-accounts',
    getTheTransferable: '/api/v1/accounts/transferable',
    transferBetweenMasterAndSub: '/api/v2/accounts/sub-transfer',
    innerTransfer: '/api/v2/accounts/inner-transfer',
};
exports.depositUrls = {
    createDepositAddress: '/api/v1/deposit-addresses',
    getDepositAddresses: '/api/v2/deposit-addresses',
    getDepositList: '/api/v1/deposits',
    getHistoricalDepositsList: '/api/v1/hist-deposits',
};
exports.withdrawalUrls = {
    getWithdrawalsList: '/api/v1/withdrawals',
    getHistoricalWithdrawalsList: '/api/v1/hist-withdrawals',
    getWithdrawalQuotas: '/api/v1/withdrawals/quotas',
    applyWithdraw: '/api/v1/withdrawals',
    cancelWithdraw: '/api/v1/withdrawals',
};
exports.tradeFeeUrls = {
    basicUserFee: '/api/v1/base-fee',
    actualFeeRateOfTradingPair: '/api/v1/trade-fees',
};
exports.ordersUrl = {
    placeNewOrder: '/api/v1/orders',
    placeMarginOrder: '/api/v1/margin/order',
    placeBulkOrders: '/api/v1/orders/multi',
    cancelOrder: '/api/v1/orders',
    cancelSingleOrder: '/api/v1/order/client-order',
    cancelAllOrder: '/api/v1/orders',
    listOrders: '/api/v1/orders',
    recentOrders: '/api/v1/limit/orders',
    getAnOrder: '/api/v1/orders',
    getSingleActiveOrder: '/api/v1/order/client-order',
};
exports.fillsUrls = {
    listFills: '/api/v1/fills',
    recentFills: '/api/v1/limit/fills',
};
exports.stopOrderUrls = {
    placeNewOrder: '/api/v1/stop-order',
    cancelOrder: '/api/v1/stop-order',
    cancelOrders: '/api/v1/stop-order/cancel',
    getSingleOrderInfo: '/api/v1/stop-order',
    listStopOrders: '/api/v1/stop-order',
    getSingleOrder: '/api/v1/stop-order/queryOrderByClientOid',
    cancelSingleOrder: '/api/v1/stop-order/cancelOrderByClientOid',
};
exports.symbolTickersUrls = {
    getSymbolsList: '/api/v2/symbols',
    getTicker: '/api/v1/market/orderbook/level1',
    getAllTickers: '/api/v1/market/allTickers',
    get24hrStats: '/api/v1/market/stats',
    getMarketList: '/api/v1/markets',
};
exports.orderBookUrls = {
    getPartOrderBook: '/api/v1/market/orderbook/level2',
    getFullOrderBook: '/api/v3/market/orderbook/level2',
};
exports.historiesUrls = {
    getTradeHistories: '/api/v1/market/histories',
    getKlines: '/api/v1/market/candles',
};
exports.currenciesUrls = {
    getCurrencies: '/api/v1/currencies',
    getCurrencyDetail: '/api/v2/currencies',
    getFiatPrice: '/api/v1/prices',
};
exports.marginInfoUrls = {
    getMarkPrice: '/api/v1/mark-price',
    getMarginConfigurationInfo: '/api/v1/margin/config',
    getMarginAccount: '/api/v1/margin/account',
    queryCrossIsolatedMarginLimit: '/api/v1/risk/limit/strategy',
};
exports.borrowLendUrls = {
    postBorrowOrder: '/api/v1/margin/borrow',
    getBorrowOrder: '/api/v1/margin/borrow',
    getRepayRecord: '/api/v1/margin/borrow/outstanding',
    getRepaymentRecord: '/api/v1/margin/borrow/repaid',
    oneClickRepayment: '/api/v1/margin/repay/all',
    repaySingleOrder: '/api/v1/margin/repay/single',
    postLendOrder: '/api/v1/margin/lend',
    cancelLendOrder: '/api/v1/margin/lend',
    setAutoLend: '/api/v1/margin/toggle-auto-lend',
    getActiveOrder: '/api/v1/margin/lend/active',
    getLentHistory: '/api/v1/margin/lend/done',
    getActiveLendOrderList: '/api/v1/margin/lend/trade/unsettled',
    getSettledLendOrderHistory: '/api/v1/margin/lend/trade/settled',
    getAccountLendRecord: '/api/v1/margin/lend/assets',
    lendingMarketData: '/api/v1/margin/market',
    marginTradeData: '/api/v1/margin/trade/last',
};
exports.isolatedMarginUrls = {
    queryIsolatedMarginTradingPairConfig: '/api/v1/isolated/symbols',
    queryIsolatedMarginAccountInfo: '/api/v1/isolated/accounts',
    querySingleIsolatedMarginAccountInfo: '/api/v1/isolated/account',
    isolatedMarginBorrowing: '/api/v1/isolated/borrow',
    queryOutstandingRepaymentRecords: '/api/v1/isolated/borrow/outstanding',
    queryRepaymentRecords: '/api/v1/isolated/borrow/repaid',
    quickRepayment: '/api/v1/isolated/repay/all',
    singleRepayment: '/api/v1/isolated/repay/single',
};
exports.marginTradingUrls = {
    marginBorrowing: '/api/v3/margin/borrow',
    repayment: '/api/v3/margin/repay',
    getMarginBorrowingHistory: '/api/v3/margin/borrow',
    getRepaymentHistory: '/api/v3/margin/repay',
};
exports.lendingMarketUrls = {
    getCurrencyInformation: '/api/v3/project/list',
    getInterestRates: '/api/v3/project/marketInterestRate',
    subscription: '/api/v3/purchase',
    redemption: '/api/v3/redeem',
    modifySubscriptionOrders: '/api/v3/lend/purchase/update',
    getRedemptionOrders: '/api/v3/redeem/orders',
    getSubscriptionOrders: '/api/v3/purchase/orders',
};
