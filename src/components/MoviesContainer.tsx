import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import MovieCard from "./MovieCard";
import { APISearchResponse } from "../types";

type MoviesContainerProps = {
	movies: APISearchResponse["Search"];
};

export default function MoviesContainer({ movies }: MoviesContainerProps): JSX.Element {
	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.imdbID}
					Poster={movie.Poster}
					Title={movie.Title}
					Type={movie.Type}
					imdbID={movie.imdbID}
				/>
			))}
		</div>
	);
}
