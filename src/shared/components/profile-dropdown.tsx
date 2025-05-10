import React from "react";
import { Dropdown } from "./ui";
import { User } from "lucide-react";
import { Link } from "react-router";
import { configRoutes } from "../config";
import { LogoutButton } from "../../features";

interface Props {
	className?: string;
}

export const ProfileDropdown: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Dropdown.DropdownMenu>
				<Dropdown.DropdownMenuTrigger className="flex justify-center items-center">
					<User width={30} height={30} />
				</Dropdown.DropdownMenuTrigger>
				<Dropdown.DropdownMenuContent>
					<Link to={configRoutes.profile.children.info.mask}>
						<Dropdown.DropdownMenuItem className="text-lg">
							Profile
						</Dropdown.DropdownMenuItem>
					</Link>
					<Dropdown.DropdownMenuItem className="text-lg">
						<LogoutButton text="Exit" />
					</Dropdown.DropdownMenuItem>
				</Dropdown.DropdownMenuContent>
			</Dropdown.DropdownMenu>
		</div>
	);
};