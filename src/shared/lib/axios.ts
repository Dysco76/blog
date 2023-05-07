import axiosFactory, { AxiosError } from 'axios';

const axios = axiosFactory.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export { axios };
