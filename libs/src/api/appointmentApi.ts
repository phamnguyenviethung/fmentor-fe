import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import {
  Appointment,
  CreateAppointmentRequestData,
} from './interfaces/project.interface';

interface IAppointmentApi {
  getMyAppointments(p: object): Promise<Pagination<Appointment>>;
  getMentorAppointments(p: object): Promise<Pagination<Appointment>>;
  createAppointment(data: CreateAppointmentRequestData): Promise<void>;
  updateAppointment(id: string, status: number): Promise<void>;
}

export const AppointmentApi: IAppointmentApi = {
  async getMyAppointments(p: object): Promise<Pagination<Appointment>> {
    const res: Pagination<Appointment> = await axiosClient.get(
      '/students/my-appointments',
      {
        params: p,
      }
    );
    return res;
  },

  async createAppointment(data: CreateAppointmentRequestData): Promise<void> {
    await axiosClient.post('/appointment', data);
  },

  async getMentorAppointments(p: object): Promise<Pagination<Appointment>> {
    const res: Pagination<Appointment> = await axiosClient.get(
      '/mentors/my-appointments',
      {
        params: p,
      }
    );
    return res;
  },

  async updateAppointment(id: string, status: number): Promise<void> {
    await axiosClient.post(`/appointment/${id}/status`, {
      status,
      cancelReason: 'cancel',
      rejectReason: null,
    });
  },
};
