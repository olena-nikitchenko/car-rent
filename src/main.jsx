import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./shared/components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter basename="/task-test">
		<App />
	</BrowserRouter>,
);
