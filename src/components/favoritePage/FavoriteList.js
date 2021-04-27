import React, { useContext } from 'react';
//import { FavoriteJobContext } from '../../Contexts/FavoriteJobContext';
import JobCard from '../jobsPage/JobCard';
import { Row } from 'antd';
import { TheContext } from '../../Contexts/TheContext';

export const FavoriteList = () => {
	//const { favoriteJobs } = useContext(FavoriteJobContext);
	const { axiosData } = useContext(TheContext);

	return (
		<Row gutter={16}>
			{axiosData.map((job) => (
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

export default FavoriteList;
