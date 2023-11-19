import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const advertsApi = createApi({
	reducerPath: "adverts",
	baseQuery: fetchBaseQuery({ baseUrl: "https://6504c330c8869921ae2568bc.mockapi.io/" }),
	tagTypes: ["adverts"],
	endpoints: builder => ({
		getAdverts: builder.query({
			query: () => {
				return "adverts";
			},
			providesTags: ["adverts"],
		}),
	}),
});

export const { useGetAdvertsQuery } = advertsApi;
