import React from "react";
import { useGetOrdersFromCacheOrApi } from "../../entities";
import { OrdersList } from "../../widgets";
import { Button } from "../../shared/components";

interface Props {
	className?: string;
}

export const Orders: React.FC<Props> = ({ className }) => {
	const {
		data,
		isLoading,
		page,
		maxPage,
		fetchOrders
	} = useGetOrdersFromCacheOrApi();

	return (
		<div className={className}>
			<OrdersList
				orders={data?.orders.slice(0, page * 10) || []}
				isLoading={isLoading}
				fetchOrders={fetchOrders}
				listIsEmpty={data?.orders.length === 0}
			/>
			{(!isLoading && page < maxPage && data?.orders.length > 0) &&
				<div onClick={fetchOrders} className="flex justify-center">
					<Button className="w-60 h-12 mt-14">Load more</Button>
				</div>
			}
		</div>
	);
};