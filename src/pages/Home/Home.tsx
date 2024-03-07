import { useEffect, useState } from 'react';
import {
	useGetRandomMoviesQuery,
	useLazyGetCreditsQuery,
	useLazyGetDetailsQuery,
	useLazyGetKeywordsQuery,
	useLazyGetRandomMoviesQuery,
} from '../../services/api/movieQuestApi';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import { getRandomValue, getTruncatedGenre } from '../../helpers/HomeHelper';
import { Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { ExtraClues, MovieClues } from '../../models/MovieClues';
import { mapValueToGenre } from '../../constants/Genre';
import { Input } from '../../components/Input/Input';
import { MoreButton } from '../../components/MoreButton/MoreButton';
import { Hangman } from '../../components/Hangman/Hangman';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const { data } = useGetRandomMoviesQuery({ page: 1 });
	const navigate = useNavigate();

	const [triggerGetMovies, { data: movieData, isLoading: isLoadingMovieData }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMoreMovies] = useLazyGetRandomMoviesQuery();

	const [triggerDetails, { data: movieDetails }] = useLazyGetDetailsQuery();
	const [triggerKeywords, { data: movieKeywords }] = useLazyGetKeywordsQuery();
	const [triggerCasting, { data: movieCast }] = useLazyGetCreditsQuery();

	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movie, setMovie] = useState<Movie | undefined>(undefined);
	const [movieClues, setMovieClues] = useState<MovieClues | undefined>(undefined);
	const [searchableResults, setSearchableResults] = useState<string[]>([]);
	const [clueCounter, setClueCounter] = useState<number>(0);

	const [toggleClues, setToggleClues] = useState<ExtraClues>({
		keywords: false,
		tagline: false,
		actor: false,
	});

	/* const refreshPage = () => {
		setTotalPages(undefined);
		setMovie(undefined);
		setMovieClues(undefined);
		setSearchableResults([]);
		setClueCounter(0);
		setToggleClues({ keywords: false, tagline: false, actor: false });
		navigate('/');
	}; */

	const getMoreClues = () => {
		setClueCounter(prev => prev + 1);
	};

	useEffect(() => {
		if (clueCounter === 1) {
			setToggleClues(prev => ({ ...prev, keywords: true }));
		}
		if (clueCounter === 2) {
			setToggleClues(prev => ({ ...prev, tagline: true }));
		}
		if (clueCounter === 3) {
			setToggleClues(prev => ({ ...prev, actor: true }));
		}
	}, [clueCounter]);

	const executeTriggerMoreMovies = async () => {
		const { data: moreMovies } = await triggerGetMoreMovies({ page: getRandomValue(totalPages as number) });

		if (moreMovies) {
			const titleArray = moreMovies.results.map((movie: Movie) => movie.title);
			const uniqueTitles = titleArray.filter(title => !searchableResults.includes(title));
			setSearchableResults(prev => [...prev, ...uniqueTitles]);
		}
	};

	const getMoreMovies = () => {
		for (let i = 0; i < 10; i++) {
			executeTriggerMoreMovies();
		}
	};

	const guessMovie = (movieTitle: string) => {
		if (movie?.title.toLowerCase() === movieTitle.toLowerCase()) {
			navigate('/win');
		} else {
			// lógica para perder puntos
		}
	};

	useEffect(() => {
		if (data) {
			setTotalPages(data.total_pages);
		}
	}, [data]);

	useEffect(() => {
		if (totalPages) {
			triggerGetMovies({ page: getRandomValue(totalPages) });
		}
	}, [totalPages]);

	useEffect(() => {
		if (movieData) {
			const randomElement = getRandomValue(20);
			setMovie(movieData.results[randomElement]);

			const titleArray = movieData.results.map((movie: Movie) => movie.title);
			setSearchableResults(titleArray);

			getMoreMovies();
		}
	}, [movieData]);

	useEffect(() => {
		if (movie) {
			triggerDetails({ id: movie.id });
			triggerKeywords({ id: movie.id });
			triggerCasting({ id: movie.id });
			setMovieClues({
				year: movie.release_date.substring(0, 4),
				genres: movie.genre_ids.map((genre: number) => mapValueToGenre(genre)),
			});
		}
	}, [movie]);

	useEffect(() => {
		if (movieDetails) {
			setMovieClues(prev => ({
				...prev,
				tagline: movieDetails.tagline,
			}));
		}
	}, [movieDetails]);

	useEffect(() => {
		if (movieKeywords) {
			setMovieClues(prev => ({
				...prev,
				tags: movieKeywords.keywords.map((keyword: { name: string }) => keyword.name).slice(0, 3),
			}));
		}
	}, [movieKeywords]);

	useEffect(() => {
		if (movieCast) {
			const actorsListByPopularity = movieCast.cast
				.filter(cast => cast.known_for_department === 'Acting')
				.sort((a, b) => b.popularity - a.popularity)
				.map((actor: { name: string }) => actor.name);

			setMovieClues(prev => ({
				...prev,
				actor: actorsListByPopularity[2],
			}));
		}
	}, [movieCast]);

	const truncatedGenre = getTruncatedGenre(movieClues?.genres?.join(' · '));

	const shouldShowFirstClues = movie && truncatedGenre && movieClues?.year && movie.title;
	const shouldShowKeywords = movieClues?.tags && toggleClues.keywords;
	const shouldShowTagline = movieClues?.tagline && toggleClues.tagline;
	const shouldShowActor = movieClues?.actor && toggleClues.actor;

	const shouldShowInput = shouldShowFirstClues && movieData;

	return (
		<div className='home-container'>
			{isLoadingMovieData && <div>Loading</div>}
			{!isLoadingMovieData && (
				<div className='game-container'>
					{shouldShowInput && <Input searchableResults={searchableResults} guessMovie={guessMovie} />}
					{shouldShowFirstClues && (
						<div className='clues-container'>
							<ClueButton value={movieClues.year} type='year' />
							<ClueButton value={truncatedGenre} type='genre' />
							<Hangman value={movie.title} />
						</div>
					)}
					{shouldShowKeywords && (
						<div className='clues-container'>
							{movieClues.tags?.map((tag, index) => (
								<ClueButton key={index} value={tag} type={`tag-${index + 1}`} />
							))}
						</div>
					)}
					{shouldShowTagline && <ClueButton value={movieClues.tagline} type='tagline' />}
					{shouldShowActor && <ClueButton value={movieClues.actor} type='actor' />}
				</div>
			)}
			<MoreButton getMoreClues={getMoreClues} gameFinished={toggleClues.actor} />
		</div>
	);
};
