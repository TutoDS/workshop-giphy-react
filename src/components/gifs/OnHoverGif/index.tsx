import { useState } from 'react';
import Gif from '../Gif';

type Props = {
	id: string;
	onClick: () => void;
};

const OnHoverGif = ({ id, onClick }: Props) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{!isHover && <Gif isStatic onClick={onClick} id={id} />}

			{isHover && <Gif onClick={onClick} id={id} />}
		</div>
	);
};

export default OnHoverGif;
