import './ClueButton.scss';

export type ClueButtonProps = {
	value: string | undefined;
	type: string;
};

export const ClueButton = ({ value, type }: ClueButtonProps) => {
	const getClassName = (value: string) => `button-${value}`;

	return <button className={getClassName(type)}>{value}</button>;
};
