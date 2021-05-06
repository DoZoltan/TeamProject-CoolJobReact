import { TheContext } from '../../Contexts/TheContext';
import { useContext } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	font-size: 100px;
`;

const Error = () => {
	const { axiosError } = useContext(TheContext);

	return <StyledDiv>{axiosError}</StyledDiv>;
};

export default Error;
