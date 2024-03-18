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
			<div>
				<button className='close-button' onClick={toggleModal}>
					<ClearIcon />
				</button>
				<div className='modal-container'>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};
