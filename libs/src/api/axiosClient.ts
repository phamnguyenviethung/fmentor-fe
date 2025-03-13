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
    const token: TokenPayload | null = JSON.parse(
      localStorage.getItem('token') as string
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
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
