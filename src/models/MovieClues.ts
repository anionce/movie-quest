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
	[key: number]: { keywords?: boolean; tagline?: boolean; actor?: boolean };
};
