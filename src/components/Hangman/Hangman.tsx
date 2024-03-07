import './Hangman.scss';
export type HangmanProps = { value: string };

export const Hangman = ({ value }: HangmanProps) => {
	const invalidCharacters = ['-', '!', '?', '.', ',', ':'];

	const generateHangmanFigure = (word: string) => {
		return word.split('').map((char, index) => (
			<span key={index} className='hangman-figure__char'>
				{invalidCharacters.includes(char) ? '' : '__\u00A0'}
			</span>
		));
	};

	const words = value.split(/\s+/);

	console.log(words, 'title by spaces');

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
