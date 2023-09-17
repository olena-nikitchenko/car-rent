import React from "react";
import PropTypes from "prop-types";
import css from "./LoadMoreBtn.module.scss";

export default function LoardMoreBtn({ onClick }) {
	return (
		<button
			className={css.loadMoreBtn}
			onClick={onClick}
		>
			Loard more
		</button>
	);
}

LoardMoreBtn.propTypes = {
	onClick: PropTypes.func.isRequired,
};
