import React, { createContext, useState } from 'react';
import useAxiosGet from '../axios/useAxiosGet';

export const TheContext = createContext();

export const TheProvider = (props) => {
	const [axiosData, setAxiosData] = useState([]); //be null
	const [axiosIsLoading, setAxiosIsLoading] = useState([]); //be null
	const [axiosError, setAxiosError] = useState([]); //be null

	const AxiosGet = (url) => {
		const { data, isLoading, error } = useAxiosGet(url);
		setAxiosData(data);
		setAxiosIsLoading(isLoading);
		setAxiosError(error);
	};

	return (
		<TheContext.Provider value={{ axiosData, AxiosGet }}>{props.children}</TheContext.Provider>
	);
};

export default TheProvider;