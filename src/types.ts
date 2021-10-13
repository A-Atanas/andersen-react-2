export type InputEvent = {
	target: {
		value: string;
	};
};

export type APIResponse = {
	Search: {
		Poster: string;
		Title: string;
		Type: string;
		imdbID: string;
	}[];
	totalResults: string;
	Response: string;
};
