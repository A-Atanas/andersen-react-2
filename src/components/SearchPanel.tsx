import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly
import { DestructuredInputEvent } from "../types";

type SearchPanelProps = {
	handleSearch: (query: string, page: number, saveQuery: boolean) => Promise<void>;
	handleChange: ({ target: { value } }: DestructuredInputEvent) => void;
	handleSort: ({ target: { value } }: DestructuredInputEvent) => void;
	searchQuery: string;
	sortValue: string;
	isAscending: boolean;
	setSortDirection: (ascending: boolean) => void;
	sortMovies: (direction: boolean) => void;
};

export default function SearchPanel({
	handleSearch,
	handleChange,
	setSortDirection,
	searchQuery,
	sortValue,
	isAscending,
	handleSort,
	sortMovies,
}: SearchPanelProps): JSX.Element {
	return (
		<>
			<div>
				<input
					type="text"
					id="movie-search-text"
					onChange={handleChange}
					value={searchQuery}
					placeholder="Search for a movie"
				/>
				<input
					type="button"
					id="search-button"
					onClick={() => handleSearch(searchQuery, 1, true)}
					value="Search"
				/>
			</div>
			<div>
				Sort by:
				<select value={sortValue} onChange={handleSort}>
					{["—", "imdbID", "Title", "Poster", "Type"].map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</select>
				<input
					type="checkbox"
					id="sortDirection"
					name="sortDirection"
					checked={isAscending}
					onChange={({ target: { checked } }) => {
						setSortDirection(checked);
						sortMovies(checked);
					}}
				/>
				<label htmlFor="sortDirection">Ascending</label>
			</div>
		</>
	);
}
