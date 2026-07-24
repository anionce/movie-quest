import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import './Input.scss';
import TextField from '@mui/material/TextField';
import { GuessButton } from '../GuessButton/GuessButton';
import { useState } from 'react';

type InputProps = {
	searchableResults: string[];
	guessMovie: (movie: string) => void;
	setGameError: (error: boolean) => void;
	gameError: boolean;
};

const MIN_CHARS_TO_SEARCH = 3;

const defaultFilter = createFilterOptions<string>();

export const Input = ({ searchableResults, guessMovie, setGameError, gameError }: InputProps) => {
	const [inputValue, setInputValue] = useState('');
	const [inputText, setInputText] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='input-container'>
			<div className='input-row'>
				<Autocomplete
					disablePortal
					id='input-autocomplete'
					options={searchableResults}
					size='small'
					sx={{
						width: 300,
					}}
					disableClearable={true}
					className={gameError ? 'input-button input-error' : 'input-button'}
					open={isOpen && inputText.trim().length >= MIN_CHARS_TO_SEARCH}
					onOpen={() => setIsOpen(true)}
					onClose={() => setIsOpen(false)}
					filterOptions={(options, params) => {
						if (params.inputValue.trim().length < MIN_CHARS_TO_SEARCH) return [];
						return defaultFilter(options, params);
					}}
					onChange={(_, newValue) => {
						setInputValue(newValue);
					}}
					onInputChange={(_, newInputValue) => {
						setInputText(newInputValue);
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
							type='search'
							placeholder='Type a movie title...'
							inputProps={{
								...params.inputProps,
								'aria-label': 'Type a movie title to guess',
							}}
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
			{gameError && <span className='guess-error-message'>Nope, that's not it — try again!</span>}
		</div>
	);
};
