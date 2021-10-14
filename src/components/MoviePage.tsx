import React, { useCallback, useEffect, useState } from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { Movie } from "../types";

export default function MoviePage(): JSX.Element {
	const { movieID } = useParams<{ movieID: string }>();
	const [movieInfo, setMovieInfo] = useState<Partial<Movie>>({});

	const fetchMovieByID = useCallback(async (): Promise<void> => {
		const response = await fetch(`${API_URL}&i=${movieID}&plot=full`);
		const movie = await response.json();
		setMovieInfo(movie);
	}, [movieID]);

	useEffect(() => {
		fetchMovieByID();
	}, [fetchMovieByID]);

	return (
		<div>
			{Object.entries(movieInfo).map((elem) => {
				switch (elem[0]) {
				case "Ratings":
					return (elem[1] as { Source: string; Value: string }[]).map(
						(rating: { Source: string; Value: string }) => (
							<div key={rating.Source}>
								<p>
									{rating.Source} — {rating.Value}
								</p>
							</div>
						)
					);
				case "Poster":
					return (
						<img src={elem[1] as string} alt="The image couldn't load. Sorry!" />
					);
				default:
					return (
						<div key={elem[0]}>
							<p>
								{elem[0]} — {elem[1]}
							</p>
						</div>
					);
				}
			})}
		</div>
	);
}
