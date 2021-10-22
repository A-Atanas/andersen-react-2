import "./App.css";
import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import {
	changeQuery,
	resetStartupPageContents,
	displayMovies,
	handleSaveQuery,
	changeSortDirection,
	setPageQuantity,
	changeSortValue,
} from "./redux/movieListSlice";
import { API_URL, STARTUP_MESSAGE } from "./constants";
import { DestructuredInputEvent } from "./types";
import MoviesContainer from "./components/MoviesContainer";
import SearchPanel from "./components/SearchPanel";
import MoviePage from "./components/MoviePage";
import NavPanel from "./components/NavPanel";
import AboutPage from "./components/AboutPage";

export default function App(): JSX.Element {
	/*
		Pagination kinda breaks when, after initial search, you erase contents of the search box.
		That's why I decided to make a persistent version of the search query,
		so the pagination would work fine even if you change the search input value but not press search again
	*/
	const noMoviesMessage = useAppSelector(({ movieList: { noMoviesMessage } }) => noMoviesMessage);
	const searchQuery = useAppSelector(({ movieList: { searchQuery } }) => searchQuery);
	const persistentSearchQuery = useAppSelector(
		({ movieList: { persistentSearchQuery } }) => persistentSearchQuery
	);
	const movies = useAppSelector(({ movieList: { movies } }) => movies);
	const pages = useAppSelector(({ movieList: { pages } }) => pages);
	const sortValue = useAppSelector(({ movieList: { sortValue } }) => sortValue);
	const isAscending = useAppSelector(({ movieList: { isAscending } }) => isAscending);

	const dispatch = useAppDispatch();

	const handleChange = ({ target: { value } }: DestructuredInputEvent): void => {
		dispatch(changeQuery(value));
	};

	/*
		Okay, hear me out. The response doesn't give you all movies, maximum ten movies at once.
		I wanted to implement some recursive calls to fetch all movies at once,
		but pagination turned out much easier to implement
	*/
	const handleSearch = async (query: string, page: number, saveQuery: boolean): Promise<void> => {
		if (!query) {
			dispatch(resetStartupPageContents(STARTUP_MESSAGE));
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
			dispatch(displayMovies([results, sortValue, isAscending]));
			dispatch(setPageQuantity(Math.ceil(+totalResults / 10)));
			// A solution to beforementioned pagination breaking
			if (saveQuery) {
				dispatch(handleSaveQuery(query));
			}
		} else {
			dispatch(resetStartupPageContents(error));
		}
	};

	/*
		Look, this works only within a page. Sorting everything would mean
		fetching all movies at once (and API doesn't provide query options for sorting)
		Which I kinda can't implement. Yeah, no
	*/
	const handleSort = ({ target: { value } }: DestructuredInputEvent): void => {
		dispatch(changeSortValue(value));
		dispatch(displayMovies([movies, value, isAscending]));
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
			<NavPanel />
			<Switch>
				<Route exact path="/">
					<div>
						<SearchPanel
							handleSearch={handleSearch}
							handleChange={handleChange}
							setSortDirection={(isAscending) =>
								dispatch(changeSortDirection(isAscending))
							}
							searchQuery={searchQuery}
							sortValue={sortValue}
							isAscending={isAscending}
							handleSort={handleSort}
							sortMovies={(direction) =>
								dispatch(displayMovies([movies, sortValue, direction, pages]))
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
				<Route path="/movies/:movieID">
					<MoviePage />
				</Route>
				<Route path="/about">
					<AboutPage />
				</Route>
			</Switch>
		</Router>
	);
}
