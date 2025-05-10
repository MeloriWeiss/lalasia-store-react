import React from "react";
import { CheckoutForm } from "../widgets/forms/checkout-form";
import { Title } from "../shared/components";

interface Props {
	className?: string;
}

export const Checkout: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title text="Making an order" size="lg" className="mb-20" />
			<CheckoutForm />
		</div>
	);
};