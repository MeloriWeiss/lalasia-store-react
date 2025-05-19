import axios from "axios";
import { refresh } from "../../entities";
import { AuthTokensUtil } from "../utils";
import { store } from "../../app/store/store.ts";
import { removeTokens, setTokens } from "../../features";
import { configEnvironment, configRoutes } from "../config";

export const axiosInstance = axios.create({
	baseURL: configEnvironment.baseUrl
});

axiosInstance.interceptors.request.use(
	config => {
		if (config.url.includes("refresh")) {
			return config;
		}
		const token = store.getState().auth.accessToken;
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	async (error) => {
		const request = error.config;

		if (error.response.status === 401) {
			if (request.url.includes("/refresh")) {
				AuthTokensUtil.removeTokens();
				store.dispatch(removeTokens());

				window.location.href = configRoutes.login.mask;
				return Promise.reject(error);
			}

			try {
				const refreshToken = AuthTokensUtil.getRefreshToken();
				if (!refreshToken) {
					return Promise.reject(error);
				}
				const refreshResult = await refresh(refreshToken);

				if (refreshResult.accessToken && refreshResult.refreshToken) {
					AuthTokensUtil.setTokens(refreshResult);
					store.dispatch(setTokens(refreshResult));
				}

				request.headers["Authorization"] = `Bearer ${refreshResult.accessToken}`;
				return axiosInstance(request);

			} catch (error) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);