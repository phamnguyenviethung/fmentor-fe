import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import {
  Account,
  LecturerProfile,
  MentorProfile,
  Transaction,
} from './interfaces/account.inteface';
import {
  CreateAvaibilityRequestData,
  MentorAvailability,
  UpdateAvaibilityRequestData,
} from './interfaces/project.interface';

interface IAccountApi {
  getAccounts(code: string): Promise<Pagination<Account>>;
  getProfile(): Promise<Account>;
  getMentorAvailability(
    id: string,
    params?: object
  ): Promise<Pagination<MentorAvailability>>;
  createMentorAvailability(data: CreateAvaibilityRequestData): Promise<void>;
  updateMentorAvailability(
    id: string,
    data: UpdateAvaibilityRequestData
  ): Promise<void>;
  deleteMentorAvailability(id: string): Promise<void>;
  deposit(amount: number): Promise<{
    paymentUrl: string;
  }>;
  getMentorProfile(id: string): Promise<MentorProfile>;
  getLecturerProfile(id: string): Promise<LecturerProfile>;
  getMyTransaction(): Promise<Pagination<Transaction>>;
  getTransaction(): Promise<Pagination<Transaction>>;
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

  async getMentorAvailability(
    id: string,
    params?: object
  ): Promise<Pagination<MentorAvailability>> {
    return await axiosClient.get('/mentor-availability/', {
      params: {
        mentorId: id,
        PageSize: 10000,
        ...params,
      },
    });
  },
  async createMentorAvailability(
    data: CreateAvaibilityRequestData
  ): Promise<void> {
    return await axiosClient.post('/mentor-availability/', data);
  },

  async updateMentorAvailability(
    id: string,
    data: UpdateAvaibilityRequestData
  ): Promise<void> {
    return await axiosClient.patch('/mentor-availability/' + id, data);
  },

  async deleteMentorAvailability(id: string): Promise<void> {
    return await axiosClient.delete('/mentor-availability/' + id);
  },

  async deposit(amount: number): Promise<{
    paymentUrl: string;
  }> {
    return await axiosClient.post(`students/deposit`, null, {
      params: { amount },
    });
  },

  async getMentorProfile(id: string): Promise<MentorProfile> {
    return await axiosClient.get(`/accounts/${id}/profile`);
  },

  async getLecturerProfile(id: string): Promise<LecturerProfile> {
    return await axiosClient.get(`/accounts/${id}/profile`);
  },

  async getMyTransaction(): Promise<Pagination<Transaction>> {
    return await axiosClient.get('/transactions/my-transactions');
  },
  async getTransaction(): Promise<Pagination<Transaction>> {
    return await axiosClient.get('/transactions/');
  },
};
