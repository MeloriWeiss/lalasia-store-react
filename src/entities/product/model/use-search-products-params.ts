import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { SearchParamsType } from "../../../shared/types";
import { undefined } from "zod";

export const useSearchProductsParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1);
	const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
	const [selectedType, setSelectedType] = useState(searchParams.get("types") || "");

	useEffect(() => {
		setSearchProductsParams();
	}, [selectedType, currentPage]);

	const setSearchProductsParams = () => {
		setSearchParams(createParamsObject());
	};

	const createParamsObject = () => {
		const params: SearchParamsType = {};
		searchQuery ? params.query = searchQuery : undefined;
		(selectedType && selectedType !== "All") ? params.types = selectedType : undefined;
		currentPage > 1 ? params.page = String(currentPage) : undefined;
		return params;
	};

	return {
		searchParams,
		searchQuery,
		setSearchQuery,
		selectedType,
		setSelectedType,
		setSearchProductsParams,
		currentPage,
		setCurrentPage,
		createParamsObject
	};
};