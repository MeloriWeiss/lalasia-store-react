import { ProductType } from "./product.type.ts";

export type CartItemType = {
	id: string;
	totalPrice: number;
	productCount: number;
	product: ProductType;
}