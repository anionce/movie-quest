export type MovieClues = {
	year?: string;
	genres?: string;
	tagline?: string;
	actor?: string;
	still?: string;
};

export type ExtraClueKey = 'tagline' | 'actor' | 'still';

export const CLUE_ORDER: ExtraClueKey[] = ['tagline', 'actor', 'still'];

export const availableClueLetter = ['a', 'e', 'm'];
