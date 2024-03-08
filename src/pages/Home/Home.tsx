import { useEffect, useState } from 'react';
import {
	useLazyGetCreditsQuery,
	useLazyGetDetailsQuery,
	useLazyGetKeywordsQuery,
	useLazyGetRandomMoviesQuery,
} from '../../services/api/movieQuestApi';
import './Home.scss';
import { getRandomValue, getTruncatedGenre } from '../../helpers/HomeHelper';
import { Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { ExtraClues, MovieClues } from '../../models/MovieClues';
import { mapValueToGenre } from '../../constants/Genre';
import { Input } from '../../components/Input/Input';
import { MoreButton } from '../../components/MoreButton/MoreButton';
import { Hangman } from '../../components/Hangman/Hangman';
import { useNavigate } from 'react-router-dom';
import { GameFooter } from '../../components/GameFooter/GameFooter';
import { decreaseScore, resetScore, setMovie } from '../../services/slices/scoreboardSlice';
import { useAppDispatch } from '../../store';
import { Loader } from '../../components/Loader/Loader';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [triggerPages, { data }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMovies, { data: movieData, isLoading: isLoadingMovieData }] = useLazyGetRandomMoviesQuery();
	const [triggerGetMoreMovies] = useLazyGetRandomMoviesQuery();

	const [triggerDetails, { data: movieDetails }] = useLazyGetDetailsQuery();
	const [triggerKeywords, { data: movieKeywords }] = useLazyGetKeywordsQuery();
	const [triggerCasting, { data: movieCast }] = useLazyGetCreditsQuery();

	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movieToGuess, setMovieToGuess] = useState<Movie | undefined>(undefined);
	const [movieClues, setMovieClues] = useState<MovieClues | undefined>(undefined);
	const [searchableResults, setSearchableResults] = useState<string[]>([]);
	const [clueCounter, setClueCounter] = useState<number>(0);
	const [gameError, setGameError] = useState<boolean>(false);

	useEffect(() => {
		if (movieClues?.actor && movieClues.genres && movieClues.tagline && movieClues.tags && movieClues.year)
			console.log('i have all movieClues');
	}, [movieClues]);

	const [toggleClues, setToggleClues] = useState<ExtraClues>({
		keywords: false,
		tagline: false,
		actor: false,
	});

	const refreshPage = () => {
		setTotalPages(undefined);
		setMovieToGuess(undefined);
		setMovieClues(undefined);
		setSearchableResults([]);
		setClueCounter(0);
		setToggleClues({ keywords: false, tagline: false, actor: false });
		dispatch(resetScore());
		navigate('/');
		triggerPages({ page: getRandomValue(9) });
	};

	const getMoreClues = () => {
		setGameError(false);
		setClueCounter(prev => prev + 1);
		dispatch(decreaseScore(clueCounter));
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

	const getMoreMovies = async () => {
		const promises = [];
		for (let i = 0; i < 10; i++) {
			promises.push(triggerGetMoreMovies({ page: getRandomValue(totalPages as number) }));
		}
		const results = await Promise.all(promises);

		const titleArray = results
			.map(result => result?.data?.results.map((movie: Movie) => movie.title))
			.flat() as string[];

		const uniqueTitles = titleArray.filter(title => !searchableResults.includes(title));
		setSearchableResults(prev => [...prev, ...uniqueTitles]);
	};

	const guessMovie = (movieTitle: string) => {
		const isMatch = movieToGuess?.title.toLowerCase() === movieTitle.toLowerCase();
		if (movieTitle && isMatch) {
			navigate('/win');
		} else if (movieTitle && !isMatch) {
			dispatch(decreaseScore(3));
			setGameError(true);
		}
	};

	useEffect(() => {
		dispatch(resetScore());
		triggerPages({ page: 11 });
	}, []);

	useEffect(() => {
		if (data) {
			console.log('i have data');
			setTotalPages(data.total_pages);
			if (data.total_pages) {
				console.log('triggering movies');
				triggerGetMovies({ page: getRandomValue(data.total_pages) });
			}
		}
	}, [data]);

	useEffect(() => {
		if (movieData) {
			const randomElement = getRandomValue(18);
			const movieToGuess = movieData.results[randomElement];
			setMovieToGuess(movieToGuess);

			const titleArray = movieData.results.map((movie: Movie) => movie.title);
			setSearchableResults(titleArray);

			getMoreMovies();
		}
	}, [movieData]);

	useEffect(() => {
		if (movieToGuess) {
			console.log('i have movieToGuess');
			triggerDetails({ id: movieToGuess.id });
			triggerKeywords({ id: movieToGuess.id });
			triggerCasting({ id: movieToGuess.id });
			setMovieClues({
				year: movieToGuess.release_date.substring(0, 4),
				genres: movieToGuess.genre_ids.map((genre: number) => mapValueToGenre(genre)),
			});
			dispatch(setMovie(movieToGuess.title));
		}
	}, [movieToGuess]);

	useEffect(() => {
		if (movieDetails && movieKeywords && movieCast) {
			console.log('i have movieDetails, cast and keywords');

			const actorsListByPopularity = movieCast.cast
				.filter(cast => cast.known_for_department === 'Acting')
				.sort((a, b) => b.popularity - a.popularity)
				.map((actor: { name: string }) => actor.name);

			setMovieClues(prev => ({
				...prev,
				tagline: movieDetails.tagline,
				tags: movieKeywords.keywords.map((keyword: { name: string }) => keyword.name).slice(0, 3),
				actor: actorsListByPopularity[2],
			}));
		}
	}, [movieDetails, movieKeywords, movieCast]);

	/* 	useEffect(() => {
		if (movieKeywords) {
			console.log('movieKeywords', movieKeywords);
			setMovieClues(prev => ({
				...prev,
				tags: movieKeywords.keywords.map((keyword: { name: string }) => keyword.name).slice(0, 3),
			}));
		}
	}, [movieKeywords]);

	useEffect(() => {
		if (movieCast) {
			console.log('movieCast', movieCast);
			const actorsListByPopularity = movieCast.cast
				.filter(cast => cast.known_for_department === 'Acting')
				.sort((a, b) => b.popularity - a.popularity)
				.map((actor: { name: string }) => actor.name);

			setMovieClues(prev => ({
				...prev,
				actor: actorsListByPopularity[2],
			}));
		}
	}, [movieCast]); */

	const truncatedGenre = getTruncatedGenre(movieClues?.genres?.join(' · '));

	const shouldShowFirstClues = movieToGuess && movieClues && truncatedGenre && movieClues.year && movieToGuess.title;
	const shouldShowKeywords = movieClues?.tags && toggleClues.keywords;
	const shouldShowTagline = movieClues?.tagline && toggleClues.tagline;
	const shouldShowActor = movieClues?.actor && toggleClues.actor;

	const shouldShowInput = shouldShowFirstClues && movieData;

	const isLoading = isLoadingMovieData || !shouldShowFirstClues;

	return (
		<div className='home-container'>
			{isLoading && <Loader />}
			{!isLoading && (
				<div className='game-container'>
					{shouldShowInput && (
						<Input
							searchableResults={searchableResults}
							guessMovie={guessMovie}
							setGameError={setGameError}
						/>
					)}
					{shouldShowFirstClues && (
						<div className='clues-container'>
							<ClueButton value={movieClues.year} type='year' />
							<ClueButton value={truncatedGenre} type='genre' />
							<Hangman value={movieToGuess.title} />
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
			<GameFooter refreshPage={refreshPage} error={gameError} />
		</div>
	);
};
