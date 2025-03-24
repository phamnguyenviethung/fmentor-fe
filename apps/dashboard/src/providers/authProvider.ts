import { axiosClient } from '@libs';
import { AuthActionResponse, AuthProvider } from '@refinedev/core';

export const authProvider: AuthProvider = {
  check: async () => {
    const token = localStorage.getItem('token');

    return { authenticated: !!token };
  },
  login: async ({ username, password }): Promise<AuthActionResponse> => {
    const res = await axiosClient.post('/authentication/admin-login', {
      username,
      password,
    });

    localStorage.setItem('token', JSON.stringify(res));
    return {
      success: true,
      redirectTo: '/',
    };
  },
  logout: async () => {
    throw new Error('Not implemented');
  },
  onError: async (error) => {
    throw new Error('Not implemented');
  },
  // ...
};
