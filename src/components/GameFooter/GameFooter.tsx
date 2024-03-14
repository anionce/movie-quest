import './GameFooter.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoopIcon from '@mui/icons-material/Loop';
import { FooterButton } from '../FooterButton/FooterButton';
import { useSelector } from 'react-redux';
import { selectPoints } from '../../services/slices/scoreboardSlice';

export type GameFooterProps = { refreshPage: () => void; error: boolean; toggleModal: () => void };

export const GameFooter = ({ refreshPage, error, toggleModal }: GameFooterProps) => {
	const points = useSelector(selectPoints);

	const getClass = !error ? 'game-footer-points' : 'game-footer-points game-error';

	return (
		<div className='game-footer-container'>
			<FooterButton value={<HelpOutlineIcon />} type='help' action={toggleModal} />
			<div className={getClass}>{`${points}p`}</div>
			<FooterButton value={<LoopIcon />} type='reset' action={refreshPage} />
		</div>
	);
};
