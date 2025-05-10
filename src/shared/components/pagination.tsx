import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils";

interface Props {
	currentPage: number;
	maxPage: number;
	onChangePage: (page: number) => void;
	className?: string;
}

export const Pagination: React.FC<Props> = (
	{
		currentPage,
		maxPage,
		onChangePage,
		className
	}
) => {
	const changePage = (page: number) => {
		if (page > 0 && page <= maxPage) {
			onChangePage(page);
		}
	};

	if (maxPage <= 1 || isNaN(maxPage)) {
		return;
	}

	return (
		<div className={cn("flex justify-center items-center gap-3 select-none", className)}>
			<ChevronLeft width={50} height={50} onClick={() => changePage(currentPage - 1)} className="cursor-pointer p-2" />
			<span className="font-semibold text-2xl">{currentPage}</span>
			<ChevronRight width={50} height={50} onClick={() => changePage(currentPage + 1)} className="cursor-pointer p-2" />
		</div>
	);
};