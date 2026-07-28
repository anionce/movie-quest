import './Header.scss';
import { Link } from 'react-router-dom';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../../services/i18n';

export const Header = () => {
	const { t, i18n } = useTranslation();
	const isSpanish = i18n.language === 'es';

	const toggleLanguage = () => {
		setAppLanguage(isSpanish ? 'en' : 'es');
		window.location.reload();
	};

	return (
		<div className='header-container'>
			<Link to='/' className='logo'>
				<span className='logo-badge'>
					<LocalMoviesIcon />
				</span>
				<span className='logo-text'>
					Movie<span>Quest</span>
				</span>
			</Link>
			<button
				type='button'
				className='language-toggle'
				onClick={toggleLanguage}
				aria-label={t('language.toggleLabel')}
			>
				{t('language.toggleShort')}
			</button>
		</div>
	);
};
