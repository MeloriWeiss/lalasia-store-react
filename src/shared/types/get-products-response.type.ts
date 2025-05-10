import { ProductType } from "./product.type.ts";

export type GetProductsResponseType = {
	productsCount: number;
	products: ProductType[];
}