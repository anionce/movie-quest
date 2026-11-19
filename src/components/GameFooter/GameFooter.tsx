import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import { useTranslation } from 'react-i18next';
import { FooterButton } from '../FooterButton/FooterButton';
import './GameFooter.scss';

type GameFooterProps = {
	cluesLeft: number;
	error: boolean;
	onRestart: () => void;
	onShowRules: () => void;
	onShowLeaderboard: () => void;
};

export const GameFooter = ({ cluesLeft, error, onRestart, onShowRules, onShowLeaderboard }: GameFooterProps) => {
	const { t } = useTranslation();
	const isWarning = error || cluesLeft === 0;

	return (
		<div className='game-footer-container'>
			<FooterButton icon={<HelpOutlineIcon />} type='help' onClick={onShowRules} label={t('buttons.viewRules')} />
			<FooterButton
				icon={<EmojiEventsOutlinedIcon />}
				type='leaderboard'
				onClick={onShowLeaderboard}
				label={t('buttons.viewLeaderboard')}
			/>
			<div
				className={`game-footer-clues ${isWarning ? 'game-error' : ''}`}
				aria-label={t('clues.left', { count: cluesLeft })}
			>
				{cluesLeft}
				<LightbulbOutlinedIcon />
			</div>
			<FooterButton icon={<LoopIcon />} type='reset' onClick={onRestart} label={t('buttons.restartGame')} />
		</div>
	);
};
