import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys } from "../../shared/config";
import { updateProductCount } from "../../entities/cart/model/cart.service.ts";

export const useChangeProductCount = (initCount: number, cartItemId: string, requestEnabled: boolean) => {
	const [count, setCount] = useState(initCount);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.cart.updateProductCountInCart,
		mutationFn: (newCount: number) => updateProductCount(cartItemId, newCount),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: configCacheKeys.cart.cart }).then();
		}
	});

	const updateCount = (newCount: number) => {
		if (newCount < 1) {
			return;
		}
		if (requestEnabled) {
			mutation.mutate(newCount);
		}
		setCount(newCount);
	};

	return {
		count,
		updateCount
	};
};