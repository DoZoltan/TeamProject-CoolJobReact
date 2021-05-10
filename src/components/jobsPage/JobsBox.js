import FilterBar from '../filterbar/FilterBar';
import React, { useContext } from 'react';
import JobsList from './JobsList';
import styled from 'styled-components';
import { FilterContext } from '../../Contexts/FilterContext';

const JobsDiv = styled.div`
	padding: 15px;
	background: #ececec;
`;

const Div = styled.div`
	position: fixed;
	float: left;
	background: #ececec;
`;

const JobsBox = () => {
	const { optionsPositions, optionsType, optionsCompany, optionsLocation } = useContext(
		FilterContext
	);

	return (
		<React.Fragment>
			<Div className='filterDiv'>
				{optionsPositions.length > 0 &&
					optionsType.length > 0 &&
					optionsCompany.length > 0 &&
					optionsLocation.length > 0 && (
						<FilterBar
							optionsPositions={optionsPositions}
							optionsType={optionsType}
							optionsCompany={optionsCompany}
							optionsLocation={optionsLocation}
						/>
					)}
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
