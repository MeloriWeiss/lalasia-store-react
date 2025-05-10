import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys, configRoutes } from "../../shared/config";
import { logout } from "../../entities";
import toast from "react-hot-toast";
import { AuthTokensUtil, cn } from "../../shared/utils";
import { removeTokens } from "./auth-slice.ts";

interface Props {
	text: string;
	className?: string;
}

export const LogoutButton: React.FC<Props> = ({ text, className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.auth.logout,
		mutationFn: logout,
		onSuccess: (response) => {
			toast.success(response.message);
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		},
		onSettled: async () => {
			AuthTokensUtil.removeTokens();
			dispatch(removeTokens());

			queryClient.clear();
			navigate(configRoutes.login.mask);
		}
	});

	return (
		<div onClick={mutation.mutate} className={cn("w-full", className)}>
			{text}
		</div>
	);
};