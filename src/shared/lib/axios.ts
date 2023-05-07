import axiosFactory from 'axios';
import { toast } from 'react-toastify';

const axios = axiosFactory.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.log(error)
            // The request was made and the server responded with a status code outside the range of 2xx
            toast.error(`Error ${error.response.status}: ${error.response.data.message || error.message}`);
        } else if (error.request) {
            // The request was made but no response was received
            toast.error('Request error: No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Error: ' + error.message);
        }
        return Promise.reject(error);
    }
);

export { axios };
