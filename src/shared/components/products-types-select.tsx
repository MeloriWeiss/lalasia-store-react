import React from "react";
import {SelectGroup} from "./ui";
import { ProductsTypesList } from "../types/products-types-list.ts";

interface Props {
	onValueChange: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	className?: string;
}

export const ProductsTypesSelect: React.FC<Props> = ({ onValueChange, value, className }) => {
	return (
		<div className={className}>
			<SelectGroup.Select onValueChange={onValueChange} value={value}>
				<SelectGroup.SelectTrigger className="w-72 h-14 py-7 bg-white shadow-none border-none">
					<SelectGroup.SelectValue placeholder="Filter" />
				</SelectGroup.SelectTrigger>
				<SelectGroup.SelectContent>
					<SelectGroup.SelectGroup>
						<SelectGroup.SelectLabel>Type</SelectGroup.SelectLabel>
						<SelectGroup.SelectItem value="All">All</SelectGroup.SelectItem>
						{ProductsTypesList.map(variant => (
							<SelectGroup.SelectItem key={variant} value={variant}>{variant}</SelectGroup.SelectItem>
						))}
					</SelectGroup.SelectGroup>
				</SelectGroup.SelectContent>
			</SelectGroup.Select>
		</div>
	);
};