import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import { getProduct } from "./products.service.ts";
import { getCart } from "../../cart/model/cart.service.ts";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store.ts";

export const useGetProductsAndCart = () => {
	const { id } = useParams();
	const authorized = useSelector((state: RootState) => state.auth.authorized);

	const { data: productData, error: productError, isLoading: isProductLoading } = useQuery({
		queryKey: configCacheKeys.products.product(id || "product-id"),
		queryFn: () => getProduct(id || ""),
		staleTime: 0,
		gcTime: 0
	});

	const { data: cartData, error: cartError } = useQuery({
		queryKey: configCacheKeys.cart.cart,
		queryFn: getCart,
		enabled: authorized
	});

	useEffect(() => {
		if (productError) {
			toast.error(productError.response?.data.message);
		}
		if (cartError) {
			toast.error(cartError.response?.data.message);
		}
	}, [productError, cartError]);

	const productInCart = cartData?.cartItems!.find(item => item.product.id === id);

	return {
		productData,
		productInCart,
		authorized,
		isProductLoading
	}
}