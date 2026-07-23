import Autocomplete from '@mui/material/Autocomplete';
import './Input.scss';
import TextField from '@mui/material/TextField';
import { GuessButton } from '../GuessButton/GuessButton';
import { useState } from 'react';

type InputProps = {
	searchableResults: string[];
	guessMovie: (movie: string) => void;
	setGameError: (error: boolean) => void;
};

const MIN_CHARS_TO_SEARCH = 3;

export const Input = ({ searchableResults, guessMovie, setGameError }: InputProps) => {
	const [inputValue, setInputValue] = useState('');
	const [inputText, setInputText] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='input-container'>
			<Autocomplete
				disablePortal
				id='input-autocomplete'
				options={searchableResults}
				size='small'
				open={isOpen}
				onOpen={() => {
					if (inputText.trim().length >= MIN_CHARS_TO_SEARCH) {
						setIsOpen(true);
					}
				}}
				onClose={() => setIsOpen(false)}
				disableClearable={true}
				className='input-button'
				onChange={(_, newValue) => {
					setInputValue(newValue);
					setIsOpen(false);
				}}
				onInputChange={(_, newInputValue) => {
					setInputText(newInputValue);
					setIsOpen(newInputValue.trim().length >= MIN_CHARS_TO_SEARCH);
					if (newInputValue === '') {
						setGameError(false);
						setInputValue(newInputValue);
					}
				}}
				renderInput={params => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
						}}
						placeholder='Type the movie title...'
						type='search'
					/>
				)}
			/>
			<GuessButton
				guessMovie={() => {
					setGameError(false);
					guessMovie(inputValue);
				}}
				value={inputValue}
			/>
		</div>
	);
};
