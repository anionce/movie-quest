import { MovieGenre } from '../constants/Genre';

export type MovieClues = {
	year: string;
	genres: MovieGenre[];
	hangman?: any;
	tagline?: string;
	tags?: string[];
	actor?: string;
};
