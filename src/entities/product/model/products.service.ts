import { axiosInstance } from "../../../shared/axios";
import { GetProductsResponse, ProductType, SearchParamsType } from "../../../shared/types";

export const getProducts = async (params: SearchParamsType): Promise<GetProductsResponse> => {
	return axiosInstance.get<GetProductsResponse>('products/getProducts?' +
		Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&"))
		.then(response => response.data);
};

export const getProduct = async (productId: string): Promise<ProductType> => {
	return axiosInstance.get<ProductType>('products/getProduct/' + productId)
		.then(response => response.data);
};