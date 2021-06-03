import React, { createContext, useState } from 'react';
//import useAxiosGet from '../axios/useAxiosGet';

export const UserContext = createContext();

export const UserProvider = (props) => {
	//const [axiosIsLoading, setAxiosIsLoading] = useState(true);
	//const [axiosError, setAxiosError] = useState(null);
	const [user, token, setUser, setToken] = useState('c075aa2c-fa12-443d-a2f1-a2b3a67bd063'); //will be null by default (after it will be an object)

	//const { data, isLoading, error } = useAxiosGet(url);

	return (
		<UserContext.Provider
			value={{
				user,
				token,
				setToken,
				setUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
