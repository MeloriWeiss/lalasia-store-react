import React from "react";
import { Button } from "../../shared/components";
import { cn } from "../../shared/utils";
import { CheckoutFormType } from "../../widgets/forms/checkout-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys, configRoutes } from "../../shared/config";
import { createOrder } from "../../entities";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Props {
	data: CheckoutFormType;
	requestEnabled: boolean;
	className?: string;
}

export const CreateOrderButton: React.FC<Props> = (
	{
		data,
		requestEnabled,
		className
	}
) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.orders.createOrder,
		mutationFn: () => createOrder(data),
		onSuccess: (response) => {
			toast.success(response.message);
			navigate(configRoutes.main.mask);

			queryClient.invalidateQueries({ queryKey: configCacheKeys.cart.cart }).then();
			queryClient.invalidateQueries({ queryKey: configCacheKeys.orders.orders }).then();
		},
		onError: (error) => {
			toast.error(error.response?.data.message);
		}
	});

	return (
		<Button onClick={requestEnabled ? mutation.mutate : undefined} className={cn("w-30", className)}>Order</Button>
	);
};