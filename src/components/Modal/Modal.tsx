import type { ReactNode } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import './Modal.scss';

export const Modal = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
	const { t } = useTranslation();

	return (
		<div className='modal-wrapper' onClick={onClose}>
			<div className='modal-content' role='dialog' aria-modal='true' onClick={event => event.stopPropagation()}>
				<button type='button' className='close-button' onClick={onClose} aria-label={t('buttons.close')}>
					<ClearIcon />
				</button>
				<div className='modal-container'>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};
