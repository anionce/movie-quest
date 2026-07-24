import './ErrorPage.scss';
import LoopIcon from '@mui/icons-material/Loop';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';
import { FooterButton } from '../../components/FooterButton/FooterButton';

export const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<div className='error-container'>
			<div className='error-card'>
				<div className='error-icon-badge'>
					<SentimentDissatisfiedIcon />
				</div>
				<span className='error-label'>Ooops!</span>
				<h1 className='error-title'>There has been an error</h1>
				<span className='error-subtitle'>We couldn't reach the movie database. Please try again.</span>
			</div>
			<FooterButton value={<LoopIcon />} type='home' action={() => navigate('/')} label='Go back home' />
		</div>
	);
};
