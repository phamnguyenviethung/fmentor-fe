import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import { Account } from './interfaces/account.inteface';
import { Appointment } from './interfaces/project.interface';

interface IAppointmentApi {
  getMyAppointments(): Promise<Pagination<Appointment>>;
}

export const AppointmentApi: IAppointmentApi = {
  async getMyAppointments(): Promise<Pagination<Appointment>> {
    const res: Pagination<Account> = await axiosClient.get(
      '/students/my-appointments'
    );
    return res;
  },
};
