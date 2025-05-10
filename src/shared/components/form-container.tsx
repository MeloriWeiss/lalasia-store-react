import React, { PropsWithChildren } from "react";
import { cn } from "../utils";
import { Title } from "./title.tsx";

interface Props {
	formTitle?: string;
	onSubmit?: (event: React.FormEvent) => void;
	preventDefault?: boolean;
	className?: string;
}

export const FormContainer: React.FC<PropsWithChildren<Props>> = (
	{
		formTitle,
		onSubmit,
		preventDefault = true,
		className,
		children
	}
) => {
	const onSubmitForm = (event: React.FormEvent) => {
		if (preventDefault) {
			event.preventDefault();
		}
		onSubmit?.(event);
	}

	return (
		<form
			onSubmit={onSubmitForm}
			className={cn("max-w-[560px] mx-auto flex flex-col gap-4 p-7", className)}
		>
			{formTitle &&
				<Title text={formTitle} size="md" className="text-center mb-5" />
			}
			{children}
		</form>
	);
};