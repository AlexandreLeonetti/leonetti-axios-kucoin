
import axios from 'axios';
import { AuthHeader } from './types/auth';
import { buildEndpointQuery, sign } from './utils/helpers';
import { baseUrl } from './utils/urls';
import * as uuid from "uuid";


import { ILimitOrderParameters, IPlaceMarginOrder, createOrderRequest } from './trade/orders';
import * as dotenv from "dotenv";

dotenv.config();
const key1 = process.env.KUCOIN_KEY;
const secret1 = process.env.KUCOIN_SECRET;
const passphrase1 = process.env.PASS_PHRASE;
export class Client {
  private baseUrl = baseUrl;

  constructor(private secrets: ICreateClient) {}

  private createAuth(method: string, url: string, body?: object): AuthHeader {
    const bodyToSend = body ? JSON.stringify(body) : '';
    const timestamp = Date.now().toString();
    const signature = sign(
      timestamp + method.toUpperCase() + url + bodyToSend,
      this.secrets.secret,
    );
    const passphrase = sign(this.secrets.password, this.secrets.secret);
    return {
      headers: {
        'KC-API-KEY': this.secrets.key,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp,
        'KC-API-PASSPHRASE': passphrase,
        'KC-API-KEY-VERSION': '2',
      },
    };
  }

  private get = (endpoint: string, params?: any) => {
    const endpointQuery = buildEndpointQuery(endpoint, params);
    return axios.get(this.baseUrl + endpointQuery, this.createAuth('GET', endpointQuery));
  };

  private post = (endpoint: string, body: any) => {
    return axios.post(this.baseUrl + endpoint, body, this.createAuth('POST', endpoint, body));
  };

  private delete = (endpoint: string, params?: any) => {
    const endpointQuery = buildEndpointQuery(endpoint, params);
    return axios.delete(this.baseUrl + endpointQuery, this.createAuth('DELETE', endpointQuery));
  };

  public orders = createOrderRequest(this.get, this.post, this.delete);

}

export type ICreateClient = {
  secret: string;
  password: string;
  key: string;
};

export default Client;
const k1 = new Client({
  secret: process.env.KUCOIN_SECRET as string,
  password: process.env.PASS_PHRASE as string,
  key: process.env.KUCOIN_KEY as string,
});

async function main(){
  const uuid4 = uuid.v4();
  
  let marketParams : IPlaceMarginOrder & ILimitOrderParameters = {
      clientOid : uuid4,
      side      : "buy",
      symbol    : "TON-USDT",
      type      : "market",
      //tradeType : "MARGIN_TRADE",
      size      : "1.5",
      //isIsolated: true,
      marginModel:"isolated"
  };
const trade = await k1.orders.placeMarginOrder(marketParams);
}

main();
/*

import  uuid from "uuid";

async function isolatedBuyBor(symbol:string, quantity:number, apiKey:string, apiSecret:string){
    try{
        const uuid4 = uuid.v4();
        console.log(uuid4);
        
        let marketParams = {
            clientOid : uuid4,
            side      : "buy",
            symbol    : "TON-USDT",
            type      : "market",
            //tradeType : "MARGIN_TRADE",
            size      : "2",
            isIsolated: true,
            marginModel:"isolated"
        };
        
        fetch('https://openapi-v2.kucoin.com/api/v1/margin/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marketParams)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Response from the server
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }catch(error){
             console.log("Error", error)
             throw error;
    }
}
export {
    isolatedBuyBor
}
*/

