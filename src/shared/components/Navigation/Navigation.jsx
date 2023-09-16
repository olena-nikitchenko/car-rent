import { Link } from "react-router-dom";
import css from "./Navigation.module.scss";

export default function Navigation() {
	return (
		<div className={css.nav}>
			<ul className={css.navList}>
				<li className={css.navListItem}>
					<Link
						to="/"
						className={css.navLink}
					>
						Home
					</Link>
				</li>
				<li className={css.navListItem}>
					<Link
						to="/catalog"
						className={css.navLink}
					>
						Catalogue
					</Link>
				</li>
				<li className={css.navListItem}>
					<Link
						to="/favorites"
						className={css.navLink}
					>
						Favorites
					</Link>
				</li>
			</ul>
		</div>
	);
}
