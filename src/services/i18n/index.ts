import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../../assets/locales/en/translation.json';
import translationES from '../../assets/locales/es/translation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	es: {
		translation: translationES,
	},
};

const STORAGE_KEY = 'movieQuestLanguage';

const getStoredLanguage = (): 'es' | 'en' => {
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'en' ? 'en' : 'es';
};

i18n.use(initReactI18next).init({
	debug: false,
	lng: getStoredLanguage(),
	fallbackLng: 'es',
	interpolation: {
		escapeValue: false,
	},
	resources,
});

export const setAppLanguage = (lang: 'es' | 'en') => {
	localStorage.setItem(STORAGE_KEY, lang);
	i18n.changeLanguage(lang);
};

export default i18n;
