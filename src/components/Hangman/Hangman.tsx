import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './Hangman.scss';
import { availableClueLetter, clueLettersRecord } from '../../constants/MovieClues';

export type HangmanProps = {
	value: string;
	clueCounter: number;
	setNeededClues: Dispatch<SetStateAction<number>>;
};

export const Hangman = ({ value, clueCounter, setNeededClues }: HangmanProps) => {
	const invalidCharacters = ['-', '!', '?', '.', ',', ':'];
	const [revealedLetters, setRevealedLetters] = useState<string[]>([]);

	const updateNeededClues = () => {
		let includedLetters: string[] = [];
		availableClueLetter.forEach(letter => {
			if (value.toLowerCase().includes(letter.toLowerCase()) && !includedLetters.includes(letter)) {
				includedLetters.push(letter);
			}
		});
		setNeededClues(includedLetters.length);
	};

	useEffect(() => {
		updateNeededClues();
	}, [value]);

	useEffect(() => {
		if (clueCounter > 0 && clueCounter < 4) {
			revealLettersBasedOnClue(clueCounter);
		}
	}, [clueCounter]);

	const generateHangmanFigure = (word: string) => {
		return word.split('').map((char, _) => {
			if (invalidCharacters.includes(char)) {
				return '';
			} else if (revealedLetters.includes(char)) {
				return `${char}\u00A0`;
			} else {
				return '__\u00A0';
			}
		});
	};

	const revealLetter = (letter: string) => {
		setRevealedLetters(prevLetters => {
			if (!prevLetters.includes(letter)) {
				return [...prevLetters, letter];
			}
			return prevLetters;
		});
	};

	const revealLettersBasedOnClue = (clue: number) => {
		const letter = clueLettersRecord[clue];
		if (letter) {
			revealLetter(letter.toLowerCase());
			revealLetter(letter.toUpperCase());
		}
	};

	const words = value.split(/\s+/);

	return (
		<div className='hangman-figure'>
			{words.map((word, index) => (
				<div key={index} className='hangman-figure__word'>
					{generateHangmanFigure(word)}&nbsp;&nbsp;
				</div>
			))}
		</div>
	);
};
