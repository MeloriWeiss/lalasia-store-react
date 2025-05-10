import React from "react";
import { cn } from "../utils";
import { Input } from "./ui";

interface Props {
	label: string;
	onChange: (value: string) => void;
	value: string;
	errorText?: string;
	required?: boolean;
	type?: string;
	className?: string;
	inputClassname?: string;
}

export const FormInput: React.FC<Props> = (
	{
		label,
		onChange,
		value,
		errorText,
		required = true,
		type = 'text',
		className,
		inputClassname,
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
			<Input value={value || ''} onChange={event => onChange(event.target.value)} className={inputClassname} type={type} />
			{errorText &&
				<div className="text-red-500 mt-2">{errorText}</div>
			}
		</div>
	);
};