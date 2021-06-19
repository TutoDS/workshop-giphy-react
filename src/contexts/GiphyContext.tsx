import {
	ChangeEvent,
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';
import {
	GifType,
	GiphyContextType,
	StateGifsType
} from 'utils/@types/GiphyContext';
import { getIdFromUrl } from 'utils/functions/getIdFromUrl';
import { giphyApi } from 'utils/giphyApi';

type Props = {
	children: ReactNode;
};

export const GiphyContext = createContext({} as GiphyContextType);

export const GiphyContextProvider = ({ children }: Props) => {
	const [listOfGifs, setListOfGifs] = useState<StateGifsType>({
		gifs: []
	});

	useEffect(() => {
		const loadGifs = async () => {
			const { data } = await giphyApi.get('/trending', {
				params: {
					limit: '16',
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

		loadGifs();
	}, []);

	const onSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
		const params =
			evt.target.value.length > 0
				? { rating: 'g', q: evt.target.value, limit: '16' }
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

	const setCurrentGif = (id: string) =>
		setListOfGifs((prevState) => ({
			...prevState,
			current: id
		}));

	const loadRandomGif = async () => {
		const { data } = await giphyApi.get('/random', {
			params: { rating: 'g' }
		});

		setListOfGifs((prevState) => ({
			...prevState,
			current: getIdFromUrl(data.data.images.original.url)
		}));
	};

	const clearCurrentGif = () => {
		setListOfGifs((prevState) => ({
			...prevState,
			current: undefined
		}));
	};

	return (
		<GiphyContext.Provider
			value={{
				listOfGifs,
				onSearch,
				setCurrentGif,
				loadRandomGif,
				clearCurrentGif
			}}
		>
			{children}
		</GiphyContext.Provider>
	);
};

export const useGiphy = () => useContext(GiphyContext);
