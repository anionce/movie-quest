import './ClueButton.scss';

export type ClueButtonProps = {
	value: string | undefined;
	type: string;
};

export const ClueButton = ({ value, type }: ClueButtonProps) => {
	const getClassName = () => `button-${type}`;

	return <button className={getClassName()}>{value}</button>;
};
