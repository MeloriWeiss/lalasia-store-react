import { axiosInstance } from "../../../shared/axios";
import { GetProductsResponseType, ProductType, SearchParamsType } from "../../../shared/types";

export const getProducts = async (params: SearchParamsType): Promise<GetProductsResponseType> => {
	return axiosInstance.get<GetProductsResponseType>('products/getProducts?' +
		Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&"))
		.then(response => response.data);
};

export const getProduct = async (productId: string): Promise<ProductType> => {
	return axiosInstance.get<ProductType>('products/getProduct/' + productId)
		.then(response => response.data);
};