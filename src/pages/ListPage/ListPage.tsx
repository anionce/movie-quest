/* import { Input } from '../../components/Input/Input';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { useFilter } from '../../hooks/useFilter';
import { usePagination } from '../../hooks/usePagination';
import { useSearch } from '../../hooks/useSearch';
import { useGetSomething1Query } from '../../services/api/exampleApi';
import { ErrorPage } from '../ErrorPage/ErrorPage'; */

export const ListPage = () => {
	// const { data, isLoading } = useGetSomething1Query({});
	//const { onInputChange, searchedItems, searchText, emptySearch } = useSearch("");
	// const { filteredItems, emptyFilter, onTypeChanged } = useFilter(data);
	//let { currentItems, paginate, currentPage, pagesPerPage } = usePagination("");
	/* const searchedArray = !emptySearch ? searchedItems : data;
	const filteredArray = !emptyFilter ? filteredItems : data;
	const finalResult = [];
 */

	return (
		<></>
		/* 	<>
			<Input searchText={searchText} onInputChange={onInputChange} />
			<TypeFilter onTypeChanged={onTypeChanged} itemFilterTypes={''} defaultOption={''} />
			{isLoading && <Loader>}
			{isError && <ErrorPage />}
			{currentItems && currentItems?.length === 0 && <ErrorPage />}
			<div className='list-container'>
				{currentItems?.map((item: Rocket) => (
					<Card key={item.id} item={item} />
				))}
				<Pagination
					count={finalResult?.length}
					paginate={paginate}
					pagesPerPage={pagesPerPage}
					currentPage={currentPage}
				/>
			</div>
		</> */
	);
};
