import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
	name: "favorite",
	initialState: [],
	reducers: {
		addToFavoriteList: (state, action) => {
			state.push(action.payload);
		},
		removeToFavoriteList: (state, action) => {
			return state.filter(item => item !== action.payload);
		},
	},
});

export const { addToFavoriteList, removeToFavoriteList } = favoriteSlice.actions;

export default favoriteSlice.reducer;
