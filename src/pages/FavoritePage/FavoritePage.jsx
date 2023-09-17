import React from "react";
import { useSelector } from "react-redux";
import AdvertsSearch from "../../../src/shared/components/AdvertsSearh/AdvertsSearch";

export default function FavoritePage({ data }) {
	const favorite = useSelector(state => state.favorite);
	const favoriteCars = data.filter(advert => favorite.includes(advert.id));
	return (
		<>
			<AdvertsSearch data={favoriteCars} />
		</>
	);
}
