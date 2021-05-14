import React, { useContext } from 'react';
import Detail from './Detail';
import { BackTop } from 'antd';
import Load from '../loadAndError/Load';
import Error from '../loadAndError/Error';
import { useHistory } from 'react-router-dom';
import useAxiosGet from '../../axios/useAxiosGet';
import { UserContext } from '../../Contexts/UserContext';

const DetailBox = () => {
	const { user } = useContext(UserContext);

	const history = useHistory();

	// Get the current path
	// It can be /favorites/:id OR /jobs/:id
	let pathName = history.location.pathname;

	let apiUrl = '';

	// Build the API URL depending on the current path
	if (pathName.includes('favorites')) {
		// The user is a simple number now
		// After the user will be an object then we have to get the ID property of it
		apiUrl = `https://localhost:44318/api${history.location.pathname}/${user}`;
	} else if (pathName.includes('jobs')) {
		apiUrl = `https://localhost:44318/api${history.location.pathname}`;
	} else {
		console.log('Error: How did you get here?');
	}

	// Get the data from the builded API URL
	const { data, isLoading, error } = useAxiosGet(apiUrl);

	// Load the job or the favorite details
	return (
		<React.Fragment>
			{error && <Error error={error} />}
			{isLoading && <Load />}
			{data && <Detail details={data} />}
			<BackTop />
		</React.Fragment>
	);
};

export default DetailBox;
