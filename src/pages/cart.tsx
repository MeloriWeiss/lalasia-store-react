import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../entities/cart/model/cart.service.ts";
import { configCacheKeys } from "../shared/config";
import { EmptyListInfo, Title } from "../shared/components";
import { CartList, CartResults } from "../widgets";
import toast from "react-hot-toast";
import { Loader } from "../shared/components";

interface Props {
	className?: string;
}

export const Cart: React.FC<Props> = ({ className }) => {
	const { data, error, isLoading } = useQuery({
		queryKey: configCacheKeys.cart.cart,
		queryFn: getCart
	});

	useEffect(() => {
		if (error) {
			toast.error(error.response.data.message);
		}
	}, [error]);

	return (
		<div className={className}>
			<Title text="Cart" size="lg" className="mb-10 ms-4" />
			{isLoading
				?
				<Loader className="mt-32" />
				:
				<>
					{data?.cartItems?.length > 0
						?
						<div className="flex justify-between gap-x-12">
							<CartList cartItems={data?.cartItems} className="w-[840px] mb-10" />
							<CartResults totalPrice={data?.totalPrice || 0} className="h-fit" />
						</div>
						:
						<EmptyListInfo infoText="The cart is empty" />
					}
				</>
			}
		</div>
	);
};