import React, { PropsWithChildren } from "react";
import { Button } from "../../shared/components";
import { cn } from "../../shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys, configRoutes } from "../../shared/config";
import { addToCart } from "../../entities/cart/model/cart.service.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Props {
	productId: string;
	productInCart: boolean;
	className?: string;
}

export const AddToCartButton: React.FC<Props> = (
	{
		productId,
		productInCart,
		className
	}
) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.cart.addToCart,
		mutationFn: () => addToCart(productId),
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

		if (!productInCart) {
			mutation.mutate();
		} else {
			navigate(configRoutes.cart.mask);
		}
	};

	return (
		<Button
			className={cn("h-12 w-32 border-primary", className)}
			onClick={event => onAddToCart(event)}
			variant={productInCart ? "outline" : "default"}>
			{productInCart ? "In your cart" : "Add to cart"}
		</Button>
	);
};