import {
	useLazyGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetCreditsQuery,
	useLazyGetImagesQuery,
} from '../services/api/movieQuestApi';

export const useGetMovieData = () => {
	const [triggerPages, { data, isError: isPagesError }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMovies, { data: movieData, isLoading: isLoadingMovieData, isError: isMoviesError }] =
		useLazyGetRandomMoviesQuery();
	const [triggerGetMoreMovies] = useLazyGetRandomMoviesQuery();
	const [triggerDetails, { data: movieDetails, isError: isDetailsError }] = useLazyGetDetailsQuery();
	const [triggerCasting, { data: movieCast, isError: isCastError }] = useLazyGetCreditsQuery();
	const [triggerImages, { data: movieImages }] = useLazyGetImagesQuery();

	const isApiError = isPagesError || isMoviesError || isDetailsError || isCastError;

	return {
		data,
		triggerPages,
		triggerGetMovies,
		movieData,
		isLoadingMovieData,
		triggerGetMoreMovies,
		triggerDetails,
		movieDetails,
		triggerCasting,
		movieCast,
		triggerImages,
		movieImages,
		isApiError,
	};
};
