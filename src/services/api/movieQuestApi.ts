import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, BASE_URL, DISCOVER, LANGUAGE, MINIMUM_VOTE, POPULARITY_VALUE, TAG, TOKEN } from '../endpoints';
import { APIMovieResponse, Credits, Keywords, MovieDetail } from '../../models/MovieResponse';
import { GetMoviesArgs, MovieIdArgs } from '../../models/MovieQuestAPIArgs';

export const movieQuestApi = createApi({
	reducerPath: 'movieQuestApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => headers.set('Authorization', `Bearer ${TOKEN}`),
	}),
	endpoints: build => ({
		getRandomMovies: build.query<APIMovieResponse, GetMoviesArgs>({
			query: ({ page }) =>
				`${DISCOVER}/${TAG}?api_key=${API_KEY}&language=${LANGUAGE}&include_adult=false&vote_count.gte=${POPULARITY_VALUE}&vote_average.gte=${MINIMUM_VOTE}&sort_by=popularity.desc&page=${page}`,
		}),
		getDetails: build.query<MovieDetail, MovieIdArgs>({
			query: ({ id }) => `${TAG}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
		}),
		getKeywords: build.query<Keywords, MovieIdArgs>({
			query: ({ id }) => `${TAG}/${id}/keywords?api_key=${API_KEY}&language=${LANGUAGE}`,
		}),
		getCredits: build.query<Credits, MovieIdArgs>({
			query: ({ id }) => `${TAG}/${id}/credits?api_key=${API_KEY}&language=${LANGUAGE}`,
		}),
	}),
});

export const {
	useGetRandomMoviesQuery,
	useLazyGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetKeywordsQuery,
	useLazyGetCreditsQuery,
} = movieQuestApi;
