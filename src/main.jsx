// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import ReactDOM from "react-dom/client";
// import HomePage from "./pages/HomePage/HomePage";
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
// import FavoritesPage from "./pages/FavoritePage/FavoritePage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<Router>
// 			<Route
// 				path="/"
// 				exact
// 				component={HomePage}
// 			/>
// 			<Route
// 				path="/catalog"
// 				component={CatalogPage}
// 			/>
// 			<Route
// 				path="/favorites"
// 				component={FavoritesPage}
// 			/>
// 			<Route
// 				path="*"
// 				component={NotFoundPage}
// 			/>
// 		</Router>
// 	</React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./shared/components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <BrowserRouter basename="/task-test">
	<BrowserRouter basename="/task-test">
		<App />
	</BrowserRouter>,
);
