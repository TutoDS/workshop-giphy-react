import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import { GiphyContextProvider } from 'contexts/GiphyContext';
import App from 'pages/App';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from 'theme';

ReactDOM.render(
	<React.StrictMode>
		<GiphyContextProvider>
			<ChakraProvider resetCSS theme={theme}>
				<App />
			</ChakraProvider>
		</GiphyContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
