import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import { Account } from './interfaces/account.inteface';

interface IAccountApi {
  getAccounts(code: string): Promise<Pagination<Account>>;
}

const AccountApi: IAccountApi = {
  async getAccounts(): Promise<Pagination<Account>> {
    const res: Pagination<Account> = await axiosClient.get('/accounts');

    return res;
  },
};
export default AccountApi;
