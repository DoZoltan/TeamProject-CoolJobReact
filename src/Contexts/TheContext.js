import React, { createContext, useState } from 'react';
import useAxiosGet from '../axios/useAxiosGet';

export const TheContext = createContext();

export const TheProvider = (props) => {
	const [axiosData, setAxiosData] = useState([]); //be null
	const [axiosIsLoading, setAxiosIsLoading] = useState([]); //be null
	const [axiosError, setAxiosError] = useState([]); //be null
	const [user, setUser] = useState(2); //be null (at it will be an object)
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [detail, setDetail] = useState([]);
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
				user,
				filteredJobs,
				detail,
				setOnJob,
				setDetail,
				setFilteredJobs,
				AxiosGet,
				setUser,
			}}
		>
			{props.children}
		</TheContext.Provider>
	);
};

export default TheProvider;
