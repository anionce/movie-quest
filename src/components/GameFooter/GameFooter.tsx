import './GameFooter.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoopIcon from '@mui/icons-material/Loop';
import { FooterButton } from '../FooterButton/FooterButton';
import { useSelector } from 'react-redux';
import { selectCluesLeft } from '../../services/slices/scoreboardSlice';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export type GameFooterProps = { refreshPage: () => void; error: boolean; toggleModal: () => void };

export const GameFooter = ({ refreshPage, error, toggleModal }: GameFooterProps) => {
	const cluesLeft = useSelector(selectCluesLeft);

	const shouldShowGameError = error || cluesLeft === 0;

	const getClass = !shouldShowGameError ? 'game-footer-clues' : 'game-footer-clues game-error';

	return (
		<div className='game-footer-container'>
			<FooterButton value={<HelpOutlineIcon />} type='help' action={toggleModal} />
			<div className={getClass}>
				{cluesLeft}
				<LightbulbOutlinedIcon />
			</div>
			<FooterButton value={<LoopIcon />} type='reset' action={refreshPage} />
		</div>
	);
};
