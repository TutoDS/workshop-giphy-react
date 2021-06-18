import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {
	onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ onChange, ...props }: Props) => {
	return (
		<InputGroup w={'300px'}>
			<InputLeftElement
				pointerEvents='none'
				children={<FiSearch color='gray.300' />}
			/>
			<Input
				{...props}
				onChange={onChange}
				type='text'
				placeholder='Search'
			/>
		</InputGroup>
	);
};

export default SearchInput;
