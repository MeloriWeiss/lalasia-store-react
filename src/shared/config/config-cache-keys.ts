export const configCacheKeys = {
	auth: {
		signup: ["auth", "signup"],
		login: ["auth", "login"],
		logout: ["auth", "logout"]
	},
	products: {
		products: ["products", "products"],
		product: (id: string) => ["product", id],
	},
	cart: {
		cart: ["cart", "cart"],
		updateProductCountInCart: ["cart", "updateProductCountInCart"],
		removeProductFromCart: ["cart", "removeProductFromCart"],
		addToCart: ["cart", "addToCart"],
	},
	orders: {
		orders: ["orders", "orders"],
		createOrder: ["orders", "createOrder"],
	},
	user: {
		userInfo: ["user", "userInfo"],
		updateUserInfo: ["user", "updateUserInfo"],
		updateUserPassword: ["user", "updateUserPassword"],
	},
};