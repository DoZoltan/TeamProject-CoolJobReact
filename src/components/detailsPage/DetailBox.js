import React, { useContext } from 'react';
import styled from 'styled-components';
import Detail from './Detail';
import FilterBar from '../filterbar/FilterBar';
import { BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';

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

// The styled div will be replaced to a component
const LoadingAndError = styled.div`
	font-size: 200px;
	margin: auto;
`;

export const DetailBox = () => {
	const { detail, axiosIsLoading, axiosError } = useContext(TheContext);

	return (
		<React.Fragment>
			<Div>
				<FilterBar />
			</Div>
			<StyledDiv>
				<DetailDiv>
					{axiosError && <LoadingAndError>{axiosError}</LoadingAndError>}
					{axiosIsLoading && <LoadingAndError>Loading...</LoadingAndError>}
					{/*detail will be null by default, so the length property will be invalid*/}
					{!axiosIsLoading && detail && <Detail />}
				</DetailDiv>
			</StyledDiv>
			<BackTop />
		</React.Fragment>
	);
};

export default DetailBox;
