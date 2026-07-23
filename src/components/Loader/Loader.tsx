import './Loader.scss';

export const Loader = () => {
	return (
		<div className='loader-container'>
			<div className='loader-reel'>
				<span className='loader-reel__hole' />
				<span className='loader-reel__hole' />
				<span className='loader-reel__hole' />
			</div>
			<span className='loader-text'>Picking a movie…</span>
		</div>
	);
};
