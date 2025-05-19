import React, { useEffect, useState } from "react";
import { getOrderStatusColor } from "../../../shared/utils";
import { Badge, Dropdown } from "../../../shared/components";
import { orderStatuses } from "../../../shared/types/order-statuses.ts";
import { useMutation } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import { changeOrderStatus } from "../model";

interface Props {
	orderId: string;
	initialStatus: string;
	className?: string;
}

export const ChangeOrderStatusButton: React.FC<Props> = ({ orderId, initialStatus, className }) => {
	const [currentStatus, setCurrentStatus] = useState(initialStatus);

	const mutation = useMutation({
		mutationKey: configCacheKeys.orders.changeStatus,
		mutationFn: (status: string) => changeOrderStatus({
			orderId,
			orderStatus: status
		}),
		onSuccess: (response) => {
			setCurrentStatus(response.newStatus);
		}
	});

	return (
		<Dropdown.DropdownMenu>
			<Dropdown.DropdownMenuTrigger className="flex justify-center items-center mb-4">
				<Badge className="text-sm cursor-pointer" variant={getOrderStatusColor(currentStatus)}>{currentStatus}</Badge>
			</Dropdown.DropdownMenuTrigger>
			<Dropdown.DropdownMenuContent>
				{orderStatuses.map(status => (
					<Dropdown.DropdownMenuItem className="text-lg" key={status} onClick={() => mutation.mutate(status)}>
						<Badge className="text-sm cursor-pointer w-full" variant={getOrderStatusColor(status)}>{status}</Badge>
					</Dropdown.DropdownMenuItem>
				))}
			</Dropdown.DropdownMenuContent>
		</Dropdown.DropdownMenu>
	);
};