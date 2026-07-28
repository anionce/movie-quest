import './Leaderboard.scss';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getLeaderboard } from '../../services/leaderboard';
import { useTranslation } from 'react-i18next';

export const Leaderboard = () => {
	const { t } = useTranslation();
	const entries = getLeaderboard();

	return (
		<>
			<h2 className='leaderboard-title'>{t('leaderboard.title')}</h2>
			<p className='leaderboard-intro'>{t('leaderboard.intro')}</p>
			{entries.length === 0 ? (
				<p className='leaderboard-empty'>{t('leaderboard.empty')}</p>
			) : (
				<ol className='leaderboard-list'>
					{entries.map((entry, index) => (
						<li key={`${entry.movie}-${entry.date}-${index}`} className='leaderboard-item'>
							<span className='leaderboard-rank'>{index + 1}</span>
							<div className='leaderboard-details'>
								<span className='leaderboard-movie'>{entry.movie}</span>
								<span className='leaderboard-date'>{entry.date}</span>
							</div>
							<span className='leaderboard-score'>{entry.score}</span>
						</li>
					))}
				</ol>
			)}
			<div className='modal-icon'>
				<EmojiEventsIcon />
			</div>
		</>
	);
};
