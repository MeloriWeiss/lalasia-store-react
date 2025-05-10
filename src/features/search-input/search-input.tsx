import React from "react";
import { cn } from "../../shared/utils";
import { Button, Input } from "../../shared/components";

interface Props {
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	onSubmit: VoidFunction;
	className?: string;
}

export const SearchInput: React.FC<Props> = (
		{
			value,
			onChange,
			onSubmit,
			className
		}
	) => {
		return (
			<div className={cn("flex justify-between items-center", className)}>
				<Input
					placeholder="Search product..."
					value={value}
					onChange={event => onChange(event.target.value)}
					className="h-14 text-lg"
				/>
				<Button className="ml-6 w-32 h-14 text-lg" onClick={onSubmit}>Find now</Button>
			</div>
		);
	}
;