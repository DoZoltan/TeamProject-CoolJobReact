import React, { useContext } from 'react';
import Detail from './Detail';
import { BackTop } from 'antd';
//import { TheContext } from '../../Contexts/TheContext';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';
import { useHistory } from 'react-router-dom';
import useAxiosGet from '../../axios/useAxiosGet';
import { UserContext } from '../../Contexts/UserContext';

const DetailBox = () => {
	//const { detail, axiosIsLoading, axiosError } = useContext(TheContext);
	const { user } = useContext(UserContext);

	const history = useHistory();

	let pathName = history.location.pathname;
	let axiosUrl = '';

	if (pathName.includes('favorites')) {
		// The user is a simple number now
		// After the user will be an object then we have to get the ID property of it
		axiosUrl = `https://localhost:44318/api${history.location.pathname}/${user}`;
	} else if (pathName.includes('jobs')) {
		axiosUrl = `https://localhost:44318/api${history.location.pathname}`;
	} else {
		console.log('error');
	}

	const { data, isLoading, error } = useAxiosGet(axiosUrl);

	return (
		<React.Fragment>
			{error && <Error error={error} />}
			{isLoading && <Load />}
			{data && <Detail details={data} />}
			<BackTop />
		</React.Fragment>
	);

	/*
	return (
		<React.Fragment>
			{axiosError && <Error />}
			{axiosIsLoading && <Load />}
			{!axiosIsLoading && detail && <Detail details={detail} />}
			<BackTop />
		</React.Fragment>
	);
	*/
};

export default DetailBox;
