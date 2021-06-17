import { extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';
import colors from './partials/colors';
import ButtonStyles from './partials/components/button';
import fonts from './partials/fonts';

export default extendTheme({
	styles: {
		global: (props: Partial<GlobalStyleProps>) => ({
			'html, body': {
				backgroundColor: mode(
					colors.body.background.light,
					colors.body.background.dark
				)(props),
				color: mode(
					colors.body.color.light,
					colors.body.color.dark
				)(props)
			}
		})
	},
	fonts,
	colors,
	components: {
		Button: ButtonStyles
	}
});
