import { useEffect } from "react";
import CarCard from "../../components/CarCard/CarCard";
import css from "./CarList.module.scss";

export default function CarsList({ adverts }) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	console.log(adverts);

	return (
		<section className={css.section}>
			{Array.isArray(adverts) && adverts.length !== 0 && (
				<ul className={css.carList}>
					{adverts?.map(advert => (
						<CarCard
							key={advert.id}
							id={advert.id}
							year={advert.year}
							make={advert.make}
							model={advert.model}
							type={advert.type}
							img={advert.img}
							description={advert.description}
							fuelConsumption={advert.fuelConsumption}
							engineSize={advert.engineSize}
							accessories={advert.accessories}
							functionalities={advert.functionalities}
							rentalPrice={advert.rentalPrice}
							rentalCompany={advert.rentalCompany}
							address={advert.address}
							rentalConditions={advert.rentalConditions}
							mileage={advert.mileage}
							isFavorite={advert.isFavorite}
						/>
					))}
				</ul>
			)}
		</section>
	);
}
