import React, { useState } from "react";
import { Button, FormContainer, FormInput } from "../../../shared/components";
import { userPasswordChangeFormScheme, UserPasswordChangeFormType } from "./user-password-change-form-scheme.ts";
import { useChangeFormData, useFormValidation } from "../../../shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import { updateUserPassword } from "../../../entities";
import toast from "react-hot-toast";

interface Props {
	className?: string;
}

const initialState = {
	oldPassword: "",
	password: "",
	passwordRepeat: ""
};

export const UserPasswordChangeForm: React.FC<Props> = ({ className }) => {
	const mutation = useMutation({
		mutationKey: configCacheKeys.user.updateUserPassword,
		mutationFn: () => updateUserPassword(formData),
		onSuccess: (response) => {
			toast.success(response.message);
			setFormData(initialState);
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		}
	});

	const {
		formData,
		setFormData,
		changeFormData
	} = useChangeFormData<UserPasswordChangeFormType>(initialState);

	const {
		onSubmit,
		setHasValidationErrors,
		errors
	} = useFormValidation<UserPasswordChangeFormType>(userPasswordChangeFormScheme, formData, onSubmitExtra);

	function onSubmitExtra() {
		if (formData.oldPassword !== formData.password) {
			mutation.mutate();
			setHasValidationErrors(false);
			return;
		}
		toast.error('The new and old passwords must not match');
	}

	return (
		<FormContainer onSubmit={onSubmit} formTitle="Password change" className={className}>
			<FormInput
				value={formData.oldPassword}
				onChange={changeFormData("oldPassword")}
				label="Old password"
				type="password"
				errorText={errors?.oldPassword?._errors.join(", ")}
			/>
			<FormInput
				value={formData.password}
				onChange={changeFormData("password")}
				label="New password"
				type="password"
				errorText={errors?.password?._errors.join(", ")}
			/>
			<FormInput
				value={formData.passwordRepeat}
				onChange={changeFormData("passwordRepeat")}
				label="Repeat the password"
				type="password"
				errorText={errors?.passwordRepeat?._errors.join(", ")}
			/>
			<div className="flex justify-end items-center mt-4">
				<Button className="h-12 w-30">Save</Button>
			</div>
		</FormContainer>
	);
};