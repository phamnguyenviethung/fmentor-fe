import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import { Project } from './interfaces/project.interface';

interface IProjectApi {
  getMyProject(): Promise<Pagination<Project>>;
}

export const ProjectApi: IProjectApi = {
  async getMyProject(): Promise<Pagination<Project>> {
    const res: Pagination<Project> = await axiosClient.get(
      '/students/my-projects'
    );
    return res;
  },
};
export default ProjectApi;
