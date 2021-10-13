import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import Movie from "./Movie";
import { APIResponse } from "../types";

type MoviesContainerProps = {
	movies: APIResponse["Search"];
};

export default function MoviesContainer({ movies }: MoviesContainerProps): JSX.Element {
	return (
		<div>
			{movies.map((movie) => (
				<Movie
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
