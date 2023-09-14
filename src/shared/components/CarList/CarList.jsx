import PropTypes from "prop-types";
import { useEffect } from "react";
import CarCard from "../../components/CarCard/CarCard";
import css from "./CarList.module.scss";

export default function CarsList({ adverts }) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

CarsList.propTypes = {
	adverts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			year: PropTypes.number.isRequired,
			make: PropTypes.string.isRequired,
			model: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			img: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			fuelConsumption: PropTypes.number.isRequired,
			engineSize: PropTypes.number.isRequired,
			accessories: PropTypes.arrayOf(PropTypes.string).isRequired,
			functionalities: PropTypes.arrayOf(PropTypes.string).isRequired,
			rentalPrice: PropTypes.number.isRequired,
			rentalCompany: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			rentalConditions: PropTypes.string.isRequired,
			mileage: PropTypes.number.isRequired,
			isFavorite: PropTypes.bool.isRequired,
		}),
	).isRequired,
};
