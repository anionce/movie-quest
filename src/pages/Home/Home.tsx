import './Home.scss';
import { useTranslation } from 'react-i18next';

export const Home = () => {
	const { t } = useTranslation();

	// const { data, isLoading } = useGetSomething1Query({});
	//const { onInputChange, searchedItems, searchText, emptySearch } = useSearch("");
	// const { filteredItems, emptyFilter, onTypeChanged } = useFilter(data);
	//let { currentItems, paginate, currentPage, pagesPerPage } = usePagination("");

	return <>{t('placeholder.home.title')}</>;
};
