import { Box, Flex, Heading } from '@chakra-ui/react';
import Gif from 'components/Gif';
import GifGrid from 'components/GifGrid';
import SearchInput from 'components/inputs/SearchInput';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { ChangeEvent, useEffect, useState } from 'react';
import { getIdFromUrl } from 'utils/functions/getIdFromUrl';
import { giphyApi } from 'utils/giphyApi';

type GifType = {
	images: {
		original: {
			url: string;
		};
	};
};

type ListOfGifsType = {
	gifs: string[];
	currentSelected?: string;
};

const App = () => {
	const [listOfGifs, setListOfGifs] = useState<ListOfGifsType>({
		gifs: []
	});

	/**
	 * On Search method
	 * @param evt Change Event of input
	 */
	const onSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
		const params =
			evt.target.value.length > 0
				? { rating: 'g', q: evt.target.value }
				: { rating: 'g' };

		const endpoint = evt.target.value.length > 0 ? '/search' : '/trending';

		const { data } = await giphyApi.get(endpoint, {
			params
		});

		setListOfGifs((prevState) => ({
			...prevState,
			gifs: data.data.map((res: GifType): string =>
				getIdFromUrl(res.images.original.url)
			)
		}));
	};

	/**
	 * Set the current gif to show on left side
	 * @param id id of gif
	 */
	const setHasCurrent = (id: string) => {
		setListOfGifs((prevState) => ({
			...prevState,
			currentSelected: id
		}));
	};

	useEffect(() => {
		/**
		 * Get list of trending gifs to populate grid
		 */
		const fetchData = async () => {
			const { data } = await giphyApi.get('/trending', {
				params: {
					limit: '50',
					rating: 'g'
				}
			});

			setListOfGifs((prevState) => ({
				...prevState,
				gifs: data.data.map((res: GifType): string =>
					getIdFromUrl(res.images.original.url)
				)
			}));
		};

		/**
		 * Get a rondom gif to first load
		 */
		const getRandomGif = async () => {
			const { data } = await giphyApi.get('/random', {
				params: { rating: 'g' }
			});

			setListOfGifs((prevState) => ({
				...prevState,
				currentSelected: getIdFromUrl(data.data.images.original.url)
			}));
		};

		getRandomGif();
		fetchData();
	}, []);

	return (
		<Flex overflow={'hidden'} direction={['column', 'row']}>
			<Box flex={'1'} height={'100vh'} px={10} gap={10}>
				<Flex
					spacing={4}
					justifyContent={'space-between'}
					alignItems={'center'}
					py={[10, 20]}
				>
					<SearchInput onChange={onSearch} />

					<ThemeSwitcher
						size={'sm'}
						bgColor={'blue.600'}
						color={'white'}
						_hover={{ color: 'white', bgColor: 'blue.700' }}
					/>
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

					{listOfGifs.currentSelected && (
						<Gif id={listOfGifs.currentSelected} />
					)}
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
				<GifGrid gifs={listOfGifs.gifs} onClick={setHasCurrent} />
			</Box>
		</Flex>
	);
};

export default App;
