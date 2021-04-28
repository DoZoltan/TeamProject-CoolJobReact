import FilterBar from '../filterbar/FilterBar';
import React from 'react';
import JobsList from './JobsList';
import styled from 'styled-components';

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
export const JobsBox = () => {
	return (
		<React.Fragment>
			<Div>
				<FilterBar />
			</Div>
			<StyledDiv>
				<JobsDiv>
					<JobsList />
				</JobsDiv>
			</StyledDiv>
		</React.Fragment>
	);
};
export default JobsBox;
