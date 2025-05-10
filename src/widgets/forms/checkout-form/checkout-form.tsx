import React from "react";
import { cn } from "../../../shared/utils";
import { FormContainer, FormInput, FormTextarea } from "../../../shared/components";
import { useChangeFormData, useFormValidation } from "../../../shared/hooks";
import { checkoutFormScheme, CheckoutFormType } from "./checkout-form-scheme.ts";
import { CreateOrderButton } from "../../../features/order";
import { useGetUserInfo } from "../user-info-change-form";

interface Props {
	className?: string;
}

const initialState = {
	name: "",
	phone: "",
	email: "",
	address: "",
	comment: ""
};

export const CheckoutForm: React.FC<Props> = ({ className }) => {
	const { formData, setFormData, changeFormData } = useChangeFormData<CheckoutFormType>(initialState);

	const {
		onSubmit,
		validate,
		errors
	} = useFormValidation<CheckoutFormType>(checkoutFormScheme, formData, onSubmitExtra);

	const { data } = useGetUserInfo<CheckoutFormType>(formData, setFormData);

	function onSubmitExtra() {
		setFormData(initialState);
	}

	return (
		<div className={cn("mb-28", className)}>
			<FormContainer onSubmit={onSubmit} className="grid grid-cols-2 max-w-[900px]">
				<FormInput
					label="Name"
					value={formData.name}
					onChange={changeFormData("name")}
					errorText={errors?.name?._errors.join(", ")}
				/>
				<FormInput
					label="Phone"
					value={formData.phone}
					onChange={changeFormData("phone")}
					errorText={errors?.phone?._errors.join(", ")}
				/>
				<FormInput
					label="Email"
					value={formData.email}
					onChange={changeFormData("email")}
					errorText={errors?.email?._errors.join(", ")}
				/>
				<FormInput
					label="Address"
					value={formData.address}
					onChange={changeFormData("address")}
					errorText={errors?.address?._errors.join(", ")}
				/>
				<FormTextarea
					label="Comment"
					value={formData?.comment || ""}
					onChange={changeFormData("comment")}
					className="col-start-1 col-end-3"
				/>
				<CreateOrderButton
					data={formData}
					requestEnabled={!validate()}
					className="w-full col-start-2 justify-self-end mt-10"
				/>
			</FormContainer>
		</div>
	);
};