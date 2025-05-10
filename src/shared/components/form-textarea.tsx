import React from "react";
import { Textarea } from "./ui";
import { cn } from "../utils";

interface Props {
	label: string;
	onChange: (value: string) => void;
	value: string;
	required?: boolean;
	className?: string;
	textareaClassname?: string;
}

export const FormTextarea: React.FC<Props> = (
	{
		label,
		onChange,
		value,
		required = false,
		className,
		textareaClassname
	}
) => {
	return (
		<div className={cn("w-full", className)}>
			<div className="ms-2 mb-2 font-semibold text-lg flex gap-2">
				<p>{label}</p>
				{required &&
					<span className="text-red-500">*</span>
				}
			</div>
			<Textarea
				value={value || ""}
				onChange={event => onChange(event.target.value)}
				className={cn('bg-white shadow-none font-semibold h-24 text-2xl', textareaClassname)}
			/>
		</div>
	);
};