import React from "react";

interface Props {
	className?: string;
}

export const NotFound: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>Page not found</div>
	);
};