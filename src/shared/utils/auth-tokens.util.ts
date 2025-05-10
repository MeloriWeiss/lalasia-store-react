import { configTokensNames } from "../config";
import { AuthTokensType } from "../types";

export class AuthTokensUtil {
	static setTokens = (tokens: AuthTokensType) => {
		localStorage.setItem(configTokensNames.accessToken, tokens.accessToken);
		localStorage.setItem(configTokensNames.refreshToken, tokens.refreshToken);
	}

	static setAccessToken = (accessToken: string) => {
		localStorage.setItem(configTokensNames.accessToken, accessToken);
	}

	static setRefreshToken = (refreshToken: string) => {
		localStorage.setItem(configTokensNames.accessToken, refreshToken);
	}

	static getTokens = () => {
		return {
			accessToken: localStorage.getItem(configTokensNames.accessToken),
			refreshToken: localStorage.getItem(configTokensNames.refreshToken)
		}
	}

	static getAccessToken = () => {
		return localStorage.getItem(configTokensNames.accessToken);
	}

	static getRefreshToken = () => {
		return localStorage.getItem(configTokensNames.refreshToken);
	}

	static removeTokens = () => {
		localStorage.removeItem(configTokensNames.accessToken);
		localStorage.removeItem(configTokensNames.refreshToken);
	}
}