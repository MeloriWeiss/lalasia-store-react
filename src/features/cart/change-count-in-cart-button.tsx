import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../shared/utils";
import { useChangeProductCount } from "./use-change-product-count.ts";

interface Props {
	cartItemId: string;
	initCount: number;
	className?: string;
}

export const ChangeCountInCartButton: React.FC<Props> = ({ cartItemId, initCount, className }) => {
	const {count, updateCount} = useChangeProductCount(initCount, cartItemId);

	return (
		<div className={cn('flex justify-center gap-1 items-center bg-gray-100 p-1 rounded-lg max-w-[100px]', className)}>
			<Minus onClick={() => updateCount(count - 1)} className="cursor-pointer select-none" />
			<span className="min-w-[30px] text-center">{count}</span>
			<Plus onClick={() => updateCount(count + 1)} className="cursor-pointer select-none" />
		</div>
	);
};