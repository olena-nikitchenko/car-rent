import axios from "axios";

axios.defaults.baseURL = "https://6501ee7b736d26322f5c816f.mockapi.io";

export const getAdverts = async page => {
	const searchParams = new URLSearchParams({
		limit: 8,
		page,
	});
	const { data } = await axios.get(`/adverts?${searchParams}`);

	return data;
};

export const addFavoriteCar = (id, favorites) => {
	axios.put(`/adverts/${id}`, { favorites });
};

export const removeFavoriteCar = (id, favorites) => {
	axios.put(`/adverts/${id}`, { favorites });
};
