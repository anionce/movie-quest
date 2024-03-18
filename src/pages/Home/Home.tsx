import { Dispatch, useEffect, useRef, useState } from 'react';
import './Home.scss';
import { getRandomActor, getRandomValue, getTruncatedGenre } from '../../helpers/HomeHelper';
import { GenreDetail, Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { ClueCounterUpdates, ExtraClues, MovieClues } from '../../constants/MovieClues';
import { Input } from '../../components/Input/Input';
import { MoreButton } from '../../components/MoreButton/MoreButton';
import { Hangman } from '../../components/Hangman/Hangman';
import { useNavigate } from 'react-router-dom';
import { GameFooter } from '../../components/GameFooter/GameFooter';
import { decreaseScore, resetScore, setMovie } from '../../services/slices/scoreboardSlice';
import { useAppDispatch } from '../../store';
import { Loader } from '../../components/Loader/Loader';
import { useGetMovieData } from '../../hooks/useGetMovieData';
import { Rules } from '../../components/Rules/Rules';
import { Modal } from '../../components/Modal/Modal';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch: Dispatch<any> = useAppDispatch();
	const {
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
	} = useGetMovieData();

	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movieToGuess, setMovieToGuess] = useState<Movie | undefined>(undefined);
	const [movieClues, setMovieClues] = useState<MovieClues | undefined>(undefined);
	const [searchableResults, setSearchableResults] = useState<string[]>([]);
	const [clueCounter, setClueCounter] = useState<number>(0);
	const prevClueCounter = usePrevious(clueCounter);

	function usePrevious(value: any) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		}, [value]);
		return ref.current;
	}

	const [gameError, setGameError] = useState<boolean>(false);
	const [toggleClues, setToggleClues] = useState<ExtraClues>({
		hangman: false,
		keywords: false,
		tagline: false,
		actor: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [neededClues, setNeededClues] = useState<number>(0);

	const shouldShowFirstClues =
		movieToGuess?.title &&
		movieClues?.genres &&
		movieClues?.year &&
		movieDetails?.tagline &&
		movieKeywords &&
		movieCast;
	const isLoading = isLoadingMovieData || !shouldShowFirstClues;
	const shouldShowInput = shouldShowFirstClues;
	const shouldShowKeywords = movieClues?.tags && toggleClues.keywords;
	const shouldShowTagline = movieClues?.tagline && toggleClues.tagline;
	const shouldShowActor = movieClues?.actor && toggleClues.actor;

	const refreshPage = () => {
		setShouldRefresh(false);
		setMovieClues(undefined);
		setTotalPages(undefined);
		setMovieToGuess(undefined);
		setSearchableResults([]);
		setClueCounter(0);
		setNeededClues(0);
		setToggleClues({
			hangman: false,
			keywords: false,
			tagline: false,
			actor: false,
		});

		dispatch(resetScore());
		navigate('/');
		const randomPage = getRandomValue(10);
		triggerPages({ page: randomPage });
	};

	const getMoreClues = () => {
		setGameError(false);
		setClueCounter(prev => prev + 1);
		dispatch(decreaseScore(clueCounter));
	};

	const getMoreMovies = async () => {
		const promises = [];
		for (let i = 0; i < 10; i++) {
			const page = getRandomValue(totalPages as number);
			promises.push(triggerGetMoreMovies({ page }));
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

		if (movieTitle) {
			if (isMatch) {
				navigate('/win');
			} else {
				dispatch(decreaseScore(3));
				setGameError(true);
			}
		}
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {
		dispatch(resetScore());
		triggerPages({ page: 11 });
	}, []);

	useEffect(() => {
		const clueCounterUpdates: ClueCounterUpdates = {
			1: { hangman: true },
			4: { keywords: true },
			5: { tagline: true },
			6: { actor: true },
		};

		if (clueCounter > 0 && clueCounter < 5) {
			if (neededClues === 0 && (prevClueCounter ?? 0) < 4) {
				setClueCounter(4);
			}
			if (neededClues === 1 && (prevClueCounter ?? 0) <= 2) {
				setClueCounter(3);
			}
			if (neededClues === 2 && (prevClueCounter ?? 0) <= 1) {
				setClueCounter(2);
			}
			if (neededClues === 3 && (prevClueCounter ?? 0) === 0) {
				setClueCounter(1);
			}
		}

		if (clueCounterUpdates.hasOwnProperty(clueCounter)) {
			setToggleClues(prev => ({ ...prev, ...clueCounterUpdates[clueCounter] }));
		}
	}, [clueCounter, neededClues]);

	useEffect(() => {
		if (data) {
			setTotalPages(data.total_pages);
			if (data.total_pages) {
				const page = getRandomValue(data.total_pages);
				triggerGetMovies({ page });
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
			triggerDetails({ id: movieToGuess.id });
			triggerKeywords({ id: movieToGuess.id });
			triggerCasting({ id: movieToGuess.id });
			setMovieClues({
				year: movieToGuess.release_date.substring(0, 4),
				genres: undefined,
			});
			dispatch(setMovie(movieToGuess.title));
		}
	}, [movieToGuess]);

	useEffect(() => {
		if (movieDetails) {
			const genreArray = movieDetails.genres.map(({ name }: GenreDetail) => name);
			const curatedGenres = genreArray.length > 1 ? genreArray.join(' · ') : genreArray[0];

			setMovieClues(prev => ({
				year: prev?.year,
				genres: getTruncatedGenre(curatedGenres),
			}));
		}
	}, [movieDetails]);

	useEffect(() => {
		if (movieDetails?.tagline && movieKeywords && movieCast) {
			setMovieClues(prev => ({
				...prev,
				tagline: movieDetails.tagline,
				tags: movieKeywords.keywords.map((keyword: { name: string }) => keyword.name).slice(0, 3),
				actor: getRandomActor(movieCast),
			}));
		} else if (!movieDetails?.tagline || !movieKeywords) {
			setShouldRefresh(true);
		}
	}, [movieDetails, movieKeywords, movieCast]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (isLoading) {
			timeoutId = setTimeout(() => {
				setShouldRefresh(true);
			}, 3000);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isLoading]);

	useEffect(() => {
		if (shouldRefresh) {
			refreshPage();
		}
	}, [shouldRefresh]);

	return (
		<div className='home-container'>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
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
								<ClueButton value={movieClues.genres} type='genre' />
								<Hangman
									value={movieToGuess.title}
									clueCounter={clueCounter}
									setNeededClues={setNeededClues}
								/>
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
					<MoreButton getMoreClues={getMoreClues} gameFinished={toggleClues.actor} />
					<GameFooter refreshPage={refreshPage} error={gameError} toggleModal={toggleModal} />
				</>
			)}

			{showModal && (
				<Modal toggleModal={toggleModal}>
					<Rules />
				</Modal>
			)}
		</div>
	);
};
