export type LeaderboardEntry = {
	movie: string;
	score: number;
	date: string;
};

const STORAGE_KEY = 'movieQuestLeaderboard';
const MAX_ENTRIES = 10;

export const getLeaderboard = (): LeaderboardEntry[] => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? [...parsed].sort((a, b) => b.score - a.score) : [];
	} catch {
		return [];
	}
};

export const addLeaderboardEntry = (entry: LeaderboardEntry): LeaderboardEntry[] => {
	const current = getLeaderboard();
	const updated = [...current, entry].sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	} catch {
		// localStorage unavailable (private browsing, quota, etc.) — fail silently
	}

	return updated;
};
