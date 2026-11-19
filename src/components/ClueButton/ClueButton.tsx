import './ClueButton.scss';

export const ClueButton = ({ value, type }: { value?: string; type: string }) => (
	<span className={`clue-button button-${type}`}>{value}</span>
);
