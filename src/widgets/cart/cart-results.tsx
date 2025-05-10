import React from "react";
import { cn } from "../../shared/utils";
import { Button } from "../../shared/components";
import { Link } from "react-router";
import { configRoutes } from "../../shared/config";

interface Props {
	totalPrice: number;
	className?: string;
}

export const CartResults: React.FC<Props> = ({ totalPrice, className }) => {
	return (
		<div className={cn("flex flex-col w-[340px] bg-white rounded-2xl p-6", className)}>
			<div className="flex justify-between items-center leading-none font-semibold text-lg">
				<div className="flex flex-1">
					Total price:
					<div className="flex flex-1 border-b border-dashed"></div>
				</div>
				${totalPrice.toFixed(2)}
			</div>
			<Link to={configRoutes.checkout.mask}>
				<Button className="h-12 mt-14 w-full">Place an order</Button>
			</Link>
		</div>
	);
};