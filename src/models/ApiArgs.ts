export type GetMoviesArgs = {
	page?: number;
	runtime?: number | null;
	genres?: number[] | null;
	streamingServices?: string | null;
};

export type MovieIdArgs = {
	id: number;
};
