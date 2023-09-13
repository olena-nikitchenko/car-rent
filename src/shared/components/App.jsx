import { Navigate, Route, Routes } from "react-router-dom";
// import { routes } from "../routes";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import FavoritesPage from "../../pages/FavoritePage/FavoritePage";

export default function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			>
				<Route
					path="/catalog"
					element={<CatalogPage />}
				/>
				<Route
					path="/favorites"
					element={<FavoritesPage />}
				/>
			</Route>
			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
}
