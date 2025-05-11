import React from "react";
import { Button } from "../../shared/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configCacheKeys } from "../../shared/config";
import { updateUserInfo } from "../../entities";
import toast from "react-hot-toast";
import { UserInfoChangeDataType } from "../../shared/types";

interface Props {
	data: UserInfoChangeDataType;
	requestEnabled: boolean;
	className?: string;
}

export const ChangeUserInfoButton: React.FC<Props> = (
	{
		data,
		requestEnabled,
		className
	}
) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: configCacheKeys.user.updateUserInfo,
		mutationFn: () => updateUserInfo(data),
		onSuccess: (response) => {
			toast.success(response.message);
			queryClient.invalidateQueries({ queryKey: configCacheKeys.user.userInfo }).then();
		},
		onError: (error) => {
			toast.error(error.response?.data.message);
		}
	});

	return (
		<Button onClick={requestEnabled ? mutation.mutate : undefined} className={className}>Save</Button>
	);
};