import React, { useContext } from 'react';
import JobCard from './JobCard';
import { Row } from 'antd';
import { TheContext } from '../../Contexts/TheContext';

export const JobsList = () => {
	const { filteredJobs } = useContext(TheContext);

	return (
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
	);
};

export default JobsList;
