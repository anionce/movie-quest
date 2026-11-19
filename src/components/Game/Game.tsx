import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { gameReducer, isClueRevealed, isCorrectGuess, isGameOver, startGame, type Round } from '../../lib/game';
import { addLeaderboardEntry } from '../../lib/storage';
import { IMAGE_THUMB_URL } from '../../services/tmdb';
import { ClueButton } from '../ClueButton/ClueButton';
import { GameFooter } from '../GameFooter/GameFooter';
import { Hangman } from '../Hangman/Hangman';
import { Input } from '../Input/Input';
import { MoreButton } from '../MoreButton/MoreButton';
import { PATH_OF_ROUTES, type ResultState } from '../../routes/paths';

type GameProps = {
	round: Round;
	titles: string[];
	onRestart: () => void;
	onShowRules: () => void;
	onShowLeaderboard: () => void;
};

export const Game = ({ round, titles, onRestart, onShowRules, onShowLeaderboard }: GameProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [game, dispatch] = useReducer(gameReducer, round.title, startGame);

	const showResult = (won: boolean) => {
		const state: ResultState = { movie: round.title, poster: round.poster, score: won ? game.cluesLeft : 0 };
		if (won) addLeaderboardEntry({ movie: round.title, score: game.cluesLeft, date: new Date().toLocaleDateString() });
		navigate(won ? PATH_OF_ROUTES.WIN : PATH_OF_ROUTES.LOSE, { state });
	};

	const guess = (title: string) => {
		if (!title) return;
		if (isCorrectGuess(round.title, title)) showResult(true);
		else dispatch({ type: 'wrongGuess' });
	};

	return (
		<>
			<div className='game-container'>
				<Hangman value={round.title} revealedLetters={game.revealedLetters} />
				<div className='first-clues-container'>
					<ClueButton value={round.year} type='year' />
					<ClueButton value={round.genres} type='genre' />
				</div>
				<Input
					searchableResults={titles}
					onGuess={guess}
					onClearError={() => dispatch({ type: 'clearError' })}
					gameError={game.wrongGuess}
				/>
				<div className='extra-clues-scroll'>
					{isClueRevealed(game, 'tagline') && (
						<div className='tagline-container'>
							<span className='clue-title'>{t('clues.tagline')}</span>
							<ClueButton value={round.tagline} type='tagline' />
						</div>
					)}
					{isClueRevealed(game, 'actor') && round.actor && (
						<div className='actor-container'>
							<span className='clue-title'>{t('clues.cast')}</span>
							<ClueButton value={round.actor} type='actor' />
						</div>
					)}
					{isClueRevealed(game, 'still') && round.still && (
						<div className='still-container'>
							<span className='clue-title'>{t('clues.still')}</span>
							<img src={`${IMAGE_THUMB_URL}${round.still}`} alt={t('clues.still')} className='still-image' />
						</div>
					)}
				</div>
			</div>
			<MoreButton
				gameOver={isGameOver(game)}
				onHint={() => dispatch({ type: 'hint' })}
				onShowResult={() => showResult(false)}
			/>
			<GameFooter
				cluesLeft={game.cluesLeft}
				error={game.wrongGuess}
				onRestart={onRestart}
				onShowRules={onShowRules}
				onShowLeaderboard={onShowLeaderboard}
			/>
		</>
	);
};
