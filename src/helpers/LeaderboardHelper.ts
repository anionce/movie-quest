export type LeaderboardEntry = {
	movie: string;
	score: number;
	result: 'win' | 'lose';
	date: string;
};

const STORAGE_KEY = 'movie-quest-leaderboard';
const MAX_ENTRIES = 10;

export const getLeaderboard = (): LeaderboardEntry[] => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
	} catch {
		return [];
	}
};

export const addLeaderboardEntry = (entry: LeaderboardEntry) => {
	const current = getLeaderboard();
	const updated = [...current, entry].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	return updated;
};

export const clearLeaderboard = () => {
	localStorage.removeItem(STORAGE_KEY);
};
