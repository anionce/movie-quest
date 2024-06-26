import { Dispatch, useEffect, useState } from 'react';
import './Home.scss';
import { getRandomActor, getRandomValue, getTruncatedGenre } from '../../helpers/HomeHelper';
import { GenreDetail, Movie } from '../../models/MovieResponse';
import { ClueButton } from '../../components/ClueButton/ClueButton';
import { ExtraClues, MovieClues, availableClueLetter } from '../../constants/MovieClues';
import { Input } from '../../components/Input/Input';
import { MoreButton } from '../../components/MoreButton/MoreButton';
import { Hangman } from '../../components/Hangman/Hangman';
import { useNavigate } from 'react-router-dom';
import { GameFooter } from '../../components/GameFooter/GameFooter';
import { decreaseClues, resetClues, selectCluesLeft, setClues, setMovie } from '../../services/slices/scoreboardSlice';
import { useAppDispatch } from '../../store';
import { Loader } from '../../components/Loader/Loader';
import { useGetMovieData } from '../../hooks/useGetMovieData';
import { Rules } from '../../components/Rules/Rules';
import { Modal } from '../../components/Modal/Modal';
import { useSelector } from 'react-redux';

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

	const [gameError, setGameError] = useState<boolean>(false);
	const [toggleClues, setToggleClues] = useState<ExtraClues>({
		keywords: false,
		tagline: false,
		actor: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [lettersToReveal, setLettersToReveal] = useState<number>(0);
	const [additionalClues, setAdditionalClues] = useState<number>(0);
	const [revealedLetters, setRevealedLetters] = useState<string[]>([]);

	const cluesLeft = useSelector(selectCluesLeft);

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

	const isGameFinished = toggleClues.actor || cluesLeft === 0;

	const refreshPage = () => {
		setShouldRefresh(false);
		dispatch(resetClues());
		setMovieClues(undefined);
		setTotalPages(undefined);
		setMovieToGuess(undefined);
		setSearchableResults([]);
		setLettersToReveal(0);
		setRevealedLetters([]);
		setAdditionalClues(0);
		setToggleClues({
			keywords: false,
			tagline: false,
			actor: false,
		});
		navigate('/');
		const randomPage = getRandomValue(10);
		triggerPages({ page: randomPage });
	};

	const getMoreClues = () => {
		setGameError(false);
		dispatch(decreaseClues());
		if (lettersToReveal) {
			revealLettersBasedOnClue();
		} else {
			if (!toggleClues.keywords) {
				return setToggleClues(prev => ({ ...prev, keywords: true }));
			}
			if (toggleClues.keywords && !toggleClues.tagline) {
				return setToggleClues(prev => ({ ...prev, tagline: true }));
			}
			if (toggleClues.tagline && !toggleClues.actor) {
				return setToggleClues(prev => ({ ...prev, actor: true }));
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
			.flat() as string[];

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

	useEffect(() => {
		triggerPages({ page: 11 });
	}, []);

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

	const revealLettersBasedOnClue = () => {
		if (movieToGuess?.title.toLowerCase().includes('a') && !revealedLetters.includes('a')) {
			revealLetter('A'.toLowerCase());
			revealLetter('a'.toUpperCase());
			setLettersToReveal(prev => prev - 1);
			return;
		}
		if (movieToGuess?.title.toLowerCase().includes('e') && !revealedLetters.includes('e')) {
			revealLetter('E'.toLowerCase());
			revealLetter('e'.toUpperCase());
			setLettersToReveal(prev => prev - 1);
			return;
		}
		if (movieToGuess?.title.toLowerCase().includes('m') && !revealedLetters.includes('m')) {
			revealLetter('M'.toLowerCase());
			revealLetter('m'.toUpperCase());
			setLettersToReveal(prev => prev - 1);
			return;
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
								<div className='first-clues-container'>
									<ClueButton value={movieClues.year} type='year' />
									<ClueButton value={movieClues.genres} type='genre' />
								</div>
								<Hangman value={movieToGuess.title} revealedLetters={revealedLetters} />
							</div>
						)}
						{shouldShowKeywords && (
							<div className='keywords-container'>
								<span className='clue-title'>Keywords:</span>
								<div className='keywords'>
									{movieClues.tags?.map((tag, index) => (
										<ClueButton key={index} value={tag} type={`tag-${index + 1}`} />
									))}
								</div>
							</div>
						)}
						{shouldShowTagline && (
							<div className='tagline-container'>
								<span className='clue-title'>Tagline:</span>
								<ClueButton value={movieClues.tagline} type='tagline' />
							</div>
						)}
						{shouldShowActor && (
							<div className='actor-container'>
								<span className='clue-title'>Actor:</span>
								<ClueButton value={movieClues.actor} type='actor' />
							</div>
						)}
					</div>
					<MoreButton getMoreClues={getMoreClues} gameFinished={isGameFinished} />
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
