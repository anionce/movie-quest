import Autocomplete from '@mui/material/Autocomplete';
import './Input.scss';
import TextField from '@mui/material/TextField';
import { GuessButton } from '../GuessButton.tsx/GuessButton';
import { useState } from 'react';

type InputProps = {
	searchableResults: string[];
	guessMovie: (movie: string) => void;
};

export const Input = ({ searchableResults, guessMovie }: InputProps) => {
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
				onChange={(_, newValue) => setInputValue(newValue)}
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
			<GuessButton guessMovie={() => guessMovie(inputValue)} />
		</div>
	);
};
