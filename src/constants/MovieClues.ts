export type MovieClues = {
	year?: string;
	genres?: string;
	tagline?: string;
	actor?: string;
};

export type ExtraClues = {
	tagline: boolean;
	actor: boolean;
};

export const availableClueLetter = ['a', 'e', 'm'];
