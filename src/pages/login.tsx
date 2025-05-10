import React from "react";
import { LoginForm } from "../widgets";

interface Props {
	className?: string;
}

export const Login: React.FC<Props> = ({ className }) => {
	return (
		<LoginForm className="mt-28" />
	);
};