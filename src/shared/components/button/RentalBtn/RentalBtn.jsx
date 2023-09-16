import React from "react";
import css from "./RentalBtn.module.scss";

export default function RentalBtn() {
	return (
		<a
			className={css.rentalBtn}
			href="tel:+380730000000"
		>
			Rental car
		</a>
	);
}
