import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { favoriteSlice } from "./slices/favoriteSlice";
import { advertsApi } from "./slices/authSlice";

const persistConfig = {
	key: "root",
	storage,
	persist: ["favorite"],
};

const rootReducer = combineReducers({
	[advertsApi.reducerPath]: advertsApi.reducer,
	favorite: favoriteSlice.reducer,
});

const persistUsersReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistUsersReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(advertsApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
