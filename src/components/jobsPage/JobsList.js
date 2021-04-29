import React, { useContext } from 'react';
import JobCard from './JobCard';
import { Row, BackTop } from 'antd';
import { TheContext } from '../../Contexts/TheContext';
import styled from 'styled-components';

// The styled div will be replaced to a component
const LoadingAndError = styled.div`
	font-size: 200px;
	margin: auto;
`;

export const JobsList = () => {
	const { filteredJobs, axiosIsLoading, axiosError } = useContext(TheContext);

	return (
		<div>
			{axiosError && <LoadingAndError>{axiosError}</LoadingAndError>}
			{axiosIsLoading && <LoadingAndError>Loading...</LoadingAndError>}
			{/*filteredJobs will be null by default, so the length property will be invalid*/}
			{!axiosIsLoading && filteredJobs && (
				<Row gutter={16}>
					{filteredJobs.map((job) => (
						<JobCard
							key={job.id}
							id={job.id}
							type={job.type}
							created_at={job.created_at}
							title={job.title}
							location={job.location}
							company_logo={job.company_logo}
							company={job.company}
							apply={job.how_to_apply}
							company_url={job.company_url}
							description={job.description}
						/>
					))}
				</Row>
			)}
			<BackTop />
		</div>
	);
};

export default JobsList;
