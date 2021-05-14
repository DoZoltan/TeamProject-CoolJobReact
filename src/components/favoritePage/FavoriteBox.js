import React, { useContext } from 'react';
import FavoriteList from './FavoriteList';
import styled from 'styled-components';
import { BackTop } from 'antd';
import { UserContext } from '../../Contexts/UserContext';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';
import useAxiosGet from '../../axios/useAxiosGet';

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
	const { user } = useContext(UserContext);

	// The user is a simple number now
	// After the user will be an object then we have to get the ID property of it
	const { data, isLoading, error } = useAxiosGet(`https://localhost:44318/api/Favorites/${user}`);

	return (
		<MainDiv>
			<StyledDiv>
				<FavoriteDiv>
					{error && <Error error={error} />}
					{isLoading && <Load />}
					{!isLoading && data && <FavoriteList favorites={data} />}
				</FavoriteDiv>
			</StyledDiv>
			<BackTop />
		</MainDiv>
	);
};
export default FavoriteBox;
