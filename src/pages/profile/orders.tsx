import React from "react";
import { useGetOrdersFromCacheOrApi } from "../../entities";
import { OrdersList } from "../../widgets";
import { Button } from "../../shared/components";

interface Props {
	className?: string;
}

export const Orders: React.FC<Props> = ({ className }) => {
	return (
		<OrdersList className={className} />
	);
};