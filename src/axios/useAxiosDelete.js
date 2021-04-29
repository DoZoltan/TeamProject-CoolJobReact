import axios from 'axios';

export const useAxiosDelete = (url) => {
	axios.delete(url);
};

export default useAxiosDelete;
