import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import RentalBtn from "../button/RentalBtn/RentalBtn";
import { MdClose } from "react-icons/md";
import css from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

const toggleBodyOverflow = toggle => {
	if (toggle) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}
};

const Modal = ({
	onClose,
	model,
	make,
	id,
	img,
	year,
	address,
	rentalPrice,
	type,
	functionalities,
	fuelConsumption,
	engineSize,
	description,
	accessories,
	rentalConditions,
	mileage,
}) => {
	useEffect(() => {
		toggleBodyOverflow(true);
		const onKeyDown = event => {
			if (event.code === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			toggleBodyOverflow(false);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose]);

	const onOverlay = event => {
		if (event.currentTarget === event.target) {
			onClose();
		}
	};

	const addressComponents = address.split(", ");
	const locationCity = addressComponents[1];
	const locationCountry = addressComponents[2];
	const rentalConditionsSplitted = rentalConditions.split("\n", 3);
	const initialFunctionality = rentalConditionsSplitted[0];
	const match = initialFunctionality.match(/\d+/);
	const number = parseInt(match[0], 10);

	return createPortal(
		<div
			className={css.backdrop}
			onClick={onOverlay}
		>
			<div className={css.modalBox}>
				<div className={css.contentWrapper}>
					<button
						className={css.btnClose}
						type="button"
						aria-label="close button"
						onClick={onClose}
					>
						<MdClose className={css.closeIcon} /> {/* Иконка */}
					</button>
					<img
						className={css.img}
						src={img}
						alt={make}
					/>
					<div className={css.infoWrapper}>
						<div className={css.mainInfo}>
							<div className={css.carInfo}>
								<p className={css.carText}>{make}</p>
								<p className={css.modelBlue}>
									{model}
									<span style={{ color: "black" }}>,</span>
								</p>
								<p className={css.carText}>{year}</p>
							</div>
						</div>
						<div className={css.secondaryInfo}>
							<p className={css.secondaryCarText}>{locationCity}</p>
							<p className={css.secondaryCarText}>{locationCountry}</p>
							<p className={css.secondaryCarText}>id: {id}</p>
							<p className={css.secondaryCarText}>Year: {year}</p>
							<p className={css.secondaryCarText}>Type: {type}</p>
							<p className={css.secondaryCarText}>Fuel Consumption: {fuelConsumption}</p>
							<p className={css.secondaryCarText}>Engine Size: {engineSize}</p>
						</div>
						<p className={css.descriprion}>{description}</p>
						<div className={css.accessories}>
							<p className={css.accessoriesTitle}>Accessories and functionalities:</p>
							<ul className={css.accessoryList}>
								{accessories.map((accessory, index) => (
									<li
										key={index}
										className={css.accessoryListItem}
									>
										{accessory}
									</li>
								))}
								{functionalities.map((functionality, index) => (
									<li
										key={index}
										className={css.AccessoryListItem}
									>
										{functionality}
									</li>
								))}
							</ul>
						</div>
						<div className={css.rentalBlock}>
							<p className={css.rentalTitle}>Rental Conditions:</p>
							<div className={css.rentalInfo}>
								<p className={css.rentalItem}>
									Minimum age: <span>{number}</span>
								</p>
								<p className={css.rentalItem}>{rentalConditionsSplitted[1]}</p>
								<p className={css.rentalItem}>{rentalConditionsSplitted[2]}</p>
								<p className={css.rentalItem}>
									Mileage: <span>{mileage.toLocaleString("en-EN")}</span>
								</p>
								<p className={css.rentalItem}>
									Price: <span>{rentalPrice}</span>
								</p>
							</div>
						</div>
						<RentalBtn />
					</div>
				</div>
			</div>
		</div>,
		modalRoot,
	);
};

export default Modal;
