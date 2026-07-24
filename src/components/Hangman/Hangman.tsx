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
					{word
						.split('')
						.filter(char => !invalidCharacters.includes(char))
						.map((char, charIndex) => {
							const isRevealed = revealedLetters.includes(char);
							return (
								<span key={charIndex} className={isRevealed ? 'hangman-letter revealed' : 'hangman-letter'}>
									{isRevealed ? char : ' '}
								</span>
							);
						})}
				</div>
			))}
		</div>
	);
};
