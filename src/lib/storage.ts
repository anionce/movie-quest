export type Difficulty = 'easy' | 'hard';

export type LeaderboardEntry = {
	movie: string;
	score: number;
	date: string;
};

const DIFFICULTY_KEY = 'movieQuestDifficulty';
const RECENT_MOVIES_KEY = 'movieQuestRecentMovies';
const LEADERBOARD_KEY = 'movieQuestLeaderboard';
const MAX_RECENT_MOVIES = 40;
const MAX_LEADERBOARD_ENTRIES = 10;

const readList = <T>(key: string): T[] => {
	try {
		const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const writeList = <T>(key: string, items: T[]) => {
	try {
		localStorage.setItem(key, JSON.stringify(items));
	} catch {
		return;
	}
};

export const getStoredDifficulty = (): Difficulty => (localStorage.getItem(DIFFICULTY_KEY) === 'hard' ? 'hard' : 'easy');

export const storeDifficulty = (difficulty: Difficulty) => localStorage.setItem(DIFFICULTY_KEY, difficulty);

export const getRecentMovieIds = (): number[] => readList<number>(RECENT_MOVIES_KEY);

export const addRecentMovieId = (id: number) =>
	writeList(RECENT_MOVIES_KEY, [...getRecentMovieIds().filter(existing => existing !== id), id].slice(-MAX_RECENT_MOVIES));

const byScore = (a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score;

export const getLeaderboard = (): LeaderboardEntry[] => readList<LeaderboardEntry>(LEADERBOARD_KEY).sort(byScore);

export const addLeaderboardEntry = (entry: LeaderboardEntry): LeaderboardEntry[] => {
	const updated = [...getLeaderboard(), entry].sort(byScore).slice(0, MAX_LEADERBOARD_ENTRIES);
	writeList(LEADERBOARD_KEY, updated);
	return updated;
};
