import React from "react";
import { loginFormScheme, LoginFormType } from "./login-form-scheme.ts";
import { Button, FormInput, FormContainer } from "../../../shared/components";
import { Link, useNavigate } from "react-router";
import { configCacheKeys, configRoutes } from "../../../shared/config";
import { login } from "../../../entities";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AuthTokensUtil } from "../../../shared/utils";
import { setTokens } from "../../../features";
import { useChangeFormData, useFormValidation } from "../../../shared/hooks";
import { useMutation } from "@tanstack/react-query";

interface Props {
	className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const mutation = useMutation({
		mutationKey: configCacheKeys.auth.login,
		mutationFn: () => login(formData),
		onSuccess: (loginResult) => {
			AuthTokensUtil.setTokens(loginResult);
			dispatch(setTokens(loginResult));

			toast.success("You have successfully logged in");
			navigate(configRoutes.main.mask);
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		}
	});

	const { formData, changeFormData } = useChangeFormData<LoginFormType>({
		email: "",
		password: ""
	});

	const { onSubmit, errors } = useFormValidation<LoginFormType>(loginFormScheme, formData, mutation.mutate);

	return (
		<FormContainer formTitle="Authorization" onSubmit={onSubmit} className={className}>
			<FormInput
				value={formData.email}
				onChange={changeFormData("email")}
				label="Email"
				errorText={errors?.email?._errors.join(", ")}
			/>
			<FormInput
				value={formData.password}
				onChange={changeFormData("password")}
				label="Password"
				type="password"
				errorText={errors?.password?._errors.join(", ")}
			/>
			<div className="flex justify-between items-center mt-4">
				<div>
					Don't have an account yet?
					<Link to={configRoutes.signup.mask} className="ml-2 underline">Register</Link>
				</div>
				<Button className="h-12 w-30">Войти</Button>
			</div>
		</FormContainer>
	);
};