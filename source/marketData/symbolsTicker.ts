import { AxiosResponse } from 'axios';
import { symbolTickersUrls as url } from '../utils/urls';

export const createSymbolsTickerRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getSymbolsList: async (params: IGetSymbolsList) => get(url.getSymbolsList, params),
  getTicker: async (params: ISymbol) => get(url.getTicker, params),
  getAllTickers: async () => get(url.getAllTickers, {}),
  get24hrStats: async (params: ISymbol) => get(url.get24hrStats, params),
  getMarketList: async () => get(url.getMarketList, {}),
});

export type IGetSymbolsList = {
  market?: string;
};

export type ISymbol = {
  symbol: string;
};