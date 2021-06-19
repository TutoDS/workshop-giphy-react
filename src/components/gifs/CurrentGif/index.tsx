import { Button, Flex, Heading } from '@chakra-ui/react';
import { useGiphy } from 'contexts/GiphyContext';
import { FiFrown, FiSmile } from 'react-icons/fi';
import Gif from '../Gif';

const CurrentGif = () => {
	const { listOfGifs, loadRandomGif, clearCurrentGif } = useGiphy();

	return (
		<>
			{!listOfGifs.current && (
				<>
					<Heading as={'h3'} fontSize={'md'} textAlign={'center'}>
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
					<Gif id={listOfGifs.current} />

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
