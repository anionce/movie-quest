import { ReactElement } from 'react';
import './FooterButton.scss';

export type FooterButtonProps = {
	value: ReactElement;
	type: string;
	action: () => void;
	label?: string;
};

export const FooterButton = ({ value, type, action, label }: FooterButtonProps) => {
	const getClassName = () => `button-${type}`;
	return (
		<button onClick={action} className={getClassName()} aria-label={label ?? type}>
			{value}
		</button>
	);
};
