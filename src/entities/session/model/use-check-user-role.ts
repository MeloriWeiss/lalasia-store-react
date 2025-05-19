import { useQuery } from "@tanstack/react-query";
import { configCacheKeys, configUserRoles } from "../../../shared/config";
import { getUserRoles } from "./auth.service.ts";
import { useNavigate } from "react-router";

export const useCheckUserRole = (role: string) => {

	const navigate = useNavigate();

	const { data, isSuccess } = useQuery({
		queryKey: configCacheKeys.auth.userRoles,
		queryFn: getUserRoles
	});

	const hasRole = isSuccess && data?.includes(configUserRoles[role.toLowerCase()]);

	if (isSuccess && !hasRole) {
		navigate(-1);
	}

	return hasRole;
}