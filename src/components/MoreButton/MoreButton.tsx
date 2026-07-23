import './MoreButton.scss';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';

export type MoreButtonProps = { getMoreClues: () => void; gameFinished: boolean };

export const MoreButton = ({ getMoreClues, gameFinished }: MoreButtonProps) => {
	const navigate = useNavigate();
	const getClass = () => (gameFinished ? 'lost-button' : 'more-button');

	const goToLosePage = () => {
		navigate('/lose');
	};

	return (
		<button onClick={gameFinished ? goToLosePage : getMoreClues} className={getClass()}>
			{gameFinished ? (
				<div className='check-result'>
					<SentimentDissatisfiedIcon fontSize='small' />
					<span>No hints left — see result</span>
				</div>
			) : (
				<div className='get-hint'>
					<SearchIcon />
					<span>Get hint</span>
				</div>
			)}
		</button>
	);
};
