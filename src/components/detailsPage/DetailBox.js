import React from 'react';
import styled from 'styled-components';
import Detail from './Detail';
import FilterBar from '../filterbar/FilterBar';
import { BackTop } from 'antd';

const DetailDiv = styled.div`
	background-color: black;
`;

const Div = styled.div`
	position: fixed;
	float: left;
`;
export const DetailBox = () => {
	return (
		<React.Fragment>
			<div>
				<DetailDiv>
					<Detail />
				</DetailDiv>
			</div>
			<BackTop />
		</React.Fragment>
	);
};

export default DetailBox;
