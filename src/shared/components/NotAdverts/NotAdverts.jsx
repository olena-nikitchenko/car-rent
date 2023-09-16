import React from "react";
import carsKit from "../../../images/CarsKit.jpg";
import css from "./NotAdverts.module.scss";

export default function NotAdverts() {
	return (
		<div className={css.section}>
			<p className={css.text}>No cars in inventory</p>
			<img
				className={css.img}
				src={carsKit}
				alt="Kit of cars"
			/>
		</div>
	);
}
