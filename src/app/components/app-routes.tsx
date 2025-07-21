import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { configRoutes } from "../../shared/config";
import { NotFound } from "../../widgets";
import {
	Admin,
	Cart,
	Checkout,
	Layout,
	Login,
	Main,
	Orders,
	Product,
	ProfileInfo,
	ProfileLayout,
	Signup
} from "../../pages";
import { useSelector } from "react-redux";
import { RootState } from "./../store/store.ts";
import { GoBack } from "../../shared/components";

export const AppRoutes: React.FC = () => {
	const authorized = useSelector((state: RootState) => state.auth.authorized);

	return (
		<Routes>
			<Route path={configRoutes.main.mask} element={<Layout />}>
				<Route path={configRoutes.signup.mask} element={authorized ? <GoBack /> : <Signup />} />
				<Route path={configRoutes.login.mask} element={authorized ? <GoBack /> : <Login />} />
				<Route index element={<Main />} />
				<Route path={configRoutes.product.mask} element={<Product />} />
				<Route path={configRoutes.profile.mask}
							 element={authorized ? <ProfileLayout /> : <Navigate to={configRoutes.login.mask} />}>
					<Route path={configRoutes.profile.children.info.mask} element={<ProfileInfo />} />
					<Route path={configRoutes.profile.children.orders.mask} element={<Orders />} />
				</Route>
				<Route path={configRoutes.cart.mask}
							 element={authorized ? <Cart /> : <Navigate to={configRoutes.login.mask} />} />
				<Route path={configRoutes.checkout.mask}
							 element={authorized ? <Checkout /> : <Navigate to={configRoutes.login.mask} />} />
				<Route path={configRoutes.admin.mask}
							 element={authorized ? <Admin /> : <Navigate to={configRoutes.main.mask} />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};