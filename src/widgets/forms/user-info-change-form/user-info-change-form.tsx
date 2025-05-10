import React from "react";
import { Button, FormContainer, FormInput } from "../../../shared/components";
import { userInfoChangeFormScheme, UserInfoChangeFormType } from "./user-info-change-form-scheme.ts";
import { ChangeUserInfoButton } from "../../../features/user/change-user-info-button.tsx";
import { UserInfoChangeDataType } from "../../../shared/types";
import { useGetUserInfo } from "./use-get-user-info.ts";
import { useChangeFormData, useFormValidation } from "../../../shared/hooks";

interface Props {
	className?: string;
}

export const UserInfoChangeForm: React.FC<Props> = ({ className }) => {

	const {formData, setFormData, changeFormData} = useChangeFormData<UserInfoChangeFormType>({
		name: "",
		email: "",
		phone: ""
	});

	const { onSubmit, validate, errors } = useFormValidation<UserInfoChangeFormType>(userInfoChangeFormScheme, formData);

	const { data, refetch } = useGetUserInfo<UserInfoChangeFormType>(formData, setFormData);

	const resetForm = () => {
		refetch();
		setFormData({
			name: data?.name || "",
			email: data?.email || "",
			phone: data?.phone || ""
		});
	};

	const createRequestData = () => {
		const requestDataObject: UserInfoChangeDataType = {};
		data?.name !== formData.name ? requestDataObject.name = formData.name : undefined;
		data?.email !== formData.email ? requestDataObject.email = formData.email : undefined;
		data?.phone !== formData.phone ? requestDataObject.phone = formData.phone : undefined;
		return requestDataObject;
	};

	return (
		<FormContainer onSubmit={onSubmit} formTitle="Personal information" className={className}>
			<FormInput
				value={formData.name}
				onChange={changeFormData("name")}
				label="Your name"
				errorText={errors?.name?._errors.join(", ")}
			/>
			<FormInput
				value={formData.email}
				onChange={changeFormData("email")}
				label="Email"
				errorText={errors?.email?._errors.join(", ")}
			/>
			<FormInput
				value={formData.phone}
				onChange={changeFormData("phone")}
				label="Phone"
				errorText={errors?.phone?._errors.join(", ")}
			/>
			<div className="flex justify-between items-center mt-4">
				<Button
					onClick={() => (Object.keys(createRequestData()).length > 0 ? resetForm() : undefined)}
					type="button"
					variant="outline"
					className="h-12 w-30 border-none">
					Cancel
				</Button>
				<ChangeUserInfoButton
					className="h-12 w-30"
					data={createRequestData()}
					requestEnabled={!validate() && Object.keys(createRequestData()).length > 0}
				/>
			</div>
		</FormContainer>
	);
};