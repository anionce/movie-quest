import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { DifficultyToggle } from '../../components/DifficultyToggle/DifficultyToggle';
import { Game } from '../../components/Game/Game';
import { Leaderboard } from '../../components/Leaderboard/Leaderboard';
import { Loader } from '../../components/Loader/Loader';
import { Modal } from '../../components/Modal/Modal';
import { Rules } from '../../components/Rules/Rules';
import { useMovieRound } from '../../hooks/useMovieRound';
import { getStoredDifficulty, storeDifficulty, type Difficulty } from '../../lib/storage';
import { PATH_OF_ROUTES } from '../../routes/paths';
import './Home.scss';

type OpenModal = 'rules' | 'leaderboard' | null;

export const Home = () => {
	const { t } = useTranslation();
	const [difficulty, setDifficulty] = useState<Difficulty>(getStoredDifficulty);
	const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty | null>(null);
	const [openModal, setOpenModal] = useState<OpenModal>(null);
	const { status, round, titles, load } = useMovieRound(difficulty);

	const applyDifficulty = (value: Difficulty) => {
		storeDifficulty(value);
		setDifficulty(value);
		setPendingDifficulty(null);
		void load(value);
	};

	const requestDifficulty = (value: Difficulty) => {
		if (value === difficulty) return;
		if (status === 'loading') applyDifficulty(value);
		else setPendingDifficulty(value);
	};

	if (status === 'error') return <Navigate to={PATH_OF_ROUTES.ERROR} replace />;

	return (
		<div className='home-container'>
			<DifficultyToggle value={difficulty} onChange={requestDifficulty} />

			{status === 'loading' || !round ? (
				<Loader />
			) : (
				<Game
					key={round.movieId}
					round={round}
					titles={titles}
					onRestart={() => void load(difficulty)}
					onShowRules={() => setOpenModal('rules')}
					onShowLeaderboard={() => setOpenModal('leaderboard')}
				/>
			)}

			{openModal && <Modal onClose={() => setOpenModal(null)}>{openModal === 'rules' ? <Rules /> : <Leaderboard />}</Modal>}

			{pendingDifficulty && (
				<Modal onClose={() => setPendingDifficulty(null)}>
					<div className='confirm-dialog'>
						<h2 className='confirm-dialog-title'>{t('difficultyConfirm.title')}</h2>
						<p className='confirm-dialog-text'>{t('difficultyConfirm.text')}</p>
						<div className='confirm-dialog-actions'>
							<button type='button' className='confirm-dialog-cancel' onClick={() => setPendingDifficulty(null)}>
								{t('buttons.cancel')}
							</button>
							<button
								type='button'
								className='confirm-dialog-confirm'
								onClick={() => applyDifficulty(pendingDifficulty)}
							>
								{t('buttons.confirm')}
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
