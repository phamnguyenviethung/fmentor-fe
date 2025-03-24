import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import {
  Checkpoint,
  Project,
  CheckpointTaskApiParams,
} from './interfaces/project.interface';

interface IProjectApi {
  getCheckpointList(): Promise<Pagination<Checkpoint>>;
  getCheckpointTaskList(
    p: CheckpointTaskApiParams
  ): Promise<Pagination<Checkpoint>>;
  getMyProject(): Promise<Pagination<Project>>;
  getProjectById(id: string): Promise<Project>;
  createProject(p: {
    name: string;
    description: string;
    facultyId: string;
  }): Promise<void>;
  inviteStudentToProject(projectId: string, email: string): Promise<void>;
}

export const ProjectApi: IProjectApi = {
  async getMyProject(): Promise<Pagination<Project>> {
    const res: Pagination<Project> = await axiosClient.get(
      '/students/my-projects'
    );
    return res;
  },

  async getProjectById(id: string): Promise<Project> {
    const res: Project = await axiosClient.get(`/projects/${id}`);
    return res;
  },

  async createProject(p: {
    name: string;
    description: string;
    facultyId: string;
  }): Promise<void> {
    await axiosClient.post('/projects', p);
  },

  async getCheckpointList(): Promise<Pagination<Checkpoint>> {
    const res: Pagination<Checkpoint> = await axiosClient.get('/checkpoints');
    return res;
  },
  async getCheckpointTaskList(
    params: CheckpointTaskApiParams
  ): Promise<Pagination<Checkpoint>> {
    const res: Pagination<Checkpoint> = await axiosClient.get(
      '/checkpoint-tasks',
      {
        params,
      }
    );
    return res;
  },

  async inviteStudentToProject(
    projectId: string,
    email: string
  ): Promise<void> {
    await axiosClient.post(`/project-students/send-invitation`, {
      projectId,
      email,
    });
  },
};
export default ProjectApi;
