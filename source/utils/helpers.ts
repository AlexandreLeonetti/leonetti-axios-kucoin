//import { createHmac } from 'crypto';
import querystring from 'querystring';
import {createHmac} from "node:crypto"; /* corresponding type @types/node */ 


export function sign(text: string, secret: string) {
  return createHmac('sha256', secret).update(text).digest('base64');
}

export function isEmptyParams(params?: any) {
  return !params || Object.keys(params).length === 0;
}

export function buildEndpointQuery(endpoint: string, params?: any) {
  return `${endpoint}${isEmptyParams(params) ? '' : '?' + querystring.stringify(params)}`;
}