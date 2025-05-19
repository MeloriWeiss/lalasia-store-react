import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthTokensType } from "../../shared/types";

export interface AuthState {
	accessToken: string;
	refreshToken: string;
	authorized: boolean;
}

const initialState: AuthState = {
	accessToken: "",
	refreshToken: "",
	authorized: false
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setTokens: (state, action: PayloadAction<AuthTokensType>) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.authorized = true;
		},
		removeTokens: (state) => {
			state.accessToken = "";
			state.refreshToken = "";
			state.authorized = false;
		}
	}
});

export const {
	setTokens,
	removeTokens
} = authSlice.actions;

export const authReducer = authSlice.reducer;