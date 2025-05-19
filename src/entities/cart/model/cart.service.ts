import { axiosInstance } from "../../../shared/axios";
import { CartType, DefaultResponseType } from "../../../shared/types";

export const getCart = async (): Promise<CartType> => {
	return axiosInstance.get<CartType>("cart/getCart")
		.then(response => response.data);
};

export const addToCart = async (productId: string, productCount: number): Promise<DefaultResponseType> => {
	return axiosInstance.post<DefaultResponseType>("cart/addProduct", { productId, productCount })
		.then(response => response.data);
};

export const removeFromCart = async (cartItemId: string): Promise<void> => {
	return axiosInstance.delete<void>("cart/removeProduct/" + cartItemId)
		.then(response => response.data);
};

export const updateProductCount = async (cartItemId: string, productCount: number): Promise<DefaultResponseType> => {
	return axiosInstance.patch<DefaultResponseType>("cart/updateProduct", {
		cartItemId,
		productCount
	}).then(response => response.data);
};