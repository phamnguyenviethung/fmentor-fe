/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, axiosClient, Pagination } from '@libs';
import type { DataProvider } from '@refinedev/core';
import { AxiosRequestConfig } from 'axios';

export const dataProvider: DataProvider = {
  getOne: ({ resource, id, meta }) => {
    return axiosClient.get(`${resource}/${id}`);
  },
  update: () => {
    throw new Error('Not implemented');
  },
  getList: async ({ resource, meta }) => {
    const res: Pagination<any> = await axiosClient.get(`${resource}`, {
      params: meta,
    });
    return {
      data: res.items,
      total: 0,
    };
  },
  create: () => {
    throw new Error('Not implemented');
  },
  deleteOne: () => {
    throw new Error('Not implemented');
  },
  getApiUrl: () => API_URL,

  custom: (config: AxiosRequestConfig) => {
    return axiosClient(config);
  },
};
