import {
	useLazyGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetKeywordsQuery,
	useLazyGetCreditsQuery,
} from '../services/api/movieQuestApi';

export const useGetMovieData = () => {
	const [triggerPages, { data }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMovies, { data: movieData, isLoading: isLoadingMovieData }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMoreMovies] = useLazyGetRandomMoviesQuery();
	const [triggerDetails, { data: movieDetails }] = useLazyGetDetailsQuery();
	const [triggerKeywords, { data: movieKeywords }] = useLazyGetKeywordsQuery();
	const [triggerCasting, { data: movieCast }] = useLazyGetCreditsQuery();

	return {
		data,
		triggerPages,
		triggerGetMovies,
		movieData,
		isLoadingMovieData,
		triggerGetMoreMovies,
		triggerDetails,
		movieDetails,
		triggerKeywords,
		movieKeywords,
		triggerCasting,
		movieCast,
	};
};
