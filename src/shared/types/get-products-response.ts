import { ProductType } from "./product.type.ts";

export type GetProductsResponse = {
	productsCount: number;
	products: ProductType[];
}