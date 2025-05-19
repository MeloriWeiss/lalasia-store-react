import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys, configRoutes } from "../../shared/config";
import { addToCart } from "../../entities/cart/model/cart.service.ts";
import toast from "react-hot-toast";
import React from "react";

export const useAddToCart = (productId: string, productInCart: boolean, requestEnabled: boolean, countToAdd: number) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.cart.addToCart,
		mutationFn: () => addToCart(productId, countToAdd),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: configCacheKeys.cart.cart }).then();
			toast.success(response.message);
		},
		onError: (error) => {
			toast.error(error.response?.data.message);
		}
	});

	const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (!productInCart && requestEnabled) {
			mutation.mutate();
		} else {
			navigate(configRoutes.cart.mask);
		}
	};

	return onAddToCart;
}