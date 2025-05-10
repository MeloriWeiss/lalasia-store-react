import { axiosInstance } from "../../../shared/axios";
import { AuthTokensType, DefaultResponseType } from "../../../shared/types";
import { LoginFormType, SignupFormType } from "../../../widgets";

export const refresh = async (refreshToken: string): Promise<AuthTokensType> => {
	const config = {
		headers: {
			Authorization: `Bearer ${refreshToken}`
		}
	};
	return axiosInstance.post<AuthTokensType>("auth/refresh", {}, config)
		.then(response => response.data);
};

export const login = async (formData: LoginFormType): Promise<AuthTokensType> => {
	return axiosInstance.post<AuthTokensType>("auth/login", formData)
		.then(response => response.data);
};

export const signup = async (formData: SignupFormType): Promise<AuthTokensType> => {
	return axiosInstance.post<AuthTokensType>("auth/signup", formData)
		.then(response => response.data);
};

export const logout = async (): Promise<DefaultResponseType> => {
	return axiosInstance.post<DefaultResponseType>('auth/logout')
		.then(response => response.data);
}