import { CartItemType } from "./cart-item.type.ts";

export type CartType = {
	id: string;
	totalPrice: number;
	cartItems: CartItemType[];
	userId: string;
}