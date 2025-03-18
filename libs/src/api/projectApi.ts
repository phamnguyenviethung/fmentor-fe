import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import { Project } from './interfaces/project.interface';

interface IProjectApi {
  getMyProject(): Promise<Pagination<Project>>;
  createProject(p: {
    name: string;
    description: string;
    facultyId: string;
  }): Promise<void>;
}

export const ProjectApi: IProjectApi = {
  async getMyProject(): Promise<Pagination<Project>> {
    const res: Pagination<Project> = await axiosClient.get(
      '/students/my-projects'
    );
    return res;
  },

  async createProject(p: {
    name: string;
    description: string;
    facultyId: string;
  }): Promise<void> {
    await axiosClient.post('/projects', p);
  },
};
export default ProjectApi;
