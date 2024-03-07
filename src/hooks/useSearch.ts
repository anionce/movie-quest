import { useState } from 'react';
import { Movie } from '../models/MovieResponse';

export const useSearch = (items: Movie[] | undefined) => {
	const [searchText, setSearchText] = useState<string>('');

	const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
		setSearchText(event.currentTarget.value);
	};

	const searchedItems = items
		?.filter(({ title }: Movie) => title.toLowerCase().includes(searchText.toLowerCase()))
		.map(({ title }: Movie) => title);

	const emptySearch = searchText.length === 0;

	return { onInputChange, searchedItems, searchText, emptySearch, setSearchText };
};
