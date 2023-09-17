import React from "react";
import NotFoundImg from "../../images/NotFound.jpeg";
import css from "./NotFoundPage.module.scss";

export default function HomePage() {
	return (
		<div>
			<h1 className={css.title}>Sorry page not found</h1>
			<img
				className={css.img}
				src={NotFoundImg}
				alt="Page not found"
			/>
		</div>
	);
}
