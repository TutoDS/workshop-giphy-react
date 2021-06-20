import { Center, Image, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
	id: string;
	isStatic?: boolean;
	onClick?: () => void;
};

const Gif = ({ id, isStatic = false, onClick, ...props }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [extension, setExtension] = useState<string>(
		isStatic ? '480w_s.jpg' : 'giphy.gif'
	);

	const url = `https://media4.giphy.com/media/${id}/${extension}`;

	return (
		<Center minH={'200px'} minW={'200px'}>
			{isLoading && <Spinner size={'xl'} label={'Loading Gif!'} />}

			<Image
				onError={() => setExtension('giphy.gif')}
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
