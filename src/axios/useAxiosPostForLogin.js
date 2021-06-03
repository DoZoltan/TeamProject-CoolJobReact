import axios from 'axios';

export const UseAxiosPostForLogin = (loginForm, _url) => {
	let data = JSON.stringify(loginForm);
	axios
		.post(_url, data, {
			headers: { 'Content-Type': 'application/json' },
		})
		.then((resp) => {
			console.log(resp);
		});
};

export default UseAxiosPostForLogin;
