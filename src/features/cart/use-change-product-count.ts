import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys } from "../../shared/config";
import { updateProductCount } from "../../entities/cart/model/cart.service.ts";

export const useChangeProductCount = (initCount: number, cartItemId: string) => {
	const [count, setCount] = useState(initCount);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.cart.updateProductCountInCart,
		mutationFn: () => updateProductCount(cartItemId, count),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: configCacheKeys.cart.cart }).then();
		}
	});

	const updateCount = (newCount: number) => {
		setCount(newCount);
		mutation.mutate();
	};

	return {
		count,
		updateCount
	};
};