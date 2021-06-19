import { IconButton, IconButtonProps } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type Props = Omit<IconButtonProps, 'aria-label'> & {};

const ThemeSwitcher: React.FC<Partial<Props>> = ({
	variant,
	size,
	...attributes
}) => {
	const { toggleColorMode } = useColorMode();
	const SwitchIcon = useColorModeValue(FiMoon, FiSun);

	return (
		<IconButton
			colorScheme={'teal'}
			{...attributes}
			onClick={toggleColorMode}
			variant={variant || 'solid'}
			outline={'none'}
			borderRadius={50}
			aria-label='Theme mode switcher'
			size={size || 'lg'}
			icon={<SwitchIcon />}
		/>
	);
};

export { ThemeSwitcher };
