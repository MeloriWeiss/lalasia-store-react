import React from "react";
import { SignupForm } from "../widgets/forms/signup-form/signup-form.tsx";

interface Props {
	className?: string;
}

export const Signup: React.FC<Props> = ({ className }) => {
	return (
		<SignupForm className="mt-4" />
	);
};