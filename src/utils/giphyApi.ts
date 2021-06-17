import axios from 'axios';
const { REACT_APP_GIPHY_API, REACT_APP_GIPHY_URL } = process.env;

const giphyApi = axios.create({
	baseURL: REACT_APP_GIPHY_URL || 'https://api.giphy.com/v1/gifs',
	params: {
		api_key: REACT_APP_GIPHY_API || ''
	}
});

export { giphyApi };
