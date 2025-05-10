import React from "react";
import { cn } from "../utils";

interface Props {
	className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("border-[10px] rounded-[50%] border-primary border-t-background w-[80px] h-[80px] animate-spin mx-auto", className)} />
	);
};