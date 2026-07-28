import './ErrorPage.scss';
import LoopIcon from '@mui/icons-material/Loop';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';
import { FooterButton } from '../../components/FooterButton/FooterButton';
import { useTranslation } from 'react-i18next';

export const ErrorPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div className='error-container'>
			<div className='error-card'>
				<div className='error-icon-badge'>
					<SentimentDissatisfiedIcon />
				</div>
				<span className='error-label'>{t('error.label')}</span>
				<h1 className='error-title'>{t('error.title')}</h1>
				<span className='error-subtitle'>{t('error.subtitle')}</span>
			</div>
			<FooterButton value={<LoopIcon />} type='home' action={() => navigate('/')} label={t('buttons.goBackHome')} />
		</div>
	);
};
