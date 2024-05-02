import { AxiosResponse } from 'axios';

const url = {
  getServerTime: '/api/v1/timestamp',
  serviceStatus: '/api/v1/status',
};
export const createOthersRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getServerTime: async () => get(url.getServerTime, {}),
  serviceStatus: async () => get(url.serviceStatus, {}),
});