import React from "react";
import { OrderType } from "../../../shared/types";
import { cn, getOrderStatusColor } from "../../../shared/utils";
import { Badge } from "../../../shared/components";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { ChangeOrderStatusButton } from "./change-order-status-button.tsx";

interface Props {
	order: OrderType;
	number: number;
	isAdmin?: boolean;
	className?: string;
}

export const Order: React.FC<Props> = ({ order, number, isAdmin = false, className }) => {
	const fullOrderId = order.id.split("-")[4].toUpperCase();
	const orderId = fullOrderId.slice(fullOrderId.length - 6);

	return (
		<div
			className={cn("flex justify-between items-start gap-8 px-8 py-5 bg-white rounded-2xl text-foreground font-semibold text-lg", className)}>
			<div>
				<div className="flex items-center gap-12 mb-3">
					<div>{number}. Order #{orderId}</div>
					<div>{order.createdAt.split("T")[0]}</div>
				</div>
				<div className="text-gray-400 w-[360px]">{order.products}</div>
			</div>
			<div className="grid grid-cols-2 gap-y-5 gap-x-10">
				<div className="flex items-center gap-4 w-[300px]">
					<Mail className="shrink-0" />
					{order.email}
				</div>
				<div className="flex items-center gap-4 w-[300px]">
					<MapPin className="shrink-0" />
					{order.address}
				</div>
				<div className="flex items-center gap-4 w-[300px]">
					<User className="shrink-0" />
					{order.name}
				</div>
				<div className="flex items-center gap-4 w-[300px]">
					<Phone className="shrink-0" />
					{order.phone}
				</div>
			</div>
			<div className="w-20">
				{isAdmin
					?
					<ChangeOrderStatusButton orderId={order.id} initialStatus={order.orderStatus} />
					:
					<Badge className="text-sm mb-4" variant={getOrderStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
				}
				<div>${order.totalPrice}</div>
			</div>
		</div>
	);
};