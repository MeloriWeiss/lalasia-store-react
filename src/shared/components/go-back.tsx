import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

interface Props {
	className?: string;
}

export const GoBack: React.FC<Props> = ({ className }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname !== '/') {
			navigate(-1);
		}
	}, []);
	return <></>;
};