import React from "react"; // React must be in scope when using JSX

type MovieProps = {
	Poster: string;
	Title: string;
	Type: string;
	imdbID: string;
};

export default function Movie({ Poster, Title, Type, imdbID }: MovieProps): JSX.Element {
	return (
		<div>
			<div key={imdbID}>
				<h1>{Title}</h1>
				<h2>{Type}</h2>
				<img className="image-poster" src={Poster} alt="The image couldn't load. Sorry!" />
			</div>
		</div>
	);
}
