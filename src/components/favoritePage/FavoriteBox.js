import React, { useContext } from 'react';
import FavoriteList from './FavoriteList';
import styled from 'styled-components';
import { BackTop } from 'antd';
import { FavoriteJobContext } from '../../Contexts/FavoriteJobContext';

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

export const FavoriteBox = () => {
	const { ReloadFavoriteJobs } = useContext(FavoriteJobContext);

	ReloadFavoriteJobs();

	return (
		<MainDiv>
			<StyledDiv>
				<FavoriteDiv>
					<FavoriteList />
				</FavoriteDiv>
			</StyledDiv>
			<BackTop />
		</MainDiv>
	);
};
export default FavoriteBox;
