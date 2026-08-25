import { useEffect, useRef, useState } from 'react';
import './LanguageSelect.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../../services/i18n';

type LanguageCode = 'es' | 'en';

const LANGUAGE_OPTIONS: { code: LanguageCode; label: string }[] = [
	{ code: 'es', label: 'Español' },
	{ code: 'en', label: 'English' },
];

export const LanguageSelect = () => {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const currentLanguage = LANGUAGE_OPTIONS.find(option => option.code === i18n.language) ?? LANGUAGE_OPTIONS[0];

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const selectLanguage = (code: LanguageCode) => {
		setIsOpen(false);
		if (code === i18n.language) return;
		setAppLanguage(code);
		window.location.reload();
	};

	return (
		<div className='language-select' ref={containerRef}>
			<button
				type='button'
				className='language-select-trigger'
				onClick={() => setIsOpen(prev => !prev)}
				aria-label={t('language.selectLabel')}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
			>
				<span className='language-select-label-full'>{currentLanguage.label}</span>
				<span className='language-select-label-short'>{currentLanguage.code.toUpperCase()}</span>
				<KeyboardArrowDownIcon className={isOpen ? 'chevron chevron-open' : 'chevron'} fontSize='small' />
			</button>
			{isOpen && (
				<ul className='language-select-menu' role='listbox' aria-label={t('language.selectLabel')}>
					{LANGUAGE_OPTIONS.map(option => (
						<li key={option.code}>
							<button
								type='button'
								role='option'
								aria-selected={option.code === currentLanguage.code}
								className={option.code === currentLanguage.code ? 'language-option active' : 'language-option'}
								onClick={() => selectLanguage(option.code)}
							>
								{option.label}
								{option.code === currentLanguage.code && <CheckIcon fontSize='small' />}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
