import React from "react";
import { cn } from "../../shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys } from "../../shared/config";
import { removeFromCart } from "../../entities/cart/model/cart.service.ts";

interface Props {
	cartId: string;
	onRemove: boolean;
	changeRemoveState: (onRemove: boolean) => void;
	className?: string;
}

export const RemoveFromCartButton: React.FC<Props> = (
	{
		cartId,
		onRemove,
		changeRemoveState,
		className
	}
) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.cart.removeProductFromCart,
		mutationFn: () => removeFromCart(cartId),
		onMutate: () => {
			changeRemoveState(true);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: configCacheKeys.cart.cart }).then();
		},
		onSettled: () => {
			changeRemoveState(false);
		}
	});

	return (
		<div onClick={onRemove ? undefined : mutation.mutate}
				 className={cn("absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700 transition cursor-pointer", className)}>&times;</div>
	);
};