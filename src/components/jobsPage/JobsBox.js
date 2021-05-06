import FilterBar from '../filterbar/FilterBar';
import React from 'react';
import JobsList from './JobsList';
import styled from 'styled-components';

const JobsDiv = styled.div`
	padding: 15px;
	background: #ececec;
`;

const Div = styled.div`
	position: fixed;
	float: left;
	background: #ececec;
`;
export const JobsBox = () => {
	return (
		<React.Fragment>
			<Div className='filterDiv'>
				<FilterBar />
			</Div>
			<div className='jobsDiv'>
				<JobsDiv>
					<JobsList />
				</JobsDiv>
			</div>
		</React.Fragment>
	);
};
export default JobsBox;
