const STORAGE_KEY = 'movieQuestRecentMovies';
const MAX_ENTRIES = 40;

export const getRecentMovieIds = (): number[] => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

export const addRecentMovieId = (id: number): void => {
	const current = getRecentMovieIds();
	const updated = [...current.filter(existingId => existingId !== id), id].slice(-MAX_ENTRIES);

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	} catch {
		// localStorage unavailable (private browsing, quota, etc.) — fail silently
	}
};
