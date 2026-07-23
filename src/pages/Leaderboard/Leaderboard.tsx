import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoopIcon from '@mui/icons-material/Loop';
import './Leaderboard.scss';
import { FooterButton } from '../../components/FooterButton/FooterButton';
import { getLeaderboard, LeaderboardEntry } from '../../helpers/LeaderboardHelper';

export const Leaderboard = () => {
	const navigate = useNavigate();
	const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

	useEffect(() => {
		setEntries(getLeaderboard());
	}, []);

	return (
		<div className='leaderboard-container'>
			<div className='leaderboard-icon'>
				<EmojiEventsIcon fontSize='inherit' />
			</div>
			<h2>Leaderboard</h2>
			{entries.length === 0 ? (
				<p className='leaderboard-empty'>No scores yet. Play a round to get on the board!</p>
			) : (
				<ol className='leaderboard-list'>
					{entries.map((entry, index) => (
						<li key={index} className={entry.result}>
							<span className='leaderboard-rank'>{index + 1}</span>
							<span className='leaderboard-movie'>{entry.movie}</span>
							<span className='leaderboard-score'>{entry.score}pt</span>
						</li>
					))}
				</ol>
			)}
			<FooterButton value={<LoopIcon />} type='home' action={() => navigate('/')} />
		</div>
	);
};
