import axios from 'axios';

export const UseAxiosPostForJob = (job, _url) => {
	let data = JSON.stringify(job);
	axios.post(_url, data, {
		headers: { 'Content-Type': 'application/json' },
		params: { userId: 'c075aa2c-fa12-443d-a2f1-a2b3a67bd063' },
	});
};

export default UseAxiosPostForJob;
