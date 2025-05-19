import React from "react";
import { Providers } from "./providers.tsx";
import { InitApp } from "./init-app.tsx";
import { AppRoutes } from "./app-routes.tsx";

export const App: React.FC = () => {
	return (
		<Providers>
			<InitApp>
				<AppRoutes/>
			</InitApp>
		</Providers>
	);
};