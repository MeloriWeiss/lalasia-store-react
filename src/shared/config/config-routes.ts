export const configRoutes = {
	main: {
		mask: "/",
		create: () => "/"
	},
	login: {
		mask: "/login",
		create: () => "/login"
	},
	signup: {
		mask: "/signup",
		create: () => "/signup"
	},
	profile: {
		mask: "/profile",
		create: () => "/profile",
		children: {
			info: {
				mask: "/profile/info",
				create: () => "/profile/info"
			},
			orders: {
				mask: "/profile/orders",
				create: () => "/profile/orders"
			}
		}
	},
	product: {
		mask: "/product/:id",
		create: (id: string) => `/product/${id}`
	},
	cart: {
		mask: "/cart",
		create: () => "/cart"
	},
	checkout: {
		mask: "/checkout",
		create: () => "/checkout"
	},
	admin: {
		mask: "/admin",
		create: () => "/admin"
	}
};