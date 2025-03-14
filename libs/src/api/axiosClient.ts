import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL as string;

export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
