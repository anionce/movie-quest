import './Header.scss';
import { Link } from 'react-router-dom';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';

export const Header = () => {
	const { t } = useTranslation();

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
			<p className='app-subtitle'>{t('rules.intro')}</p>
			<LanguageSelect />
		</div>
	);
};
