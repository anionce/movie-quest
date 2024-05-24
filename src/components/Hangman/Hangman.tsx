import './Hangman.scss';

export type HangmanProps = {
	value: string;
	revealedLetters: string[];
};

export const Hangman = ({ value, revealedLetters }: HangmanProps) => {
	const invalidCharacters = ['-', '!', '?', '.', ',', ':'];

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
