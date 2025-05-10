import { axiosInstance } from "../../../shared/axios";
import { GetOrdersResponseType } from "../../../shared/types";
import { DefaultResponseType } from "../../../shared/types";
import { CheckoutFormType } from "../../../widgets/forms/checkout-form";

export const getOrders = async (page: number): Promise<GetOrdersResponseType> => {
	return axiosInstance.get<GetOrdersResponseType>("orders/getOrders?page=" + String(page))
		.then(response => response.data);
};

export const createOrder = async (data: CheckoutFormType): Promise<DefaultResponseType> => {
	return axiosInstance.post<DefaultResponseType>("orders/createOrder", data)
		.then(response => response.data);
};