import "./App.css";
import React, { useState } from "react"; // React must be in scope when using JSX
import { API_KEY } from "./constants";
import { APIResponse, InputEvent } from "./types";
import MoviesContainer from "./components/MoviesContainer";

export default function App(): JSX.Element {
	const [searchQuery, setSearchQuery] = useState("");
	const [movies, setMovies] = useState<APIResponse["Search"]>([]);
	const [pages, setPages] = useState(0);

	const handleChange = ({ target: { value } }: InputEvent): void => {
		setSearchQuery(value);
	};

	/*
		Okay, hear me out. The response doesn't give you all movies, maximum ten movies at once.
		I wanted to implement some recursive calls to fetch all movies at once,
		but pagination turned out much easier to implement
	*/
	const handleSearch = async (page: number): Promise<void> => {
		const apiResponse = await fetch(
			`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${page}`
		);
		const { Search: results, totalResults, Response: response } = await apiResponse.json();
		if (response === "True") {
			setMovies(results);
			setPages(Math.ceil(+totalResults / 10));
		}
	};

	function renderPagination(pages: number): JSX.Element[] {
		const buttons: JSX.Element[] = [];
		for (let i = 0; i < pages; i++) {
			buttons.push(
				<button key={i} onClick={() => handleSearch(i)}>
					{i + 1}
				</button>
			);
		}
		return buttons;
	}

	return (
		<div>
			<input type="text" id="movie-search-text" onChange={handleChange} value={searchQuery} />
			<input
				type="button"
				id="search-button"
				onClick={() => handleSearch(1)}
				value="Search"
			/>
			<div>
				{pages ? renderPagination(pages) : null}
				<MoviesContainer movies={movies} />
				{pages ? renderPagination(pages) : null}
			</div>
		</div>
	);
}
