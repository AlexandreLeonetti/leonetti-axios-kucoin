import { AxiosResponse } from 'axios';
import { ordersUrl as url } from '../utils/urls';

export const createOrderRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  placeNewOrder: async (body: IPlaceNewOrder & ILimitOrderParameters) =>
    post(url.placeNewOrder, body),
  placeMarginOrder: async (body: IPlaceMarginOrder & ILimitOrderParameters) =>
    post(url.placeMarginOrder, body),
  placeBulkOrders: async (body: IPlaceBulkOrders) => post(url.placeBulkOrders, body),
  cancelOrder: async (params: IOrder) => del(`${url.cancelOrder}/${params.orderId}`, {}),
  cancelSingleOrder: async (params: ISingleOrder) =>
    del(`${url.cancelSingleOrder}/${params.clientOid}`, {}),
  cancelAllOrder: async (params: ICancelAllOrder) => del(url.cancelAllOrder, params),
  listOrders: async (params: IListOrders) => get(url.listOrders, params),
  recentOrders: async () => get(url.recentOrders, {}),
  getAnOrder: async (params: string) => get(`${url.getAnOrder}/${params}`, {}),
  getSingleActiveOrder: async (params: ISingleOrder) =>
    get(`${url.getSingleActiveOrder}/${params.clientOid}`, {}),
});

export type IPlaceNewOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  limitOrderParams?: ILimitOrderParameters;
};

export type IPlaceMarginOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  marginModel?: 'cross' | 'isolated';
  autoBorrow?: boolean;
};

export type ILimitOrderParameters = {
  size: string;
  price?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
};

export type IPlaceBulkOrders = {
  orderList: IPlaceBulkOrder[];
};

export type IPlaceBulkOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit';
  remark?: string;
  stop?: 'loss' | 'entry';
  stopPrice?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE';
  price: string;
  size: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
};

export type IOrder = {
  orderId: string;
};
export type ISingleOrder = {
  clientOid: string;
};

export type ICancelAllOrder = {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
};

export type IListOrders = {
  tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
};