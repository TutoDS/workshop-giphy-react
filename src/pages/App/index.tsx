import { Box, Center, Flex } from '@chakra-ui/react';
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
		<Flex overflow={'hidden'}>
			<Box flex={'1'} height={'100vh'} px={10} gap={10}>
				<Flex
					spacing={4}
					justifyContent={'space-between'}
					alignItems={'center'}
					py={10}
					px={20}
				>
					<SearchInput onChange={onSearch} />

					<ThemeSwitcher
						size={'sm'}
						bgColor={'blue.600'}
						color={'white'}
						_hover={{ color: 'white', bgColor: 'blue.700' }}
					/>
				</Flex>

				<Center>
					{listOfGifs.currentSelected && (
						<Gif id={listOfGifs.currentSelected} />
					)}
				</Center>
			</Box>
			<Box width={'25vw'}>
				<GifGrid gifs={listOfGifs.gifs} onClick={setHasCurrent} />
			</Box>
		</Flex>
	);
};

export default App;
