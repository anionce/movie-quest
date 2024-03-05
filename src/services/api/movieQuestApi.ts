import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, BASE_URL, DISCOVER, LANGUAGE, MINIMUM_VOTE, POPULARITY_VALUE, TAG, TOKEN } from '../endpoints';
import { APIMovieResponse, MovieDetail } from '../../models/MovieResponse';
import { DetailMovieArgs, GetMovieArgs } from '../../models/movieQuestAPIArgs';

export const movieQuestApi = createApi({
	reducerPath: 'apiName',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => headers.set('Authorization', `Bearer ${TOKEN}`),
	}),
	endpoints: build => ({
		getRandomMovies: build.query<APIMovieResponse, GetMovieArgs>({
			query: ({ page }) =>
				`${DISCOVER}/${TAG}?api_key=${API_KEY}&language=${LANGUAGE}&include_adult=false&vote_count.gte=${POPULARITY_VALUE}&vote_average.gte=${MINIMUM_VOTE}&sort_by=popularity.desc&page=${page}`,
		}),
		getDetails: build.query<MovieDetail, DetailMovieArgs>({
			query: ({ id }) => `${TAG}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
		}),
	}),
});

export const { useGetRandomMoviesQuery, useLazyGetRandomMoviesQuery, useLazyGetDetailsQuery } = movieQuestApi;
