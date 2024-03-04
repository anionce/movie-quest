import './Input.scss';
import React from 'react';

type inputProps = {
	onInputChange?: (event: React.FormEvent<HTMLInputElement>) => void;
	searchText?: string;
};

export const Input = ({ onInputChange, searchText }: inputProps) => {
	return (
		<div className='input-container'>
			<label htmlFor='input'>Label</label>
			<input id='input' maxLength={100} onChange={onInputChange} value={searchText}></input>
		</div>
	);
};
