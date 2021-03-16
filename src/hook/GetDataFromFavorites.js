import axios from 'axios';

export const GetDataFromFavorites = (url) => {
	return axios.get(url);
};

export default GetDataFromFavorites;
