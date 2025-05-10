import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { configRoutes } from "../../shared/config";
import { cn } from "../../shared/utils";

interface Props {
	className?: string;
}

export const ProfileLayout: React.FC<Props> = ({ className }) => {
	const location = useLocation();

	return (
		<div className={cn("-mt-4 pb-6", className)}>
			<div className="grid grid-cols-2 justify-items-center text-center w-[300px] font-semibold text-xl mb-20">
				<div className='w-full'>
					<Link to={configRoutes.profile.children.info.mask} className="block w-full">Information</Link>
					<div className={cn("h-1 rounded-lg bg-transparent mt-1 transition", {
						"bg-primary": location.pathname.includes('info')
					})} />
				</div>
				<div className='w-full'>
					<Link to={configRoutes.profile.children.orders.mask} className="block w-full">Orders</Link>
					<div className={cn("h-1 rounded-lg bg-transparent mt-1 transition", {
						"bg-primary": location.pathname.includes('orders')
					})} />
				</div>
			</div>
			<Outlet />
		</div>
	);
};