import { Grid } from '@chakra-ui/react';
import { useGiphy } from 'contexts/GiphyContext';
import OnHoverGif from '../OnHoverGif';

const GifGrid = () => {
	const { listOfGifs, setCurrentGif } = useGiphy();

	return (
		<Grid
			maxH={'100vh'}
			overflowY={'auto'}
			padding={10}
			templateColumns={['1fr', 'repeat(2, 1fr)']}
			gap={4}
		>
			{listOfGifs?.gifs.map((gif: string) => (
				// <StaticGif
				// 	onClick={() => setCurrentGif(gif)}
				// 	id={gif}
				// 	key={gif}
				// />
				<OnHoverGif
					id={gif}
					key={gif}
					onClick={() => setCurrentGif(gif)}
				/>
			))}
		</Grid>
	);
};

export default GifGrid;
