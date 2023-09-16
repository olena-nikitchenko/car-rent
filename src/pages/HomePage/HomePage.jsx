import React from "react";
import carHome from "../../images/carHome.jpg";
import css from "./HomePage.module.scss";

export default function HomePage() {
	return (
		<div>
			<h1 className={css.title}>Car rental - find, compare and save</h1>
			<img
				className={css.img}
				src={carHome}
				alt="Cars for rent"
			/>
		</div>
	);
}
