import { Button, Flex, Heading, Image, Spinner } from '@chakra-ui/react';
import { useGiphy } from 'contexts/GiphyContext';
import { useState } from 'react';
import { FiFrown, FiSmile } from 'react-icons/fi';

const CurrentGif = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { listOfGifs, loadRandomGif, clearCurrentGif } = useGiphy();

	return (
		<>
			{!listOfGifs.current && (
				<>
					<Heading as={'h3'}>
						You haven't selected any gif yet!
					</Heading>

					<Button
						mt={4}
						onClick={loadRandomGif}
						colorScheme={'teal'}
						leftIcon={<FiSmile />}
					>
						<span>Load Random Gif</span>
					</Button>
				</>
			)}

			{listOfGifs.current && (
				<Flex
					direction={'column'}
					alignItems={'center'}
					justifyContent={'center'}
					minH={'200px'}
					minW={'200px'}
				>
					{isLoading && (
						<Spinner size={'xl'} label={'Loading Gifs!'} />
					)}

					<Image
						src={`https://media4.giphy.com/media/${listOfGifs.current}/giphy.gif`}
						alt={'gif'}
						display={isLoading ? 'none' : ''}
						style={!isLoading ? {} : { display: 'none' }}
						onLoad={() => setIsLoading(false)}
					/>

					<Button
						mt={4}
						onClick={clearCurrentGif}
						colorScheme={'teal'}
						leftIcon={<FiFrown />}
					>
						<span>Clear Current Gif</span>
					</Button>
				</Flex>
			)}
		</>
	);
};

export default CurrentGif;
