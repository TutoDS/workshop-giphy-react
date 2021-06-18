import { Grid } from '@chakra-ui/react';
import Gif from 'components/Gif';

type Props = {
	gifs: string[];
	onClick: (id: string) => void;
};

const GifGrid = ({ gifs, onClick, ...props }: Props) => {
	return (
		<Grid
			maxH={'100vh'}
			overflowY={'auto'}
			padding={10}
			templateColumns={['1fr', 'repeat(2, 1fr)']}
			gap={4}
		>
			{gifs.map((gif) => (
				<Gif
					{...props}
					onClick={() => onClick(gif)}
					id={gif}
					key={gif}
				/>
			))}
		</Grid>
	);
};

export default GifGrid;
