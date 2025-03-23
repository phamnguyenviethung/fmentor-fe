import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import { Account } from './interfaces/account.inteface';
import {
  CreateAvaibilityRequestData,
  MentorAvailability,
} from './interfaces/project.interface';

interface IAccountApi {
  getAccounts(code: string): Promise<Pagination<Account>>;
  getProfile(): Promise<Account>;
  getMentorAvailability(id: string): Promise<Pagination<MentorAvailability>>;
  createMentorAvailability(data: CreateAvaibilityRequestData): Promise<void>;
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

  getMentorAvailability(id: string): Promise<Pagination<MentorAvailability>> {
    return axiosClient.get('/mentor-availability/', {
      params: {
        mentorId: id,
        PageSize: 10000,
      },
    });
  },
  createMentorAvailability(data: CreateAvaibilityRequestData): Promise<void> {
    return axiosClient.post('/mentor-availability/', data);
  },
};
