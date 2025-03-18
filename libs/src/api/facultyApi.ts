import axiosClient from './axiosClient';
import { Pagination } from './interfaces';
import { Faculty } from './interfaces/faculty.interface';

interface IFacultyApi {
  getFacultyList(): Promise<Pagination<Faculty>>;
}

export const FacultyApi: IFacultyApi = {
  async getFacultyList(): Promise<Pagination<Faculty>> {
    const res: Pagination<Faculty> = await axiosClient.get('/faculties');

    return res;
  },
};
export default FacultyApi;
