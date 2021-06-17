import {
	Box,
	Center,
	Flex,
	Grid,
	Input,
	InputGroup,
	InputLeftElement,
	Spinner
} from '@chakra-ui/react';
import Gif from 'components/Gif';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
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

	const onChange = async (evt: ChangeEvent<HTMLInputElement>) => {
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

	const setHasCurrent = (id: string) => {
		setListOfGifs((prevState) => ({
			...prevState,
			currentSelected: id
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await giphyApi.get('/trending', {
				params: {
					limit: '50',
					rating: 'g'
				}
			});

			return data;
		};

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

		const getIds = async () => {
			const results = await fetchData();

			setListOfGifs((prevState) => ({
				...prevState,
				gifs: results.data.map((res: GifType): string =>
					getIdFromUrl(res.images.original.url)
				)
			}));
		};

		getIds();
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
					<InputGroup w={'300px'}>
						<InputLeftElement
							pointerEvents='none'
							children={<FiSearch color='gray.300' />}
						/>
						<Input
							onChange={onChange}
							type='text'
							placeholder='Search'
						/>
					</InputGroup>

					<ThemeSwitcher
						size={'sm'}
						bgColor={'blue.600'}
						color={'white'}
						_hover={{ color: 'white', bgColor: 'blue.700' }}
					/>
				</Flex>

				<Center>
					{listOfGifs.currentSelected ? (
						<Gif id={listOfGifs.currentSelected} />
					) : (
						<Spinner size={'xl'} label={'Loading Gif!'} />
					)}
				</Center>
			</Box>
			<Box>
				{listOfGifs.gifs ? (
					<Grid
						maxH={'100vh'}
						overflowY={'auto'}
						width={'25vw'}
						padding={10}
						templateColumns={'repeat(2, 1fr)'}
						gap={4}
					>
						{listOfGifs.gifs.map((gif) => (
							<Gif
								onClick={() => setHasCurrent(gif)}
								id={gif}
								key={gif}
							/>
						))}
					</Grid>
				) : (
					<Spinner size={'xl'} label={'Loading Gifs!'} />
				)}
			</Box>
		</Flex>
	);
};

export default App;
