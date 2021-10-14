import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { Link } from "react-router-dom";

type MovieProps = {
	Poster: string;
	Title: string;
	Type: string;
	imdbID: string;
};

export default function MovieCard({ Poster, Title, Type, imdbID }: MovieProps): JSX.Element {
	return (
		<Link to={`/${imdbID}`}>
			<div>
				<div key={imdbID}>
					<h1>{Title}</h1>
					<h2>{Type}</h2>
					<img
						className="image-poster"
						src={Poster}
						alt="The image couldn't load. Sorry!"
					/>
				</div>
			</div>
		</Link>
	);
}
