import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Round } from '../lib/game';
import type { Difficulty } from '../lib/storage';
import { loadExtraTitles, loadRound, type Languages } from '../services/rounds';

export type RoundStatus = 'loading' | 'ready' | 'error';

export const useMovieRound = (initialDifficulty: Difficulty) => {
	const { i18n } = useTranslation();
	const images = i18n.language === 'en' ? 'en' : 'es';
	const languages: Languages = { images, tmdb: images === 'en' ? 'en-US' : 'es-ES' };
	const [status, setStatus] = useState<RoundStatus>('loading');
	const [round, setRound] = useState<Round | null>(null);
	const [titles, setTitles] = useState<string[]>([]);
	const controllerRef = useRef<AbortController | null>(null);

	const fetchRound = (difficulty: Difficulty) => {
		controllerRef.current?.abort();
		const controller = new AbortController();
		controllerRef.current = controller;
		const { signal } = controller;

		return loadRound(difficulty, languages, signal)
			.then(loaded => {
				if (signal.aborted) return;
				setTitles(loaded.titles);
				setRound(loaded.round);
				setStatus('ready');
				return loadExtraTitles(loaded.totalPages, languages, signal).then(extra => {
					if (!signal.aborted) setTitles(current => [...new Set([...current, ...extra])]);
				});
			})
			.catch(() => {
				if (!signal.aborted) setStatus('error');
			});
	};

	const load = (difficulty: Difficulty) => {
		setStatus('loading');
		setRound(null);
		return fetchRound(difficulty);
	};

	const loadFirstRound = useEffectEvent(() => fetchRound(initialDifficulty));

	useEffect(() => {
		void loadFirstRound();
		return () => controllerRef.current?.abort();
	}, []);

	return { status, round, titles, load };
};
