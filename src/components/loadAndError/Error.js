import { TheContext } from '../../Contexts/TheContext';
import { useContext } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	font-size: 100px;
`;

const Error = (props) => {
	//remove this, and use only the props version if possible
	const { axiosError } = useContext(TheContext);

	return (
		<StyledDiv>
			<p>{axiosError}</p>
			<div>{props.error && <p>{props.error}</p>}</div>
		</StyledDiv>
	);
};

export default Error;
