import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaHeartbeat } from "react-icons/fa";
import { addToFavoriteList, removeToFavoriteList } from "../../../redux/slices/favoriteSlice";
import LearnMoreBtn from "../../components/button/LearnMoreBtn/LearnMoreBtn";
import Modal from "../modal/modal";
import css from "./CarCard.module.scss";

export default function CarCard({
	id,
	year,
	make,
	model,
	type,
	img,
	description,
	fuelConsumption,
	engineSize,
	accessories,
	functionalities,
	rentalPrice,
	rentalCompany,
	address,
	rentalConditions,
	mileage,
}) {
	const dispatch = useDispatch();
	const favorite = useSelector(state => state.favorite);
	const isFavorite = favorite.includes(id);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const addCarFavorite = () => {
		dispatch(addToFavoriteList(id));
	};
	const removeCarFavorite = () => {
		dispatch(removeToFavoriteList(id));
	};

	const addressComponents = address.split(", ");
	const locationCity = addressComponents[1];
	const locationCountry = addressComponents[2];
	const initialFunctionality = functionalities[0];

	return (
		<div className={css.card}>
			<div className={css.imageBox}>
				<img
					src={img}
					alt={make}
				/>
				<button onClick={isFavorite ? removeCarFavorite : addCarFavorite}>
					{isFavorite ? <FaHeartbeat /> : <FaHeart />}
				</button>
			</div>
			<div className={css.textWrapper}>
				<div className={css.textMain}>
					<div className={css.textDetails}>
						<span className={css.textSpan}>{make}</span>
						<span className={css.textSpan}>
							{model}
							<span className={css.textSpan}>,</span>
						</span>
						<span className={css.textSpan}>{year}</span>
					</div>
					<span className={css.textSpan}>{rentalPrice}</span>
				</div>
				<div className={css.textSecondary}>
					<span className={css.textSpan}>{locationCity}</span>
					<span className={css.textSpan}>{locationCountry}</span>
					<span className={css.textSpan}>{rentalCompany}</span>
					<span className={css.textSpan}>{type}</span>
					<span className={css.textSpan}>{id}</span>
					<span className={css.textSpan}>{initialFunctionality}</span>
				</div>
				<LearnMoreBtn onClick={openModal} />
				{isModalOpen && (
					<Modal
						onClose={closeModal}
						key={id}
						model={model}
						make={make}
						year={year}
						rentalPrice={rentalPrice}
						address={address}
						rentalCompany={rentalCompany}
						functionalities={functionalities}
						id={id}
						type={type}
						img={img}
						fuelConsumption={fuelConsumption}
						engineSize={engineSize}
						description={description}
						accessories={accessories}
						rentalConditions={rentalConditions}
						mileage={mileage}
					/>
				)}
			</div>
		</div>
	);
}

CarCard.propTypes = {
	id: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	make: PropTypes.string.isRequired,
	model: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	fuelConsumption: PropTypes.number.isRequired,
	engineSize: PropTypes.string.isRequired,
	accessories: PropTypes.arrayOf(PropTypes.string).isRequired,
	functionalities: PropTypes.arrayOf(PropTypes.string).isRequired,
	rentalPrice: PropTypes.number.isRequired,
	rentalCompany: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	rentalConditions: PropTypes.string.isRequired,
	mileage: PropTypes.number.isRequired,
};
