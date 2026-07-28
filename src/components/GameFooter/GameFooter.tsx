import './GameFooter.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoopIcon from '@mui/icons-material/Loop';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { FooterButton } from '../FooterButton/FooterButton';
import { useSelector } from 'react-redux';
import { selectCluesLeft } from '../../services/slices/scoreboardSlice';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useTranslation } from 'react-i18next';

export type GameFooterProps = {
	refreshPage: () => void;
	error: boolean;
	toggleModal: () => void;
	toggleLeaderboard: () => void;
};

export const GameFooter = ({ refreshPage, error, toggleModal, toggleLeaderboard }: GameFooterProps) => {
	const { t } = useTranslation();
	const cluesLeft = useSelector(selectCluesLeft);

	const shouldShowGameError = error || cluesLeft === 0;

	const getClass = !shouldShowGameError ? 'game-footer-clues' : 'game-footer-clues game-error';

	return (
		<div className='game-footer-container'>
			<FooterButton value={<HelpOutlineIcon />} type='help' action={toggleModal} label={t('buttons.viewRules')} />
			<FooterButton
				value={<EmojiEventsOutlinedIcon />}
				type='leaderboard'
				action={toggleLeaderboard}
				label={t('buttons.viewLeaderboard')}
			/>
			<div className={getClass}>
				{cluesLeft}
				<LightbulbOutlinedIcon />
			</div>
			<FooterButton value={<LoopIcon />} type='reset' action={refreshPage} label={t('buttons.restartGame')} />
		</div>
	);
};
