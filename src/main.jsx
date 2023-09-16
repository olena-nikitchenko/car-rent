import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./shared/components/App";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate
			loading={null}
			persistor={persistor}
		>
			<BrowserRouter basename="/task-test">
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
);
