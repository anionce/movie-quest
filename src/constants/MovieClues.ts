export type MovieClues = {
	year?: string;
	genres?: string;
	tagline?: string;
	tags?: string[];
	actor?: string;
};

export type ExtraClues = {
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

export const availableClueLetter = ['a', 'e', 'm'];

export const clueLettersRecord: Record<number, string> = {
	5: 'a',
	4: 'e',
	3: 'm',
};
