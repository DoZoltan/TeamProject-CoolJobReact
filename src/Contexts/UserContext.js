import React, { createContext, useState } from 'react';
//import useAxiosGet from '../axios/useAxiosGet';

export const UserContext = createContext();

export const UserProvider = (props) => {
	//const [axiosIsLoading, setAxiosIsLoading] = useState(true);
	//const [axiosError, setAxiosError] = useState(null);
	const [user, setUser] = useState(2); //will be null by default (after it will be an object)

	//const { data, isLoading, error } = useAxiosGet(url);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
