import React, { useRef } from "react";
import { OrderType } from "../../shared/types";
import { Order, useGetOrdersFromCacheOrApi } from "../../entities";
import { Button, EmptyListInfo, Loader } from "../../shared/components";

interface Props {
	isAdmin?: boolean;
	className?: string;
}

export const OrdersList: React.FC<Props> = ({ isAdmin = false, className }) => {
	const {
		data,
		isLoading,
		page,
		maxPage,
		fetchOrders
	} = useGetOrdersFromCacheOrApi();

	if (isLoading && data?.orders.length === 0) {
		return <Loader />;
	}

	return (
		<div className={className}>
			{data?.orders.length !== 0
				?
				<div>
					<div className="flex flex-col gap-8">
						{(data?.orders.slice(0, page * 10) || []).map((order, index) => (
							<Order isAdmin={isAdmin} order={order} key={order.id} number={index + 1} />
						))}
						{isLoading &&
							<Loader className="mt-6" />
						}
					</div>
					{(!isLoading && page < maxPage && data?.orders.length > 0) &&
						<div onClick={fetchOrders} className="flex justify-center">
							<Button className="w-60 h-12 mt-14">Load more</Button>
						</div>
					}
				</div>
				:
				<EmptyListInfo infoText="The list of orders is empty" />
			}
		</div>
	);
};