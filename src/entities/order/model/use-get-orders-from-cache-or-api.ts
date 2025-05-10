import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetOrdersResponseType } from "../../../shared/types";
import { configCacheKeys } from "../../../shared/config";
import { getOrders } from "./orders.service.ts";

export const useGetOrdersFromCacheOrApi = () => {
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const [isFirstRender, setIsFirstRender] = useState(true);
	const [renderData, setRenderData] = useState<GetOrdersResponseType>();
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
		setRenderData(data);
	}, [data]);

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);

			const oldData = queryClient.getQueryData(configCacheKeys.orders.orders);

			if (oldData) {
				setRenderData({
					ordersCount: oldData.ordersCount,
					orders: oldData.orders.slice(0, 10)
				});
			}
			return;
		}

		const updateData = async () => {
			const oldData = queryClient.getQueryData(configCacheKeys.orders.orders);

			if (oldData.orders.length >= page * 10 || oldData.orders.length === oldData.ordersCount) {
				const currentStartIndex = (page - 1) * 10;
				setRenderData({
					ordersCount: oldData.ordersCount,
					orders: oldData.orders.slice(0, currentStartIndex + 10)
				});
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
			setRenderData(queryClient.getQueryData(configCacheKeys.orders.orders));
		};

		updateData().then();
	}, [page]);

	const maxPage = Math.ceil(data?.ordersCount / 10);

	const isLoading = isDataLoading || isBaseLoading;

	return {
		renderData,
		data,
		isLoading,
		page,
		maxPage,
		fetchOrders
	};
};