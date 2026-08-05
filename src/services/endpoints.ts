export const BASE_URL = `https://api.themoviedb.org/3/`;

export const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500`;

export const IMAGE_THUMB_URL = `https://image.tmdb.org/t/p/w185`;

export const TAG = 'movie';

export const DISCOVER = 'discover';

export const TOKEN = import.meta.env.VITE_REACT_APP_TOKEN;

export const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const POPULARITY_VALUE = 1500;

export const MINIMUM_VOTE = 5.5;

export const getTmdbLanguage = () => (localStorage.getItem('movieQuestLanguage') === 'en' ? 'en-US' : 'es-ES');

export const getImageLanguage = () => (localStorage.getItem('movieQuestLanguage') === 'en' ? 'en' : 'es');

export type Difficulty = 'easy' | 'hard';

export const EASY_MAX_PAGE = 10;

const DIFFICULTY_STORAGE_KEY = 'movieQuestDifficulty';

export const getStoredDifficulty = (): Difficulty =>
	localStorage.getItem(DIFFICULTY_STORAGE_KEY) === 'hard' ? 'hard' : 'easy';

export const setStoredDifficulty = (difficulty: Difficulty) => {
	localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty);
};
