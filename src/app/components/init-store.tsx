import React, { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import { AuthTokensUtil } from "../../shared/utils";
import { setTokens } from "../../features";

export const InitStore: React.FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useDispatch();

	const tokens = AuthTokensUtil.getTokens();
	if (tokens.accessToken && tokens.refreshToken) {
		dispatch(setTokens(tokens));
	}

	return children;
};