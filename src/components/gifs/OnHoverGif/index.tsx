import { useState } from 'react';
import Gif from '../Gif';
import StaticGif from '../StaticGif';

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
			{!isHover && <StaticGif onClick={onClick} id={id} />}

			{isHover && <Gif onClick={onClick} id={id} />}
		</div>
	);
};

export default OnHoverGif;
