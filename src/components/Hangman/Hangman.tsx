import './Hangman.scss';

export type HangmanProps = {
	value: string;
	revealedLetters: string[];
};

export const Hangman = ({ value, revealedLetters }: HangmanProps) => {
	const invalidCharacters = ['-', '!', '?', '.', ',', ':'];

	const words = value.split(/\s+/);

	return (
		<div className='hangman-figure'>
			{words.map((word, wordIndex) => (
				<div key={wordIndex} className='hangman-figure__word'>
					{word.split('').map((char, charIndex) => {
						if (invalidCharacters.includes(char)) {
							return null;
						}
						const isRevealed = revealedLetters.includes(char);
						return (
							<span
								key={charIndex}
								className={isRevealed ? 'hangman-figure__letter is-revealed' : 'hangman-figure__letter'}
							>
								{isRevealed ? char : ' '}
							</span>
						);
					})}
				</div>
			))}
		</div>
	);
};
