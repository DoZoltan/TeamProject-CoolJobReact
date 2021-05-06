import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosGet = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const source = axios.CancelToken.source();
		axios
			.get(url, { cancelToken: source.token })
			.then((resp) => {
				setData(resp.data);
				setIsLoading(false);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					console.log('Request is cancelled');
				} else if (!err.response) {
					setIsLoading(false);
					setError('Connection error - no response');
				} else {
					if (err.response.status === 404) {
						setIsLoading(false);
						setError('404 error - page is not found');
					}
				}
			});
		return () => {
			source.cancel('Component got unmounted');
		};
	}, [url]);

	return { data, isLoading, error };
};

export default useAxiosGet;
