import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { addToFavoriteList, removeToFavoriteList } from "../../../redux/slices/favoriteSlice";
import LoadMoreBtn from "../button/LearnMoreBtn/LearnMoreBtn";
import Modal from "../modal/Modal";
import defaultCarImage from "../../../images/defaultCar.png";
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
					className={css.img}
					src={img || defaultCarImage}
					alt={make}
				/>
				<button
					className={css.btn}
					onClick={isFavorite ? removeCarFavorite : addCarFavorite}
				>
					{isFavorite ? (
						<FaHeart
							size={18}
							style={{ color: "#3470FF" }}
						/>
					) : (
						<FiHeart
							size={18}
							style={{ color: "rgba(255, 255, 255, 0.8)" }}
						/>
					)}
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
				<div className={css.loadMoreWrapper}>
					<LoadMoreBtn onClick={openModal} />
				</div>

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
