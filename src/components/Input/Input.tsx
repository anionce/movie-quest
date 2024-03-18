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

export const Input = ({ searchableResults, guessMovie, setGameError }: InputProps) => {
	const [inputValue, setInputValue] = useState('');

	return (
		<div className='input-container'>
			<Autocomplete
				disablePortal
				id='input-autocomplete'
				options={searchableResults}
				size='small'
				sx={{
					width: 300,
				}}
				disableClearable={true}
				className='input-button'
				onChange={(_, newValue) => {
					setInputValue(newValue);
				}}
				onInputChange={(_, newInputValue) => {
					if (newInputValue === '') {
						setGameError(false);
					}
				}}
				renderInput={params => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
						}}
						type='search'
					/>
				)}
			/>
			<GuessButton
				guessMovie={() => {
					setGameError(false);
					guessMovie(inputValue);
				}}
			/>
		</div>
	);
};
