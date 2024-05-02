import { AxiosResponse } from 'axios';
import { ILimitOrderParameters, IOrder } from './orders';
import { stopOrderUrls as url } from '../utils/urls';

export const createStopOrderRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  placeNewOrder: async (body: IPlaceNewStopOrder & ILimitOrderParameters) =>
    post(url.placeNewOrder, body),
  cancelOrder: async (params: IOrder) => del(`${url.cancelOrder}/${params.orderId}`, {}),
  cancelOrders: async (params: ICancelOrders) => del(url.cancelOrders, params),
  getSingleOrderInfo: async (params: IOrder) =>
    get(`${url.getSingleOrderInfo}/${params.orderId}`, {}),
  listStopOrders: async (params: IListStopOrders) => get(url.listStopOrders, params),
  getSingleOrder: async (params: IGetSingleOrder) => get(url.getSingleOrder, params),
  cancelSingleOrder: async (params: IGetSingleOrder) => del(url.cancelSingleOrder, params),
});

export type IPlaceNewStopOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  stopPrice: string;
  type?: 'limit' | 'market';
  remark?: string;
  stop?: 'loss' | 'entry';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE'| 'MARGIN_ISOLATED_TRADE';
};

export type ICancelOrders = {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  orderIds?: string[];
};

export type IListStopOrders = {
  tradeType: 'TRADE' | 'MARGIN_TRADE'| 'MARGIN_ISOLATED_TRADE';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  orderIds?: string;
  pageSize?: number;
};

export type IGetSingleOrder = {
  clientOid: string;
  symbol?: string;
};