import React, { createContext, useState } from 'react';
import useAxiosGet from '../axios/useAxiosGet';

export const TheContext = createContext();

export const TheProvider = (props) => {
	const [axiosData, setAxiosData] = useState(null);
	const [axiosIsLoading, setAxiosIsLoading] = useState(true);
	const [axiosError, setAxiosError] = useState(null);
	const [filteredJobs, setFilteredJobs] = useState(null);
	const [detail, setDetail] = useState(null);
	const [onJob, setOnJob] = useState(true);

	const AxiosGet = async (url) => {
		const { data, isLoading, error } = await useAxiosGet(url);
		setAxiosData(data);
		setAxiosIsLoading(isLoading);
		setAxiosError(error);
	};

	return (
		<TheContext.Provider
			value={{
				axiosIsLoading,
				axiosError,
				onJob,
				axiosData,
				filteredJobs,
				detail,
				setOnJob,
				setDetail,
				setFilteredJobs,
				AxiosGet,
			}}
		>
			{props.children}
		</TheContext.Provider>
	);
};

export default TheProvider;
