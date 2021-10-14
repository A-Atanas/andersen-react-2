import React, { useCallback, useEffect, useState } from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { Movie } from "../types";

export default function MoviePage(): JSX.Element {
	const { movieID } = useParams<{ movieID: string }>();
	const [movieInfo, setMovieInfo] = useState<Partial<Movie>>({});
	const [error, setError] = useState("");

	const fetchMovieByID = useCallback(async (): Promise<void> => {
		const response = await fetch(`${API_URL}&i=${movieID}&plot=full`);
		// I had to extract response "code", so that it won't appear in the card
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { Response: responseCode, Error: error, ...movie } = await response.json();
		setMovieInfo(movie);
		setError(error);
	}, [movieID]);

	useEffect(() => {
		fetchMovieByID();
	}, [fetchMovieByID]);

	return (
		<div>
			{error ? (
				<h1>Error: {error}</h1>
			) : (
				Object.entries(movieInfo).map((elem) => {
					switch (elem[0]) {
					case "Ratings":
						return (
							<>
								<div>Ratings:</div>
								<ul>
									{(elem[1] as { Source: string; Value: string }[]).map(
										(rating: { Source: string; Value: string }) => (
											<li key={rating.Source}>
												{rating.Source} — {rating.Value}
											</li>
										)
									)}
								</ul>
							</>
						);
					case "Poster":
						return (
							<img
								src={elem[1] as string}
								alt="The image couldn't load. Sorry!"
							/>
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
				})
			)}
		</div>
	);
}
