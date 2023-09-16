import React from "react";
import { useSelector } from "react-redux";
import AvertsSearch from "../../../src/shared/components/AvertsSearh/AvertsSearch";

export default function FavoritePage({ data }) {
	const favorite = useSelector(state => state.favorite);
	const favoriteCars = data.filter(advert => favorite.includes(advert.id));
	return (
		<>
			<AvertsSearch data={favoriteCars} />
		</>
	);
}
