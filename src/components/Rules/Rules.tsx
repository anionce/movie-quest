import './Rules.scss';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Trans, useTranslation } from 'react-i18next';

export const Rules = () => {
	const { t } = useTranslation();

	return (
		<>
			<h2 className='rules-title'>{t('rules.title')}</h2>
			<p className='rules-intro'>{t('rules.intro')}</p>
			<ul className='rules-list'>
				<li>
					<span className='rules-step'>1</span>
					<span className='rules-text'>
						<Trans i18nKey='rules.step1' components={{ strong: <strong /> }} />
					</span>
				</li>
				<li>
					<span className='rules-step'>2</span>
					<span className='rules-text'>
						<Trans i18nKey='rules.step2' components={{ strong: <strong /> }} />
					</span>
				</li>
				<li>
					<span className='rules-step'>3</span>
					<span className='rules-text'>
						<Trans i18nKey='rules.step3' components={{ strong: <strong /> }} />
					</span>
				</li>
				<li>
					<span className='rules-step'>4</span>
					<span className='rules-text'>
						<Trans i18nKey='rules.step4' components={{ strong: <strong /> }} />
					</span>
				</li>
			</ul>
			<div className='modal-icon'>
				<MovieFilterIcon />
			</div>
		</>
	);
};
