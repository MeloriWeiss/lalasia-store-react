import React, { PropsWithChildren } from "react";
import { Button } from "../../shared/components";
import { cn } from "../../shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys, configRoutes } from "../../shared/config";
import { addToCart } from "../../entities/cart/model/cart.service.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAddToCart } from "./use-add-to-cart.ts";

interface Props {
	productId: string;
	productInCart: boolean;
	requestEnabled?: boolean;
	productCountToAdd?: number;
	className?: string;
}

export const AddToCartButton: React.FC<Props> = (
	{
		productId,
		productInCart,
		requestEnabled = true,
		productCountToAdd = 1,
		className
	}
) => {
	const onAddToCart = useAddToCart(productId, productInCart, requestEnabled, productCountToAdd);

	return (
		<Button
			className={cn("h-12 w-32 border-primary", className)}
			onClick={event => onAddToCart(event)}
			variant={productInCart ? "outline" : "default"}>
			{productInCart ? "In your cart" : "Add to cart"}
		</Button>
	);
};