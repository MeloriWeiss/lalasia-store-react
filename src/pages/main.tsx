import React, { useRef } from "react";
import { Pagination, ProductsTypesSelect, Title } from "../shared/components";
import { SearchInput } from "../features";
import { ProductCard } from "../entities";
import { useFetchProducts, useSearchProductsParams } from "../entities/product/model";
import { Loader } from "../shared/components";
import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../shared/config";
import { getCart } from "../entities/cart/model/cart.service.ts";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store.ts";

interface Props {
	className?: string;
}

export const Main: React.FC<Props> = ({ className }) => {
	const productsRef = useRef(null);
	const authorized = useSelector((state: RootState) => state.auth.authorized);

	const {
		searchParams,
		searchQuery,
		setSearchQuery,
		setSearchProductsParams,
		selectedType,
		setSelectedType,
		currentPage,
		setCurrentPage,
		createParamsObject
	} = useSearchProductsParams();

	const { data: productsData, isLoading } = useFetchProducts(searchParams, createParamsObject());

	const { data: cartData } = useQuery({
		queryKey: configCacheKeys.cart.cart,
		queryFn: getCart,
		enabled: authorized
	});

	const scrollToTop = () => {
		if (productsRef.current) {
			(productsRef.current as HTMLElement).scrollIntoView();
		}
	};

	const maxPage = Math.ceil((productsData?.productsCount || 0) / 6);
	console.log(maxPage);
	return (
		<div className={className}>
			<div className="mb-14 mx-auto text-center max-w-[750px]">
				<Title size="2xl" text="Products" className="mb-6" />
				<p className="text-2xl text-gray-400" ref={productsRef}>
					We display products based on the latest products we have, if you want
					to see our old products please enter the name of the item
				</p>
			</div>
			<SearchInput value={searchQuery} onChange={setSearchQuery} onSubmit={setSearchProductsParams} className="mb-6" />
			<ProductsTypesSelect value={selectedType} onValueChange={setSelectedType} className="mb-12" />
			<div className="flex justify-between items-center mb-9">
				<div className="flex items-center gap-6">
					<Title size="lg" text="Total products" />
					<span className="text-primary font-semibold text-xl mt-1">{productsData?.productsCount}</span>
				</div>
				<Pagination currentPage={currentPage} maxPage={maxPage}
										onChangePage={setCurrentPage} />
			</div>
			{isLoading
				?
				<Loader />
				:
				<>
					<div className="flex justify-start items-start flex-wrap gap-y-8 gap-x-20">
						{productsData?.products.map(product => (
							<ProductCard key={product.id} product={product} cartItems={cartData?.cartItems || []} />
						))}
					</div>
					<div onClick={scrollToTop}>
						<Pagination
							currentPage={currentPage}
							maxPage={Math.ceil((productsData?.productsCount || 0) / 6)}
							onChangePage={setCurrentPage}
							className="mt-14"
						/>
					</div>
				</>
			}
		</div>
	);
};