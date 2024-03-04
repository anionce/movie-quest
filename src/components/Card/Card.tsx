import { Link } from 'react-router-dom';
import './Card.scss';
//import { useTranslation } from 'react-i18next';

export type CardProps = {
	item: any;
};

export const Card = ({ item }: CardProps) => {
	//const { t } = useTranslation();

	return (
		<div className='card'>
			<div className='row'>
				<div className='title-container'>
					<div>{item.title}</div>
					{/*  Icon */}
				</div>
				<div className='subtitle'>{item.type}</div>
			</div>
			<div className='row'>
				<Link to={'/link'}>
					<button>Button label</button>
				</Link>
			</div>
		</div>
	);
};
