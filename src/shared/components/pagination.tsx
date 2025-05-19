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
		<div className={cn("flex justify-center items-center gap-2 select-none", className)}>
			<ChevronLeft width={50} height={50} onClick={() => changePage(currentPage - 1)} className={cn("cursor-pointer p-2", {
				"opacity-40" : currentPage === 1
			})} />
			<span className="font-semibold text-2xl flex items-center gap-2 text-center">
				<span className="w-6">{currentPage}</span>
				<span>of</span>
				<span className="w-6">{maxPage}</span>
			</span>
			<ChevronRight width={50} height={50} onClick={() => changePage(currentPage + 1)} className={cn("cursor-pointer p-2", {
				"opacity-40" : currentPage === maxPage
			})} />
		</div>
	);
};