import type { ReactElement } from 'react';
import './FooterButton.scss';

type FooterButtonProps = {
	icon: ReactElement;
	type: string;
	label: string;
	onClick: () => void;
};

export const FooterButton = ({ icon, type, label, onClick }: FooterButtonProps) => (
	<button type='button' onClick={onClick} className={`button-${type}`} aria-label={label}>
		{icon}
	</button>
);
