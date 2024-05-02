import axios from "axios";
import { AuthHeader } from "./types/auth";
import { buildEndpointQuery, sign } from "./utils/helpers";
import { baseUrl } from "./utils/urls";
import * as uuid from "uuid";
import { createStopOrderRequest } from "./trade/stopOrders";
import { sleep } from "@leonetti/utils";
import {
	ILimitOrderParameters,
	IPlaceMarginOrder,
	createOrderRequest,
} from "./trade/orders";
import * as dotenv from "dotenv";
import { createOthersRequest } from "./others";
console.log("baseUrl ", baseUrl);
dotenv.config();
const key1 = process.env.KUCOIN_KEY;
const secret1 = process.env.KUCOIN_SECRET;
const passphrase1 = process.env.PASS_PHRASE;

export class Client {
	private baseUrl = baseUrl;
	constructor(private secrets: ICreateClient) {}

	private createAuth(method: string, url: string, body?: object): AuthHeader {
		const bodyToSend = body ? JSON.stringify(body) : "";
		const timestamp = Date.now().toString();
		const signature = sign(
			timestamp + method.toUpperCase() + url + bodyToSend,
			this.secrets.secret
		);
		const passphrase = sign(this.secrets.password, this.secrets.secret);
		return {
			headers: {
				"KC-API-KEY": this.secrets.key,
				"KC-API-SIGN": signature,
				"KC-API-TIMESTAMP": timestamp,
				"KC-API-PASSPHRASE": passphrase,
				"KC-API-KEY-VERSION": "2",
			},
		};
	}

	private get = (endpoint: string, params?: any) => {
		const endpointQuery = buildEndpointQuery(endpoint, params);
		return axios.get(
			this.baseUrl + endpointQuery,
			this.createAuth("GET", endpointQuery)
		);
	};

	private post = (endpoint: string, body: any) => {
		return axios.post(
			this.baseUrl + endpoint,
			body,
			this.createAuth("POST", endpoint, body)
		);
	};

	private delete = (endpoint: string, params?: any) => {
		const endpointQuery = buildEndpointQuery(endpoint, params);
		return axios.delete(
			this.baseUrl + endpointQuery,
			this.createAuth("DELETE", endpointQuery)
		);
	};

	public orders = createOrderRequest(this.get, this.post, this.delete);
	public other = createOthersRequest(this.get);
	public stopOrder = createStopOrderRequest(this.get, this.post, this.delete);

  public async getAvg(mktId: string) {
    let avg = 0;
    // get data...
    console.log("inside if ");
    /*
     * get order details, and avg buying price */
    const details = await this.orders.getAnOrder(mktId);
    let res = details.data.data;
    console.log("details", res);
  
    let dealFunds = res.dealFunds;
    let dealSize = res.dealSize;
    dealFunds = Number.parseFloat(dealFunds);
    dealSize = Number.parseFloat(dealSize);
    avg = dealFunds / dealSize;
  
    return avg;
  }

}

export type ICreateClient = {
	secret: string;
	password: string;
	key: string;
};

/* Robot starts here */
//const test = await k1.other.getServerTime();
//const test2 = await k1.other.serviceStatus();
//const { data } = test2;

export default Client;
const k1 = new Client({
	secret: process.env.KUCOIN_SECRET as string,
	password: process.env.PASS_PHRASE as string,
	key: process.env.KUCOIN_KEY as string,
});



async function main() {
	let size = 1.5;
	let str_size = size.toFixed(3);
	let size_stop = (size * 0.995).toFixed(3);

	let stopLoss = 0.005;
	let limitLoss = 0.007;

	const { data } = await k1.orders.placeMarginOrder({
		clientOid: Date.now().toString(),
		side: "buy",
		symbol: "TON-USDT",
		type: "market",
		size: str_size,
		marginModel: "isolated",
	});

	const avgBuy = await k1.getAvg(data.data.orderId);
	console.log("avgBuy : ", avgBuy);

	/* implement stop loss orders 
 and clean other useless apis */

	let stop_price = (avgBuy * (1 - stopLoss)).toFixed(3);
	let lim_price = (avgBuy * (1 - limitLoss)).toFixed(3);

	await sleep(1000);

	const uuid4b = uuid.v4();
	const sl1 = await k1.stopOrder.placeNewOrder({
		clientOid: uuid4b,
		side: "sell",
		symbol: "TON-USDT",
		stop: "loss",
		stopPrice: stop_price,
		price: lim_price,
		size: size_stop,
		tradeType: "MARGIN_ISOLATED_TRADE",
	});
}

main();
