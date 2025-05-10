import { DefaultResponseType, UserInfoChangeDataType, UserType } from "../../../shared/types";
import { axiosInstance } from "../../../shared/axios";
import { UserPasswordChangeDataType } from "../../../shared/types";

export const getUserInfo = async (): Promise<UserType> => {
	return axiosInstance.get<UserType>('user/getInfo')
		.then(response => response.data);
}

export const updateUserInfo = async (userData: UserInfoChangeDataType): Promise<DefaultResponseType> => {
	return axiosInstance.patch<DefaultResponseType>('user/changeInfo', userData)
		.then(response => response.data);
}

export const updateUserPassword = async (data: UserPasswordChangeDataType): Promise<DefaultResponseType> => {
	return axiosInstance.patch<DefaultResponseType>('user/changePassword', data)
		.then(response => response.data);
}