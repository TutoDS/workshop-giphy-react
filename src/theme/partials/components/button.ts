import { ButtonProps } from '@chakra-ui/button';
import { darken, mode, whiten } from '@chakra-ui/theme-tools';

const ButtonStyles = {
	baseStyle: {
		fontWeight: 'bold'
	},
	variants: {
		primary: (props: ButtonProps) => ({
			bg: 'primary',
			color: 'white',
			_hover: {
				bg: mode(whiten('primary', 20), darken('primary', 10))(props)
			}
		}),
		secondary: (props: ButtonProps) => ({
			bg: 'secondary',
			color: 'white',
			_hover: {
				bg: mode(
					whiten('secondary', 10),
					darken('secondary', 20)
				)(props)
			}
		}),
		themeSwitcher: (props: ButtonProps) => ({
			bg: mode('body.background.dark', 'body.background.light')(props),
			color: mode('body.color.dark', 'body.color.light')(props),
			_hover: {
				color: 'primary',
				bg: 'white',
				boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.5)'
			}
		})
	}
};

export default ButtonStyles;
