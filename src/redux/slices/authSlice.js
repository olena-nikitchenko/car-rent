import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const advertsApi = createApi({
	reducerPath: "adverts",
	baseQuery: fetchBaseQuery({ baseUrl: "https://6501ee7b736d26322f5c816f.mockapi.io/api" }),
	tagTypes: ["adverts"],
	endpoints: builder => ({
		getAdverts: builder.query({
			query: ({ error, page }) => {
				return `adverts?error=${error}&page=${page}`;
			},
			providesTags: ["adverts"],
		}),
	}),
});

export const { useGetAdvertsQuery } = advertsApi;
