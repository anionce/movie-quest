export type MovieClues = {
	year?: string;
	genres?: string;
	tagline?: string;
	tags?: string[];
	actor?: string;
};

export type ExtraClues = {
	hangman: boolean;

	keywords: boolean;
	tagline: boolean;
	actor: boolean;
};

export type ClueCounterUpdates = {
	[key: number]: {
		hangman?: boolean;
		keywords?: boolean;
		tagline?: boolean;
		actor?: boolean;
	};
};

export const availableClueLetter = ['a', 'e', 't'];

export const clueLettersRecord: Record<number, string> = {
	1: 'a',
	2: 'e',
	3: 't',
};
