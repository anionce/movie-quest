import { Dispatch, useEffect, useState } from 'react';
import './Home.scss';
import {
	getLocalizedPoster,
	getMovieStill,
	getRandomActor,
	getRandomValue,
	getRandomValueInRange,
	getTruncatedGenre,
} from '../../helpers/HomeHelper';
import { GenreDetail, Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { Difficulty, EASY_MAX_PAGE, ExtraClues, MovieClues, availableClueLetter } from '../../constants/MovieClues';
import { Input } from '../../components/Input/Input';
import { MoreButton } from '../../components/MoreButton/MoreButton';
import { Hangman } from '../../components/Hangman/Hangman';
import { useNavigate } from 'react-router-dom';
import { GameFooter } from '../../components/GameFooter/GameFooter';
import {
	decreaseClues,
	resetClues,
	selectCluesLeft,
	setClues,
	setMovie,
	setMoviePoster,
} from '../../services/slices/scoreboardSlice';
import { useAppDispatch } from '../../store';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../components/Loader/Loader';
import { useGetMovieData } from '../../hooks/useGetMovieData';
import { Rules } from '../../components/Rules/Rules';
import { Leaderboard } from '../../components/Leaderboard/Leaderboard';
import { Modal } from '../../components/Modal/Modal';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../services/endpoints';

const DIFFICULTY_KEY = 'movieQuestDifficulty';

const getStoredDifficulty = (): Difficulty => (localStorage.getItem(DIFFICULTY_KEY) === 'hard' ? 'hard' : 'easy');

export const Home = () => {
	const { t } = useTranslation();
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
		triggerCasting,
		movieCast,
		triggerImages,
		movieImages,
		isApiError,
	} = useGetMovieData();

	const [difficulty, setDifficulty] = useState<Difficulty>(getStoredDifficulty);
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
	const [movieToGuess, setMovieToGuess] = useState<Movie | undefined>(undefined);
	const [movieClues, setMovieClues] = useState<MovieClues | undefined>(undefined);
	const [searchableResults, setSearchableResults] = useState<string[]>([]);

	const [gameError, setGameError] = useState<boolean>(false);
	const [toggleClues, setToggleClues] = useState<ExtraClues>({
		tagline: false,
		still: false,
		actor: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const [lettersToReveal, setLettersToReveal] = useState<number>(0);
	const [additionalClues, setAdditionalClues] = useState<number>(0);
	const [revealedLetters, setRevealedLetters] = useState<string[]>([]);

	const cluesLeft = useSelector(selectCluesLeft);

	const shouldShowFirstClues =
		movieToGuess?.title && movieClues?.genres && movieClues?.year && movieDetails?.tagline && movieCast;
	const isLoading = isLoadingMovieData || !shouldShowFirstClues;
	const shouldShowInput = shouldShowFirstClues;
	const shouldShowTagline = movieClues?.tagline && toggleClues.tagline;
	const shouldShowStill = movieClues?.still && toggleClues.still;
	const shouldShowActor = movieClues?.actor && toggleClues.actor;

	const isGameFinished = toggleClues.still || cluesLeft === 0;

	const refreshPage = () => {
		setShouldRefresh(false);
		dispatch(resetClues());
		dispatch(setMoviePoster(undefined));
		setMovieClues(undefined);
		setTotalPages(undefined);
		setMovieToGuess(undefined);
		setSearchableResults([]);
		setLettersToReveal(0);
		setRevealedLetters([]);
		setAdditionalClues(0);
		setToggleClues({
			tagline: false,
			still: false,
			actor: false,
		});
		navigate('/');
		const randomPage = getRandomValue(10);
		triggerPages({ page: randomPage });
	};

	const handleDifficultyChange = (value: Difficulty) => {
		if (value === difficulty) return;
		localStorage.setItem(DIFFICULTY_KEY, value);
		setDifficulty(value);
		refreshPage();
	};

	const getMoreClues = () => {
		setGameError(false);
		dispatch(decreaseClues());
		if (lettersToReveal) {
			revealLettersBasedOnClue();
		} else {
			if (!toggleClues.tagline) {
				return setToggleClues(prev => ({ ...prev, tagline: true }));
			}
			if (toggleClues.tagline && !toggleClues.actor) {
				return setToggleClues(prev => ({ ...prev, actor: true }));
			}
			if (toggleClues.actor && !toggleClues.still) {
				return setToggleClues(prev => ({ ...prev, still: true }));
			}
		}
	};

	const updateNeededClues = (movie: string) => {
		let includedLetters: string[] = [];
		availableClueLetter.forEach(letter => {
			if (movie.toLowerCase().includes(letter.toLowerCase()) && !includedLetters.includes(letter)) {
				includedLetters.push(letter);
			}
		});
		setAdditionalClues(includedLetters.length);
		setLettersToReveal(includedLetters.length);
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
			.flat()
			.filter((title): title is string => Boolean(title));

		const newArray = titleArray.filter(title => !searchableResults.includes(title));

		const uniqueTitles = newArray.filter((title, index) => newArray.indexOf(title) === index);

		setSearchableResults(prev => [...prev, ...uniqueTitles]);
	};

	const guessMovie = (movieTitle: string) => {
		const isMatch = movieToGuess?.title.toLowerCase() === movieTitle.toLowerCase();

		if (movieTitle) {
			if (isMatch) {
				navigate('/win');
			} else {
				dispatch(decreaseClues());
				setGameError(true);
			}
		}
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const toggleLeaderboard = () => {
		setShowLeaderboard(!showLeaderboard);
	};

	useEffect(() => {
		triggerPages({ page: 11 });
	}, []);

	useEffect(() => {
		if (data) {
			setTotalPages(data.total_pages);
			if (data.total_pages) {
				const maxEasyPage = Math.min(EASY_MAX_PAGE, data.total_pages);
				const page =
					difficulty === 'easy' || data.total_pages <= maxEasyPage
						? getRandomValue(maxEasyPage)
						: getRandomValueInRange(maxEasyPage + 1, data.total_pages);
				triggerGetMovies({ page });
			}
		}
	}, [data, difficulty]);

	useEffect(() => {
		if (movieData) {
			const randomElement = getRandomValue(18);
			const movieToGuess = movieData.results[randomElement];
			setMovieToGuess(movieToGuess);

			const titleArray = movieData.results.map((movie: Movie) => movie.title).filter(Boolean);
			setSearchableResults(titleArray);
		}
	}, [movieData]);

	useEffect(() => {
		if (searchableResults.length === 20) {
			getMoreMovies();
		}
	}, [searchableResults]);

	useEffect(() => {
		dispatch(setClues(additionalClues));
	}, [additionalClues]);

	useEffect(() => {
		if (movieToGuess) {
			updateNeededClues(movieToGuess.title);
			triggerDetails({ id: movieToGuess.id });
			triggerCasting({ id: movieToGuess.id });
			triggerImages({ id: movieToGuess.id });
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
		if (movieDetails) {
			dispatch(setMoviePoster(getLocalizedPoster(movieImages, movieDetails.poster_path)));
		}
	}, [movieDetails, movieImages]);

	useEffect(() => {
		if (movieDetails?.tagline && movieCast) {
			setMovieClues(prev => ({
				...prev,
				tagline: movieDetails.tagline,
				actor: getRandomActor(movieCast),
				still: getMovieStill(movieImages),
			}));
		} else if (!movieDetails?.tagline) {
			setShouldRefresh(true);
		}
	}, [movieDetails, movieCast, movieImages]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (isLoading && !isApiError) {
			timeoutId = setTimeout(() => {
				setShouldRefresh(true);
			}, 3000);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isLoading, isApiError]);

	useEffect(() => {
		if (shouldRefresh) {
			refreshPage();
		}
	}, [shouldRefresh]);

	useEffect(() => {
		if (isApiError) {
			navigate('/error');
		}
	}, [isApiError]);

	const revealLettersBasedOnClue = () => {
		if (!movieToGuess) return;

		const title = movieToGuess.title.toLowerCase();
		const nextLetter = availableClueLetter.find(
			letter => title.includes(letter) && !revealedLetters.includes(letter)
		);

		if (nextLetter) {
			revealLetter(nextLetter.toLowerCase());
			revealLetter(nextLetter.toUpperCase());
			setLettersToReveal(prev => prev - 1);
		}
	};

	const revealLetter = (letter: string) => {
		setRevealedLetters(prevLetters => {
			if (!prevLetters.includes(letter)) {
				return [...prevLetters, letter];
			}
			return prevLetters;
		});
	};

	return (
		<div className='home-container'>
			<div className='difficulty-toggle' role='group' aria-label={t('difficulty.label')}>
				<button
					type='button'
					className={difficulty === 'easy' ? 'difficulty-option active' : 'difficulty-option'}
					onClick={() => handleDifficultyChange('easy')}
				>
					{t('difficulty.easy')}
				</button>
				<button
					type='button'
					className={difficulty === 'hard' ? 'difficulty-option active' : 'difficulty-option'}
					onClick={() => handleDifficultyChange('hard')}
				>
					{t('difficulty.hard')}
				</button>
			</div>

			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<div className='game-container'>
						{shouldShowFirstClues && <Hangman value={movieToGuess.title} revealedLetters={revealedLetters} />}
						{shouldShowFirstClues && (
							<div className='first-clues-container'>
								<ClueButton value={movieClues.year} type='year' />
								<ClueButton value={movieClues.genres} type='genre' />
							</div>
						)}
						{shouldShowInput && (
							<Input
								searchableResults={searchableResults}
								guessMovie={guessMovie}
								setGameError={setGameError}
								gameError={gameError}
							/>
						)}
						<div className='extra-clues-scroll'>
							{shouldShowTagline && (
								<div className='tagline-container'>
									<span className='clue-title'>{t('clues.tagline')}</span>
									<ClueButton value={movieClues.tagline} type='tagline' />
								</div>
							)}
							{shouldShowActor && (
								<div className='actor-container'>
									<span className='clue-title'>{t('clues.cast')}</span>
									<ClueButton value={movieClues.actor} type='actor' />
								</div>
							)}
							{shouldShowStill && (
								<div className='still-container'>
									<span className='clue-title'>{t('clues.still')}</span>
									<img src={`${IMAGE_BASE_URL}${movieClues.still}`} alt={t('clues.still')} className='still-image' />
								</div>
							)}
						</div>
					</div>
					<MoreButton getMoreClues={getMoreClues} gameFinished={isGameFinished} />
					<GameFooter
						refreshPage={refreshPage}
						error={gameError}
						toggleModal={toggleModal}
						toggleLeaderboard={toggleLeaderboard}
					/>
				</>
			)}

			{showModal && (
				<Modal toggleModal={toggleModal}>
					<Rules />
				</Modal>
			)}

			{showLeaderboard && (
				<Modal toggleModal={toggleLeaderboard}>
					<Leaderboard />
				</Modal>
			)}
		</div>
	);
};
