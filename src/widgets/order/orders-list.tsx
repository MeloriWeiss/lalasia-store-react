import React, { useRef } from "react";
import { OrderType } from "../../shared/types";
import { Order } from "../../entities";
import { EmptyListInfo, Loader } from "../../shared/components";

interface Props {
	orders: OrderType[];
	isLoading: boolean;
	listIsEmpty?: boolean;
	className?: string;
}

export const OrdersList: React.FC<Props> = (
	{
		orders,
		isLoading,
		listIsEmpty = false,
		className
	}
) => {
	if (isLoading && orders.length === 0) {
		return <Loader />;
	}

	return (
		<div className={className}>
			{!listIsEmpty
				?
				<div className="flex flex-col gap-8">
					{orders.map((order, index) => (
						<Order order={order} key={order.id} number={index + 1} />
					))}
					{isLoading &&
						<Loader className="mt-6" />
					}
				</div>
				:
				<EmptyListInfo infoText="The list of orders is empty" />
			}
		</div>
	);
};