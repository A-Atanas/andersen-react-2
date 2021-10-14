export type DestructuredInputEvent = {
	target: {
		value: string;
	};
};

export type APISearchResponse = {
	Search: {
		Poster: string;
		Title: string;
		Type: string;
		imdbID: string;
	}[];
	totalResults: string;
	Response: string;
};

export interface Movie {
	Actors: string;
	Awards: string;
	Country: string;
	DVD: string;
	Director: string;
	Genre: string;
	Language: string;
	Metascore: string;
	Plot: string;
	Poster: string;
	Production: string;
	Rated: string;
	Ratings: {
		Source: string;
		Value: string;
	}[];
	Released: string;
	Response: string;
	Runtime: string;
	Title: string;
	Type: string;
	Website: string;
	Writer: string;
	Year: string;
	imbdID: string;
	imbdRating: string;
	imbdVotes: string;
}
