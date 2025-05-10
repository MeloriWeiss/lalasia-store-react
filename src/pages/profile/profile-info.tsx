import React from "react";
import { UserInfoChangeForm, UserPasswordChangeForm } from "../../widgets";

interface Props {
	className?: string;
}

export const ProfileInfo: React.FC<Props> = ({ className }) => {
	return (
		<div>
			<UserInfoChangeForm className="mb-20" />
			<UserPasswordChangeForm />
		</div>
	);
};