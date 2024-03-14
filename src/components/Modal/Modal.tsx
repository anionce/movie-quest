import './Modal.scss';
import ClearIcon from '@mui/icons-material/Clear';

export type ModalProps = {
	children: any;
	toggleModal: () => void;
};

export const Modal = ({ children, toggleModal }: ModalProps) => {
	return (
		<div className='modal-wrapper' onClick={toggleModal}>
			<div className='modal'>
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
