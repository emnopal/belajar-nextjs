import { clsx } from "clsx";
import styles from "./styles/alert.module.scss";

/*
add css as variable
eg. import styles from "./alert.module.css"

this will import all css rule
so if u want to call the rule named success
just call styles.success
*/

export default function Alert({ children, type }) {
	return (
		<div
			className={clsx({
				[styles.success]: type === "success",
				[styles.error]: type === "error",
				[styles.warn]: type === "warn" || type === "warning",
			})}
		>
			{children}
		</div>
	);
}
