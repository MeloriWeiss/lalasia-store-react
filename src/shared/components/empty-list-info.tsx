import React from "react";
import { Link } from "react-router";
import { configRoutes } from "../config";
import { Button } from "./ui";
import { cn } from "../utils";

interface Props {
	infoText?: string;
	buttonText?: string;
	navigateTo?: string;
	className?: string;
}

export const EmptyListInfo: React.FC<Props> = (
	{
		infoText = "The list is empty",
		buttonText = "Go shopping",
		navigateTo = configRoutes.main.mask,
		className
	}
) => {
	return (
		<div className={cn("w-[400px] mx-auto flex flex-col gap-8 text-center pt-20", className)}>
			<div className="text-2xl font-semibold">{infoText}</div>
			<Link to={navigateTo}>
				<Button className="h-12">{buttonText}</Button>
			</Link>
		</div>
	);
};