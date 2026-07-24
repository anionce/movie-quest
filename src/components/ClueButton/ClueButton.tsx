import './ClueButton.scss';

export type ClueButtonProps = {
	value: string | undefined;
	type: string;
};

export const ClueButton = ({ value, type }: ClueButtonProps) => {
	const getClassName = () => `clue-button button-${type}`;

	return <button className={getClassName()}>{value}</button>;
};
