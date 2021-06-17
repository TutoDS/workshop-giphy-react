import { Image } from '@chakra-ui/react';

type Props = {
	id: string;
	onClick?: () => void;
};

const Gif = ({ id, onClick, ...props }: Props) => {
	const url = `https://media4.giphy.com/media/${id}/giphy.gif`;

	return (
		<Image
			onClick={onClick && onClick}
			{...props}
			cursor={onClick ? 'pointer' : 'default'}
			src={url}
			alt={'gif'}
		/>
	);
};

export default Gif;
