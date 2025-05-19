import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { SearchParamsType } from "../../../shared/types";
import { getProducts } from "./products.service.ts";

export const useFetchProducts = (searchParams: URLSearchParams, params: SearchParamsType) => {
	const [skippedFirstRender, setSkippedFirstRender] = useState(false);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: configCacheKeys.products.products,
		queryFn: () => getProducts(params),
		staleTime: 0,
		gcTime: 0
	});

	useEffect(() => {
		if (error) {
			toast.error(error.response?.data.message);
		}
	}, [error]);

	useEffect(() => {
		if (skippedFirstRender) {
			refetch().then();
		}
		setSkippedFirstRender(true);
	}, [searchParams]);

	return {
		data,
		isLoading
	};
};