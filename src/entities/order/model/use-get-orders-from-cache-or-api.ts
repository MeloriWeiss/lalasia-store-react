import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetOrdersResponseType } from "../../../shared/types";
import { configCacheKeys } from "../../../shared/config";
import { getOrders } from "./orders.service.ts";

export const useGetOrdersFromCacheOrApi = () => {
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [isDataLoading, setIsDataLoading] = useState(false);

	const { data, isBaseLoading, refetch } = useQuery({
		queryKey: configCacheKeys.orders.orders,
		queryFn: () => getOrders(page)
	});

	const fetchOrders = () => {
		const nextPage = page + 1;
		if (nextPage <= maxPage) {
			setPage(nextPage);
		}
	};

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}

		const updateData = async () => {
			const oldData = queryClient.getQueryData(configCacheKeys.orders.orders);

			if (oldData.orders.length >= page * 10 || oldData.orders.length === oldData.ordersCount) {

				queryClient.setQueryData(configCacheKeys.orders.orders, {
						ordersCount: oldData.ordersCount,
						orders: oldData.orders
					})
				return;
			}

			setIsDataLoading(true);
			await refetch();
			const newData = queryClient.getQueryData(configCacheKeys.orders.orders);

			if (newData) {
				queryClient.setQueryData(configCacheKeys.orders.orders, {
					ordersCount: newData?.ordersCount,
					orders: [...oldData.orders, ...newData?.orders]
				});
			}
			setIsDataLoading(false);
		};

		updateData().then();
	}, [page]);

	const maxPage = Math.ceil(data?.ordersCount / 10);

	const isLoading = isDataLoading || isBaseLoading;

	return {
		data,
		isLoading,
		page,
		maxPage,
		fetchOrders
	};
};