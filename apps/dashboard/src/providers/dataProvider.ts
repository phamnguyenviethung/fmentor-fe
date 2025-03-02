import type { DataProvider, GetListResponse } from "@refinedev/core";
import { axiosClient, API_URL } from '@shared';


export const dataProvider: DataProvider = {
    getOne: async ({ resource, id, meta }) => {
        const response = await axiosClient.get(`${resource}/${id}`);

        return response.data
    },
    update: () => {
        throw new Error("Not implemented");
    },
    getList: async ({ resource, meta }) => {
        const response = await axiosClient.get(`${resource}`);
        return { data: response.data, total: 0 }
    },
    create: () => {
        throw new Error("Not implemented");
    },
    deleteOne: () => {
        throw new Error("Not implemented");
    },
    getApiUrl: () => API_URL,
    // Optional methods:
    // getMany: () => { /* ... */ },
    // createMany: () => { /* ... */ },
    // deleteMany: () => { /* ... */ },
    // updateMany: () => { /* ... */ },
    // custom: () => { /* ... */ },
};