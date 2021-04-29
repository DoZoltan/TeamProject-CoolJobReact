import React, { useContext } from 'react';
import FavoriteList from './FavoriteList';
import styled from 'styled-components';
import { BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';

const StyledDiv = styled.div`
	width: 100%;
	float: right;
`;
const FavoriteDiv = styled.div`
	padding: 15px;
	background: #ececec;
`;

const MainDiv = styled.div`
	background-color: black;
`;

// The styled div will be replaced to a component
const LoadingAndError = styled.div`
	font-size: 200px;
	margin: auto;
`;

export const FavoriteBox = () => {
	const { AxiosGet, user, axiosData, axiosIsLoading, axiosError } = useContext(TheContext);

	// The user is a simple number now
	// After the user will be an object then we have to get the ID property of it
	AxiosGet(`https://localhost:44318/api/Favorites/${user}`);

	return (
		<MainDiv>
			<StyledDiv>
				<FavoriteDiv>
					{axiosError && <LoadingAndError>{axiosError}</LoadingAndError>}
					{axiosIsLoading && <LoadingAndError>Loading...</LoadingAndError>}
					{!axiosIsLoading && axiosData && <FavoriteList />}
				</FavoriteDiv>
			</StyledDiv>
			<BackTop />
		</MainDiv>
	);
};
export default FavoriteBox;
