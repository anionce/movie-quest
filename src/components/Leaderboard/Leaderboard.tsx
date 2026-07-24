import './Leaderboard.scss';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getLeaderboard } from '../../services/leaderboard';

export const Leaderboard = () => {
	const entries = getLeaderboard();

	return (
		<>
			<h2 className='leaderboard-title'>Leaderboard</h2>
			<p className='leaderboard-intro'>Your best scores, saved on this device.</p>
			{entries.length === 0 ? (
				<p className='leaderboard-empty'>No scores yet — win a round to make the list!</p>
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
