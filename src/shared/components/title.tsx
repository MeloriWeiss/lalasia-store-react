import React from "react";
import { clsx } from "clsx";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
	text?: string;
	size?: TitleSize;
	className?: string;
}

export const Title: React.FC<Props> = (
	{
		text = "",
		size = "md",
		className
	}
) => {
	const mapTagBySize = {
		xs: "h6",
		sm: "h5",
		md: "h4",
		lg: "h3",
		xl: "h2",
		"2xl": "h1"
	};
	const mapClassBySize = {
		xs: "text-[16px]",
		sm: "text-[22px]",
		md: "text-[26px]",
		lg: "text-[32px]",
		xl: "text-[42px]",
		"2xl": "text-[48px]"
	};

	return (
		React.createElement(mapTagBySize[size],
			{ className: clsx(mapClassBySize[size], 'font-bold leading-none', className ? className : "") },
			text
		)
	);
};