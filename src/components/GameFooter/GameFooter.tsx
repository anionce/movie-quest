import './GameFooter.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoopIcon from '@mui/icons-material/Loop';
import { FooterButton } from '../FooterButton/FooterButton';
import { useSelector } from 'react-redux';
import { selectPoints } from '../../services/slices/scoreboardSlice';

export type GameFooterProps = { refreshPage: () => void };

export const GameFooter = ({ refreshPage }: GameFooterProps) => {
	const points = useSelector(selectPoints);

	return (
		<div className='game-footer-container'>
			<FooterButton value={<HelpOutlineIcon />} type='help' action={() => ''} />
			{`${points}p`}
			<FooterButton value={<LoopIcon />} type='reset' action={refreshPage} />
		</div>
	);
};
