import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { TokenPayload } from './interfaces';

export const API_URL = import.meta.env.VITE_API_URL as string;

export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const tokenPair = localStorage.getItem('token');

    if (tokenPair) {
      const parsedToken: TokenPayload | null = JSON.parse(tokenPair);

      if (parsedToken) {
        config.headers.Authorization = `Bearer ${parsedToken.accessToken}`;
      }
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
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }

    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
