import FilterBar from '../filterbar/FilterBar';
import React, { useContext } from 'react';
import JobsList from './JobsList';
import styled from 'styled-components';
import { FilterContext } from '../../Contexts/FilterContext';

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

const JobsBox = () => {
	const { optionsPositions, optionsType, optionsCompany, optionsLocation } = useContext(
		FilterContext
	);

	return (
		<React.Fragment>
			<Div>
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
			<StyledDiv>
				<JobsDiv>
					<JobsList />
				</JobsDiv>
			</StyledDiv>
		</React.Fragment>
	);
};
export default JobsBox;
