import {
	useLazyGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetKeywordsQuery,
	useLazyGetCreditsQuery,
} from '../services/api/movieQuestApi';

export const useGetMovieData = () => {
	const [triggerPages, { data, isError: isPagesError }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMovies, { data: movieData, isLoading: isLoadingMovieData, isError: isMoviesError }] =
		useLazyGetRandomMoviesQuery();
	const [triggerGetMoreMovies] = useLazyGetRandomMoviesQuery();
	const [triggerDetails, { data: movieDetails, isError: isDetailsError }] = useLazyGetDetailsQuery();
	const [triggerKeywords, { data: movieKeywords, isError: isKeywordsError }] = useLazyGetKeywordsQuery();
	const [triggerCasting, { data: movieCast, isError: isCastError }] = useLazyGetCreditsQuery();

	const isApiError = isPagesError || isMoviesError || isDetailsError || isKeywordsError || isCastError;

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
		isApiError,
	};
};
