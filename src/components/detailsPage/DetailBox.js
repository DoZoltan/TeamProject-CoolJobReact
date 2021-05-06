import React, { useContext } from 'react';
import styled from 'styled-components';
import Detail from './Detail';
import FilterBar from '../filterbar/FilterBar';
import { BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';

const DetailDiv = styled.div`
	background-color: black;
`;

const StyledDiv = styled.div`
	width: 85%;
	float: right;
`;

const Div = styled.div`
	position: fixed;
	float: left;
`;

const DetailBox = () => {
	const { detail, axiosIsLoading, axiosError } = useContext(TheContext);

	return (
		<React.Fragment>
			<Div>
				<FilterBar />
			</Div>
			<StyledDiv>
				<DetailDiv>
					{axiosError && <Error />}
					{axiosIsLoading && <Load />}
					{/*detail will be null by default, so the length property will be invalid*/}
					{!axiosIsLoading && detail && <Detail />}
				</DetailDiv>
			</StyledDiv>
			<BackTop />
		</React.Fragment>
	);
};

export default DetailBox;
