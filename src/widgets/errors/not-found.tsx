import React from "react";
import { Button, Title } from "../../shared/components";
import { cn } from "../../shared/utils";
import { Link } from "react-router";
import { configRoutes } from "../../shared/config";

interface Props {
	className?: string;
}

export const NotFound: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("max-w-[200px] mx-auto text-center mt-24", className)}>
			<Title text="Page not found" />
			<Link to={configRoutes.main.mask}>
				<Button className="w-full mt-8">На главную</Button>
			</Link>
		</div>
	);
};