export const configCacheKeys = {
	auth: {
		signup: ["auth", "signup"],
		login: ["auth", "login"],
		logout: ["auth", "logout"],
		userRoles: ["auth", "userRoles"]
	},
	products: {
		products: ["products", "products"],
		product: (id: string) => ["product", id]
	},
	cart: {
		cart: ["cart", "cart"],
		updateProductCountInCart: ["cart", "updateProductCountInCart"],
		removeProductFromCart: ["cart", "removeProductFromCart"],
		addToCart: ["cart", "addToCart"]
	},
	orders: {
		orders: ["orders", "orders"],
		allOrders: ["orders", "allOrders"],
		createOrder: ["orders", "createOrder"],
		changeStatus: ["orders", "changeStatus"]
	},
	user: {
		userInfo: ["user", "userInfo"],
		updateUserInfo: ["user", "updateUserInfo"],
		updateUserPassword: ["user", "updateUserPassword"]
	}
};