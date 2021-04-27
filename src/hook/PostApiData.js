import axios from 'axios';

export const PostApiData = (job, _url) => {
	let data = JSON.stringify(job);
	axios.post(_url, data, {
		headers: { 'Content-Type': 'application/json' },
		params: { userID: 2 },
	});
};

export default PostApiData;
