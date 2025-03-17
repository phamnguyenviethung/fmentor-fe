import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import { Account } from './interfaces/account.inteface';

interface IAccountApi {
  getAccounts(code: string): Promise<Pagination<Account>>;
  getProfile(): Promise<Account>;
}

export const AccountApi: IAccountApi = {
  async getAccounts(): Promise<Pagination<Account>> {
    const res: Pagination<Account> = await axiosClient.get('/accounts');
    return res;
  },

  async getProfile(): Promise<Account> {
    const res: Account = await axiosClient.get('/accounts/profile');
    return res;
  },
};
