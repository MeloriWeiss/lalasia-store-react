import React from "react";
import { CartItemType } from "../../shared/types";
import { CartItem } from "../../entities";
import { cn } from "../../shared/utils";

interface Props {
	cartItems: CartItemType[] | undefined;
	className?: string;
}

export const CartList: React.FC<Props> = ({ cartItems, className }) => {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			{cartItems?.map(item => (
				<CartItem item={item} key={item.id} />
			))}
		</div>
	);
};