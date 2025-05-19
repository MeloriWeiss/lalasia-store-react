import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { configCacheKeys, configEnvironment } from "../shared/config";
import { useNavigate, useParams } from "react-router";
import { getProduct, useGetProductsAndCart } from "../entities/product/model";
import { Loader, Title } from "../shared/components";
import { ChevronLeft } from "lucide-react";
import { AddToCartButton, ChangeCountInCartButton } from "../features";
import { getCart } from "../entities/cart/model/cart.service.ts";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store.ts";

interface Props {
	className?: string;
}

export const Product: React.FC<Props> = ({ className }) => {
	const navigate = useNavigate();
	const [productCount, setProductCount] = useState(1);

	const {
		productData,
		productInCart,
		authorized,
		isProductLoading
	} = useGetProductsAndCart();

	return (
		<div className={className}>
			<div className="flex items-center gap-6 cursor-pointer" onClick={() => navigate(-1)}>
				<ChevronLeft width={40} height={40} strokeWidth={1} />
				<span className="font-semibold text-xl">Back</span>
			</div>
			{isProductLoading
				?
				<Loader className="mt-36" />
				:
				<div className="mt-12 flex">
					<img className="w-2/5" src={configEnvironment.serverStaticPath + productData?.imageUrl}
							 alt={productData?.name} />
					<div className="px-24">
						<Title text={productData?.name} size="xl" />
						<p className="text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis mt-10 mb-28 text-lg">
							{productData?.description}
						</p>
						<span className="font-bold text-4xl">${productData?.price}</span>
						<div className="flex gap-24 items-center mt-14">
							<ChangeCountInCartButton
								cartItemId={productInCart?.id || ""}
								initCount={productInCart?.productCount || 1}
								requestEnabled={!!productInCart}
								onCountChange={setProductCount}
							/>
							<AddToCartButton
								productId={productData?.id || ""}
								productInCart={!!productInCart}
								requestEnabled={authorized}
								productCountToAdd={productCount}
							/>
						</div>
					</div>
				</div>
			}
		</div>
	);
};