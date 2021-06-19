import { Box, Flex, Heading } from '@chakra-ui/react';
import CurrentGif from 'components/gifs/CurrentGif';
import GifGrid from 'components/gifs/GifGrid';
import SearchInput from 'components/inputs/SearchInput';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { useGiphy } from 'contexts/GiphyContext';

const App = () => {
	const { onSearch } = useGiphy();

	return (
		<Flex overflow={'hidden'} direction={['column', 'row']}>
			<Box flex={'1'} height={'100vh'} px={10} gap={10}>
				<Flex
					spacing={4}
					justifyContent={'space-between'}
					alignItems={'center'}
					py={10}
				>
					<SearchInput onChange={onSearch} />

					<ThemeSwitcher size={'sm'} />
				</Flex>

				<Flex
					alignItems={'center'}
					justifyContent={'center'}
					direction={'column'}
					gap={2}
				>
					<Heading
						as={'h2'}
						display={['', 'none']}
						color={'blue.200'}
						mb={4}
						fontWeight={'300'}
					>
						Current Selected Gif
					</Heading>

					<CurrentGif />
				</Flex>
			</Box>
			<Box width={['100%', '25vw']} mt={[10, 0]}>
				<Heading
					textAlign={'center'}
					as={'h2'}
					fontWeight={'300'}
					display={['', 'none']}
					mb={4}
				>
					List of Gifs
				</Heading>
				<GifGrid />
			</Box>
		</Flex>
	);
};

export default App;
