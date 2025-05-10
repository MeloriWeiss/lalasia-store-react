import React from "react";
import { Link } from "react-router";
import { cn } from "../../shared/utils";
import { Container, ProfileDropdown } from "../../shared/components";
import { ShoppingCart, User } from "lucide-react";
import { configRoutes } from "../../shared/config";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	const authorized = useSelector((state: RootState) => state.auth.authorized);

	return (
		<div className={cn("py-6 bg-white", className)}>
			<Container className="flex justify-between items-center">
				<Link to={configRoutes.main.mask}>
					<img src="/src/shared/images/common/logo.png" alt="Логотип" className="w-[130px]" />
				</Link>
				<div className="flex items-center gap-5">
					<Link to={configRoutes.cart.mask}>
						<ShoppingCart width={30} height={30} />
					</Link>
					{authorized
						?
						<ProfileDropdown />
						:
						<Link to={configRoutes.login.mask}>
							<User width={30} height={30} />
						</Link>
					}
				</div>
			</Container>
		</div>
	);
};