import React from "react";
import carsKit from "../../../images/CarsKit.jpg";
import css from "./NotAdverts.module.scss";

export default function NotAdverts() {
	return (
		<div>
			<h1 className={css.title}>No cars in inventory</h1>
			<img
				className={css.img}
				src={carsKit}
				alt="Kit of cars"
			/>
		</div>
	);
}
