import React from "react";
import { Providers } from "./providers.tsx";
import { InitStore } from "./init-store.tsx";
import { AppRoutes } from "./app-routes.tsx";

export const App: React.FC = () => {
	return (
		<Providers>
			<InitStore>
				<AppRoutes/>
			</InitStore>
		</Providers>
	);
};