import React, { PropsWithChildren, StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./../store/store.ts";
import { Toaster } from "react-hot-toast";
import { queryClientOptions } from "../config";

const queryClient = new QueryClient(queryClientOptions);

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<StrictMode>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						{children}
					</BrowserRouter>
					<Toaster toastOptions={{ duration: 4000 }} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</StrictMode>
	);
};