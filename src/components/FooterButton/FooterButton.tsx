import { ReactElement } from 'react';
import './FooterButton.scss';

export type FooterButtonProps = {
	value: ReactElement;
	type: string;
	action: () => void;
};

export const FooterButton = ({ value, type, action }: FooterButtonProps) => {
	const getClassName = () => `button-${type}`;
	return (
		<button onClick={action} className={getClassName()}>
			{value}
		</button>
	);
};
