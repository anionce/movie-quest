import { MovieGenre } from '../constants/Genre';

export type MovieClues = {
	year?: string;
	genres?: MovieGenre[];
	tagline?: string;
	tags?: string[];
	actor?: string;
};

export type ExtraClues = {
	keywords: boolean;
	tagline: boolean;
	actor: boolean;
};
