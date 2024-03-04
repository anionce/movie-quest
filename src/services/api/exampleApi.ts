import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../endpoints';

export const exampleApi = createApi({
	reducerPath: 'apiName',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		//prepareHeaders: headers => headers.set('Authorization', `Bearer ${TOKEN}`),
	}),
	endpoints: build => ({
		addSomething: build.mutation<void, any>({
			query: () => ({
				url: ``,
				method: 'post',
				data: {},
			}),
		}),
		getSomething1: build.query<any, any>({
			query: () => `URL`,
			transformResponse: response => response as any,
		}),
		getSomething2: build.query<any, any>({
			query: () => {
				const url = '/contacts';
				const params: any = 'something';
				return {
					url,
					params,
				};
			},
			transformResponse: response => {
				const newResponse = response;
				return newResponse;
			},
		}),
	}),
});

export const { useAddSomethingMutation, useGetSomething1Query, useLazyGetSomething2Query } = exampleApi;
