import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../shared/utils";
import { useChangeProductCount } from "./use-change-product-count.ts";

interface Props {
	cartItemId: string;
	initCount: number;
	requestEnabled?: boolean;
	onCountChange?: (count: number) => void;
	className?: string;
}

export const ChangeCountInCartButton: React.FC<Props> = (
	{
		cartItemId,
		initCount,
		requestEnabled = true,
		onCountChange,
		className
	}
) => {
	const { count, updateCount } = useChangeProductCount(initCount, cartItemId, requestEnabled);

	const changeCount = (newCount: number) => {
		updateCount(newCount);
		onCountChange?.(newCount);
	}

	return (
		<div
			className={cn("flex justify-center gap-1 items-center bg-gray-100 p-1 rounded-lg max-w-[100px] font-semibold text-lg", className)}>
			<Minus onClick={() => changeCount(count - 1)} className="cursor-pointer select-none" />
			<span className="min-w-[30px] text-center">{count}</span>
			<Plus onClick={() => changeCount(count + 1)} className="cursor-pointer select-none" />
		</div>
	);
};