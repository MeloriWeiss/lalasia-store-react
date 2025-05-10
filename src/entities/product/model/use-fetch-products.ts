import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { SearchParamsType } from "../../../shared/types";
import { getProducts } from "./products.service.ts";

export const useFetchProducts = (searchParams: URLSearchParams, params: SearchParamsType) => {
	const [isFirst, setIdFirst] = useState(false);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: configCacheKeys.products.products,
		queryFn: () => getProducts(params),
	});

	useEffect(() => {
		if (error) {
			toast.error(error.response.data.message);
		}
	}, [error]);

	useEffect(() => {
		if (isFirst) {
			refetch();
		}
		setIdFirst(true);
	}, [searchParams]);

	return {
		data,
		isLoading
	};
};