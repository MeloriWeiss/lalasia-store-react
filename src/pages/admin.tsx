import React from "react";
import { OrdersList } from "../widgets";
import { configUserRoles } from "../shared/config";
import { useCheckUserRole } from "../entities";

interface Props {
	className?: string;
}

export const Admin: React.FC<Props> = ({ className }) => {

	const hasRole = useCheckUserRole(configUserRoles.admin);

	return (
		<>
			{hasRole &&
				<OrdersList isAdmin={true} className={className} />
			}
		</>
	);
};