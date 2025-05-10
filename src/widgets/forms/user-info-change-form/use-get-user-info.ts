import { useQuery } from "@tanstack/react-query";
import { configCacheKeys } from "../../../shared/config";
import { getUserInfo } from "../../../entities";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { UserInfoChangeFormType } from "./user-info-change-form-scheme.ts";

export const useGetUserInfo = <T>(formData: T, setFormData: React.Dispatch<React.SetStateAction<UserInfoChangeFormType>>) => {
	const { data, error, isSuccess, refetch } = useQuery({
		queryKey: configCacheKeys.user.userInfo,
		queryFn: getUserInfo
	});

	useEffect(() => {
		if (isSuccess) {
			setFormData({
				...formData,
				name: data!.name,
				email: data!.email,
				phone: data!.phone
			});
		}
		if (error) {
			toast.error(error.response.data.message);
		}
	}, [isSuccess, error]);

	return {
		data,
		refetch
	}
}