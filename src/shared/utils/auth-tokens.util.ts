import { configTokensNames } from "../config";
import { AuthTokensType } from "../types";

export class AuthTokensUtil {
	static getTokens = () => {
		const tokens = {
			accessToken: localStorage.getItem(configTokensNames.accessToken),
			refreshToken: localStorage.getItem(configTokensNames.refreshToken)
		}
		if (tokens.accessToken && tokens.refreshToken) {
			return tokens;
		}
		return undefined;
	}

	static setTokens = (tokens: AuthTokensType) => {
		localStorage.setItem(configTokensNames.accessToken, tokens.accessToken);
		localStorage.setItem(configTokensNames.refreshToken, tokens.refreshToken);
	}

	static removeTokens = () => {
		localStorage.removeItem(configTokensNames.accessToken);
		localStorage.removeItem(configTokensNames.refreshToken);
	}

	static getRefreshToken = () => {
		return localStorage.getItem(configTokensNames.refreshToken);
	}
}