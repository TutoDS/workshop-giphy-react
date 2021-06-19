import { ChangeEvent } from 'react';

type GiphyContextType = {
	listOfGifs: StateGifsType;
	onSearch: (evt: ChangeEvent<HTMLInputElement>) => void;
	setCurrentGif: (id: string) => void;
	loadRandomGif: () => void;
	clearCurrentGif: () => void;
};

type GifType = {
	images: {
		original: {
			url: string;
		};
	};
};

type StateGifsType = {
	gifs: string[];
	current?: string;
};

export { GiphyContextType, GifType, StateGifsType };
