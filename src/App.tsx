import "./App.css";
import React, { useState } from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { API_URL, STARTUP_MESSAGE } from "./constants";
import { APIResponse, DestructuredInputEvent } from "./types";
import { sortBy } from "./utils";
import MoviesContainer from "./components/MoviesContainer";
import SearchPanel from "./components/SearchPanel";

export default function App(): JSX.Element {
	/*
		Pagination kinda breaks when, after initial search, you erase contents of the search box.
		That's why I decided to make a persistent version of the search query,
		so the pagination would work fine even if you change the search input value but not press search again
	*/
	const [noMoviesMessage, setNoMoviesMessage] = useState(STARTUP_MESSAGE);
	const [searchQuery, setSearchQuery] = useState("");
	const [persistentSearchQuery, setPersistentSearchQuery] = useState("");
	const [movies, setMovies] = useState<APIResponse["Search"]>([]);
	const [pages, setPages] = useState(0);
	const [sortValue, setSortValue] = useState("—");
	const [isAscending, setIsAscending] = useState(true);

	const handleChange = ({ target: { value } }: DestructuredInputEvent): void => {
		setSearchQuery(value);
	};

	const returnToStartupState = (): void => {
		setPersistentSearchQuery("");
		setNoMoviesMessage(STARTUP_MESSAGE);
		setMovies([]);
		setPages(0);
	};

	/*
		Okay, hear me out. The response doesn't give you all movies, maximum ten movies at once.
		I wanted to implement some recursive calls to fetch all movies at once,
		but pagination turned out much easier to implement
	*/
	const handleSearch = async (query: string, page: number, saveQuery: boolean): Promise<void> => {
		if (!query) {
			returnToStartupState();
			return;
		}
		const apiResponse = await fetch(`${API_URL}&s=${query}&page=${page}`);
		const {
			Search: results,
			totalResults,
			Response: response,
			Error: error,
		} = await apiResponse.json();
		if (response === "True") {
			setMovies(sortBy(results, sortValue, isAscending));
			// A solution to beforementioned pagination breaking
			if (saveQuery) {
				setPersistentSearchQuery(searchQuery);
			}
			setPages(Math.ceil(+totalResults / 10));
		} else {
			returnToStartupState();
			setNoMoviesMessage(error);
		}
	};

	/*
		Look, this works only within a page. Sorting everything would mean
		fetching all movies at once (and API doesn't provide query options for sorting)
		Which I kinda can't implement. Yeah, no
	*/
	const handleSort = ({ target: { value } }: DestructuredInputEvent): void => {
		setSortValue(value);
		setMovies(sortBy(movies, value, isAscending));
	};

	function renderPagination(pages: number): JSX.Element[] {
		const buttons: JSX.Element[] = [];
		for (let i = 0; i < pages; i++) {
			buttons.push(
				<button key={i} onClick={() => handleSearch(persistentSearchQuery, i + 1, false)}>
					{i + 1}
				</button>
			);
		}
		return buttons;
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div>
						<SearchPanel
							handleSearch={handleSearch}
							handleChange={handleChange}
							setSortDirection={setIsAscending}
							searchQuery={searchQuery}
							sortValue={sortValue}
							isAscending={isAscending}
							handleSort={handleSort}
							sortMovies={(direction) =>
								setMovies(sortBy(movies, sortValue, direction))
							}
						/>
						<div>
							{pages ? (
								<>
									<h1>Showing results for: {persistentSearchQuery}</h1>
									{renderPagination(pages)}
									<MoviesContainer movies={movies} />
									{renderPagination(pages)}
								</>
							) : (
								<h1>{noMoviesMessage}</h1>
							)}
						</div>
					</div>
				</Route>
			</Switch>
		</Router>
	);
}
