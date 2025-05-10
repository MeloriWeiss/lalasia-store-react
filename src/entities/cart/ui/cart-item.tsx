import React, { useState } from "react";
import { cn } from "../../../shared/utils";
import { CartItemType } from "../../../shared/types";
import { ChangeCountInCartButton, RemoveFromCartButton } from "../../../features";
import { Link } from "react-router";
import { configRoutes } from "../../../shared/config";

interface Props {
	item: CartItemType;
	className?: string;
}

export const CartItem: React.FC<Props> = ({ item, className }) => {
	const [onRemove, setOnRemove] = useState(false);

	return (
		<div className={cn("flex justify-between items-center px-8 pr-4 py-5 bg-white rounded-2xl font-semibold text-lg relative transition", {
			"opacity-30": onRemove
		},className)}>
			<Link to={configRoutes.product.create(item.product.id)} className="flex items-center gap-8">
				<img src={item.product.imageUrl} alt={item.product.name} width={100} height={100} className="rounded-lg" />
				<div className="w-[210px]">{item.product.name}</div>
			</Link>
			<div>{item.product.price} for 1pc.</div>
			<ChangeCountInCartButton cartItemId={item.id} initCount={item.productCount} className="w-[120px]" />
			<div className="min-w-[140px]">Итого: ${item.totalPrice.toFixed(2)}</div>
			<RemoveFromCartButton cartId={item.id} onRemove={onRemove} changeRemoveState={(onRemove) => setOnRemove(onRemove)} />
		</div>
	);
};