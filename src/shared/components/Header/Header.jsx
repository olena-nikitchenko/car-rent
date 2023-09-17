import Navigation from "../../components/Navigation/Navigation";
import css from "./Header.module.scss";

export default function Header() {
	return (
		<div className={css.header}>
			<Navigation />
		</div>
	);
}
