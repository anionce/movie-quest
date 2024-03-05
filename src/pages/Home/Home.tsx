import { useEffect, useState } from 'react';
import {
	useGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetRandomMoviesQuery,
} from '../../services/api/movieQuestApi';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import { getRandomValue } from '../../helpers/HomeHelper';
import { Movie } from '../../models/MovieResponse';

export const Home = () => {
	const { t } = useTranslation();

	const { data } = useGetRandomMoviesQuery({ page: 1 });
	const [triggerMovie, { data: movieData }] = useLazyGetRandomMoviesQuery();
	const [triggerDetails, { data: movieDetails }] = useLazyGetDetailsQuery();

	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movie, setMovie] = useState<Movie | undefined>(undefined);

	useEffect(() => {
		if (data) {
			setTotalPages(data.total_pages);
		}
	}, [data]);

	useEffect(() => {
		if (totalPages) {
			triggerMovie({ page: getRandomValue(totalPages) });
		}
	}, [totalPages]);

	useEffect(() => {
		if (movieData) {
			const randomElement = getRandomValue(20);

			setMovie(movieData?.results[randomElement]);
		}
	}, [movieData]);

	useEffect(() => {
		if (movie) {
			triggerDetails({ id: movie.id });
		}
	}, [movie]);

	//const { onInputChange, searchedItems, searchText, emptySearch } = useSearch("");
	// const { filteredItems, emptyFilter, onTypeChanged } = useFilter(data);
	//let { currentItems, paginate, currentPage, pagesPerPage } = usePagination("");

	return <button>{t('placeholder.home.title')}</button>;
};
