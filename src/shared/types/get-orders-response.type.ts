import { OrderType } from "./order.type.ts";

export type GetOrdersResponseType = {
	ordersCount: number;
	orders: OrderType[];
}