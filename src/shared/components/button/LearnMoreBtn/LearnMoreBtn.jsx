import React from "react";
import PropTypes from "prop-types";
import css from "./LearnMoreBtn.module.scss";

export default function LearnMoreBtn({ onClick }) {
	return (
		<button
			className={css.learnMoreBtn}
			onClick={onClick}
		>
			Learn more
		</button>
	);
}

LearnMoreBtn.propTypes = {
	onClick: PropTypes.func.isRequired,
};
