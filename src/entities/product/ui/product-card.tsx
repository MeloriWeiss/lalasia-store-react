import React from "react";
import { useNavigate } from "react-router";
import { cn } from "../../../shared/utils";
import { Title } from "../../../shared/components";
import { configEnvironment, configRoutes } from "../../../shared/config";
import { CartItemType, ProductType } from "../../../shared/types";
import { AddToCartButton } from "../../../features";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store.ts";

interface Props {
	product: ProductType;
	cartItems: CartItemType[];
	className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, cartItems, className }) => {
	const navigate = useNavigate();
	const authorized = useSelector((state: RootState) => state.auth.authorized);

	const productInCart = !!cartItems.find(item => item.product.id === product.id);

	return (
		<div onClick={() => navigate(configRoutes.product.create(product.id))} className="cursor-pointer">
			<div className={cn("w-[360px] bg-white", className)}>
				<img src={configEnvironment.serverStaticPath + product.imageUrl} alt={product.name} className="w-full" height={360} />
				<div className="py-12 px-3">
					<div className="flex flex-col gap-2 mb-8">
						<span className="text-gray-400">{product.type}</span>
						<Title text={product.name} size="sm" />
						<p className="text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.description}</p>
					</div>
					<div className="flex justify-between items-center">
						<b className="text-lg">${product.price}</b>
						<AddToCartButton
							productId={product.id}
							productInCart={productInCart}
							requestEnabled={authorized}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};