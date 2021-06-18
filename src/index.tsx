import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import App from 'pages/App';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from 'theme';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider resetCSS theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
