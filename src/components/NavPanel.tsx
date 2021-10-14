import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { Link } from "react-router-dom";

export default function NavPanel(): JSX.Element{
	return (
		<div>
			<Link to="/">
				<button type="button">Main page</button>
			</Link>
			<Link to="/about">
				<button type="button">About me</button>
			</Link>
		</div>
	);
}
