import { useEffect, useState } from 'react';
import {
	useGetRandomMoviesQuery,
	useLazyGetDetailsQuery,
	useLazyGetRandomMoviesQuery,
} from '../../services/api/movieQuestApi';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import { getRandomValue, getTruncatedGenre } from '../../helpers/HomeHelper';
import { Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { MovieClues } from '../../models/MovieClues';
import { mapValueToGenre } from '../../constants/Genre';

export const Home = () => {
	const { t } = useTranslation();

	const { data } = useGetRandomMoviesQuery({ page: 1 });
	const [triggerMovie, { data: movieData }] = useLazyGetRandomMoviesQuery();
	const [triggerDetails, { data: movieDetails }] = useLazyGetDetailsQuery();

	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movie, setMovie] = useState<Movie | undefined>(undefined);
	const [movieClues, setMovieClues] = useState<MovieClues | undefined>(undefined);

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
			setMovieClues({
				year: movie.release_date.substring(0, 4),
				genres: movie.genre_ids.map((genre: number) => mapValueToGenre(genre)),
				hangman: movie.title.length,
			});
		}
	}, [movie]);

	//const { onInputChange, searchedItems, searchText, emptySearch } = useSearch("");
	// const { filteredItems, emptyFilter, onTypeChanged } = useFilter(data);
	//let { currentItems, paginate, currentPage, pagesPerPage } = usePagination("");

	const truncatedGenre = getTruncatedGenre(movieClues?.genres.join(' · '));

	console.log(truncatedGenre, movieClues?.genres);

	return (
		<div className='home-container'>
			{movieClues?.year && <ClueButton value={movieClues.year} type='year' />}
			{truncatedGenre && <ClueButton value={truncatedGenre} type='genre' />}
		</div>
	);
};
