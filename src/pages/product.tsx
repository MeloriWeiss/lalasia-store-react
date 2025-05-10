import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../shared/config";
import { useNavigate, useParams } from "react-router";
import { getProduct } from "../entities/product/model";
import { Loader, Title } from "../shared/components";
import { ChevronLeft } from "lucide-react";
import { AddToCartButton } from "../features";
import { getCart } from "../entities/cart/model/cart.service.ts";
import toast from "react-hot-toast";

interface Props {
	className?: string;
}

export const Product: React.FC<Props> = ({ className }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: productData, error: productError, isLoading: isProductLoading } = useQuery({
		queryKey: configCacheKeys.products.product(id || "product-id"),
		queryFn: () => getProduct(id || ""),
		staleTime: 0,
		gcTime: 0
	});

	const { data: cartData, error: cartError } = useQuery({
		queryKey: configCacheKeys.cart.cart,
		queryFn: getCart
	});

	useEffect(() => {
		if (productError) {
			toast.error(productError.response.data.message);
		}
		if (cartError) {
			toast.error(cartError.response.data.message);
		}
	}, [productError, cartError]);

	const productInCart = !!cartData?.cartItems!.find(item => item.product.id === id);

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
					<img className="w-2/5" src={productData?.imageUrl} alt={productData?.name} />
					<div className="px-24">
						<Title text={productData?.name} size="xl" />
						<p
							className="text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis mt-10 mb-28 text-lg">{productData?.description}</p>
						<div className="flex gap-24 items-center">
							<span className="font-bold text-4xl">${productData?.price}</span>
							<AddToCartButton
								productId={productData?.id || ""}
								productInCart={productInCart}
							/>
						</div>
					</div>
				</div>
			}
		</div>
	);
};