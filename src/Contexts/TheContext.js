import React, { createContext, useState } from 'react';
import useAxiosGet from '../axios/useAxiosGet';

export const TheContext = createContext();

export const TheProvider = (props) => {
	const [axiosData, setAxiosData] = useState(null);
	const [axiosIsLoading, setAxiosIsLoading] = useState(true);
	const [axiosError, setAxiosError] = useState(null);
	const [filteredJobs, setFilteredJobs] = useState(null);

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
				axiosData,
				filteredJobs,
				setFilteredJobs,
				AxiosGet,
			}}
		>
			{props.children}
		</TheContext.Provider>
	);
};

export default TheProvider;
