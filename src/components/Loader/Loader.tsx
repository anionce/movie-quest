import './Loader.scss';

export const Loader = () => {
	return (
		<div className='loader-container'>
			<div className='loader-skeleton loader-skeleton--input' />
			<div className='loader-skeleton loader-skeleton--pill' />
			<div className='loader-skeleton-row'>
				<div className='loader-skeleton loader-skeleton--chip' />
				<div className='loader-skeleton loader-skeleton--chip' />
			</div>
			<div className='loader-skeleton loader-skeleton--card' />
			<span className='loader-text'>Picking a movie...</span>
		</div>
	);
};
