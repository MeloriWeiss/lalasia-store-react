import React from "react";
import { signupFormScheme, SignupFormType } from "./signup-form-scheme.ts";
import { Button, FormContainer, FormInput } from "../../../shared/components";
import { Link, useNavigate } from "react-router";
import { configCacheKeys, configRoutes } from "../../../shared/config";
import toast from "react-hot-toast";
import { setTokens } from "../../../features";
import { useDispatch } from "react-redux";
import { signup } from "../../../entities";
import { AuthTokensUtil } from "../../../shared/utils";
import { useChangeFormData, useFormValidation } from "../../../shared/hooks";
import { useMutation } from "@tanstack/react-query";

interface Props {
	className?: string;
}

export const SignupForm: React.FC<Props> = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const mutation = useMutation({
		mutationKey: configCacheKeys.auth.signup,
		mutationFn: () => signup(formData),
		onSuccess: (signupResult) => {
			AuthTokensUtil.setTokens(signupResult);
			dispatch(setTokens(signupResult));

			toast.success("You have successfully registered");
			navigate(configRoutes.main.mask);
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		}
	});

	const { formData, changeFormData } = useChangeFormData<SignupFormType>({
		email: "",
		name: "",
		password: "",
		passwordRepeat: ""
	});

	const { onSubmit, errors } = useFormValidation<SignupFormType>(signupFormScheme, formData, mutation.mutate);

	return (
		<FormContainer formTitle="Registration" onSubmit={onSubmit} className={className}>
			<FormInput
				value={formData.email}
				onChange={changeFormData("email")}
				label="Email"
				errorText={errors?.email?._errors.join(", ")}
			/>
			<FormInput
				value={formData.name}
				onChange={changeFormData("name")}
				label="Name"
				errorText={errors?.name?._errors.join(", ")}
			/>
			<FormInput
				value={formData.password}
				onChange={changeFormData("password")}
				label="Password"
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
			<div className="flex justify-between items-center mt-4">
				<div>
					Already have an account?
					<Link to={configRoutes.login.mask} className="ml-2 underline">Sign in</Link>
				</div>
				<Button className="h-12">Register</Button>
			</div>
		</FormContainer>
	);
};