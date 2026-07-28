import { ReactNode } from 'react';
import './Modal.scss';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

export type ModalProps = {
	children: ReactNode;
	toggleModal: () => void;
};

export const Modal = ({ children, toggleModal }: ModalProps) => {
	const { t } = useTranslation();

	return (
		<div className='modal-wrapper' onClick={toggleModal}>
			<div className='modal-content' onClick={event => event.stopPropagation()}>
				<button className='close-button' onClick={toggleModal} aria-label={t('buttons.close')}>
					<ClearIcon />
				</button>
				<div className='modal-container'>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};
