export type MovieClues = {
	year?: string;
	genres?: string;
	tagline?: string;
	actor?: string;
	still?: string;
};

export type ExtraClues = {
	tagline: boolean;
	still: boolean;
	actor: boolean;
};

export const availableClueLetter = ['a', 'e', 'm'];

export const EASY_MAX_PAGE = 10;

export type Difficulty = 'easy' | 'hard';
