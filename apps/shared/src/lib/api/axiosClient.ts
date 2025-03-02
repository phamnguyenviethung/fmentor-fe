import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL as string;

export const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    function (config) {


        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    async function (response: AxiosResponse) {
        return response;
    },
    function (error: AxiosError) {
        console.error(error);
        return Promise.reject(error);
    }
);

export default axiosClient;