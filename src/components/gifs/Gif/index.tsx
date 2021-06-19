import { Center, Image, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
	id: string;
	onClick?: () => void;
};

const Gif = ({ id, onClick, ...props }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const url = `https://media4.giphy.com/media/${id}/giphy.gif`;

	return (
		<Center minH={'200px'} minW={'200px'}>
			{isLoading && <Spinner size={'xl'} label={'Loading Gif!'} />}

			<Image
				width={'500px'}
				onClick={onClick && onClick}
				{...props}
				cursor={onClick ? 'pointer' : 'default'}
				src={url}
				alt={'gif'}
				display={isLoading ? 'none' : ''}
				style={!isLoading ? {} : { display: 'none' }}
				onLoad={() => setIsLoading(false)}
			/>
		</Center>
	);
};

export default Gif;
