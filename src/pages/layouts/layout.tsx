import { Outlet } from "react-router";
import { Container } from "../../shared/components";
import { Header } from "../../widgets";

export const Layout = () => {
	return (
		<main className="min-h-screen bg-background">
			<Header />
			<Container className="py-24">
				<Outlet />
			</Container>
		</main>
	)
}