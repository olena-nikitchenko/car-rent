import { Route, Routes } from "react-router-dom";
import { useGetAdvertsQuery } from "../../redux/slices/authSlice";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import FavoritesPage from "../../pages/FavoritePage/FavoritePage";
import Header from "../components/Header/Header";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

export default function App() {
	const { data } = useGetAdvertsQuery();
	if (!data) return <div>Loading...</div>;
	return (
		<div>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/catalog"
					element={<CatalogPage data={data} />}
				/>
				<Route
					path="/favorites"
					element={<FavoritesPage data={data} />}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
		</div>
	);
}
