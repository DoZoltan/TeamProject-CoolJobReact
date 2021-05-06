import React, { useContext } from 'react';
import FavoriteList from './FavoriteList';
import styled from 'styled-components';
import { BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';

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

const FavoriteBox = () => {
	const { AxiosGet, user, axiosData, axiosIsLoading, axiosError } = useContext(TheContext);

	// The user is a simple number now
	// After the user will be an object then we have to get the ID property of it
	AxiosGet(`https://localhost:44318/api/Favorites/${user}`);

	return (
		<MainDiv>
			<StyledDiv>
				<FavoriteDiv>
					{axiosError && <Error />}
					{axiosIsLoading && <Load />}
					{!axiosIsLoading && axiosData && <FavoriteList />}
				</FavoriteDiv>
			</StyledDiv>
			<BackTop />
		</MainDiv>
	);
};
export default FavoriteBox;
