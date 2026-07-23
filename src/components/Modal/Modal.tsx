import { ReactNode } from 'react';
import './Modal.scss';
import ClearIcon from '@mui/icons-material/Clear';

export type ModalProps = {
	children: ReactNode;
	toggleModal: () => void;
};

export const Modal = ({ children, toggleModal }: ModalProps) => {
	return (
		<div className='modal-wrapper' onClick={toggleModal}>
			<div className='modal-container' onClick={e => e.stopPropagation()}>
				<button className='close-button' onClick={toggleModal}>
					<ClearIcon fontSize='small' />
				</button>
				<div>{children}</div>
			</div>
		</div>
	);
};
