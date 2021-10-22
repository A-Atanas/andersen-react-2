import { createSlice } from "@reduxjs/toolkit";
import { STARTUP_MESSAGE } from "../constants";
import { APISearchResponse } from "../types";
import { sortBy } from "../utils";

export const movieListSlice = createSlice({
	name: "moviesList",
	initialState: {
		noMoviesMessage: STARTUP_MESSAGE,
		searchQuery: "",
		persistentSearchQuery: "",
		movies: [] as APISearchResponse["Search"],
		pages: 0,
		sortValue: "—",
		isAscending: true,
	},
	reducers: {
		changeQuery: (state, { payload }) => {
			state.searchQuery = payload;
		},
		handleSaveQuery: (state, { payload }) => {
			state.persistentSearchQuery = payload;
		},
		changeSortDirection: (state, { payload }) => {
			state.isAscending = payload;
		},
		resetStartupPageContents: (state, { payload }) => {
			state.persistentSearchQuery = "";
			state.noMoviesMessage = payload;
			state.movies = [];
			state.pages = 0;
		},
		changeSortValue: (state, { payload }) => {
			state.sortValue = payload;
		},
		setPageQuantity: (state, { payload }) => {
			state.pages = payload;
		},
		displayMovies: (state, { payload: [movies, sortValue, isAscending] }) => {
			state.movies = sortBy([...movies], sortValue, isAscending);
		},
	},
});

export const {
	changeQuery,
	resetStartupPageContents,
	displayMovies,
	handleSaveQuery,
	changeSortDirection,
	setPageQuantity,
	changeSortValue
} = movieListSlice.actions;

export default movieListSlice.reducer;
