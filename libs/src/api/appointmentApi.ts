import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import {
  Appointment,
  CreateAppointmentRequestData,
} from './interfaces/project.interface';

interface IAppointmentApi {
  getMyAppointments(p: object): Promise<Pagination<Appointment>>;
  createAppointment(data: CreateAppointmentRequestData): Promise<void>;
  updateAppointment(id: string, status: number): Promise<void>;
  getAppoinementList(p: object): Promise<Pagination<Appointment>>;
}

export const AppointmentApi: IAppointmentApi = {
  async getAppoinementList(p: object): Promise<Pagination<Appointment>> {
    const res: Pagination<Appointment> = await axiosClient.get('/appointment', {
      params: p,
    });
    return res;
  },

  async getMyAppointments(p: object): Promise<Pagination<Appointment>> {
    const res: Pagination<Appointment> = await axiosClient.get(
      '/appointment/my-appointments',
      {
        params: p,
      }
    );
    return res;
  },

  async createAppointment(data: CreateAppointmentRequestData): Promise<void> {
    await axiosClient.post('/appointment', data);
  },

  async updateAppointment(id: string, status: number): Promise<void> {
    await axiosClient.post(`/appointment/${id}/status`, {
      status,
      cancelReason: 'cancel',
      rejectReason: 'reject',
    });
  },
};
