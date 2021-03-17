import FilterBar from '../filterbar/FilterBar';
import React from 'react';
import JobsList from './JobsList';
import styled from 'styled-components';
import { BackTop } from 'antd';

const StyledDiv = styled.div`
	width: 85%;
	float: right;
`;

const JobsDiv = styled.div`
	padding: 15px;
	background: #ececec;
`;

const Div = styled.div`
	position: fixed;
	float: left;
`;
const MemoizedSubComponent = React.memo(FilterBar);
export const JobsBox = () => {
	return (
		<React.Fragment>
			<Div>
				<MemoizedSubComponent />
			</Div>
			<StyledDiv>
				<JobsDiv>
					<JobsList />
				</JobsDiv>
			</StyledDiv>
			<BackTop />
		</React.Fragment>
	);
};
export default JobsBox;
