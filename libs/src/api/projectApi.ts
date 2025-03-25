import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import {
  Checkpoint,
  Project,
  CheckpointTaskApiParams,
  MentoringProposal,
} from './interfaces/project.interface';

interface IProjectApi {
  getCheckpointList(): Promise<Pagination<Checkpoint>>;
  getCheckpointTaskList(
    p: CheckpointTaskApiParams
  ): Promise<Pagination<Checkpoint>>;
  getMyCheckpointTaskList(p: object): Promise<Pagination<Checkpoint>>;
  getMyProject(): Promise<Pagination<Project>>;
  getProjectById(id: string): Promise<Project>;
  createProject(p: {
    name: string;
    description: string;
    facultyId: string;
  }): Promise<void>;
  inviteStudentToProject(projectId: string, email: string): Promise<void>;
  inviteMentorToProject(projectId: string, email: string): Promise<void>;
  inviteLecturerToProject(projectId: string, email: string): Promise<void>;
  acceptInvitation(token: string): Promise<void>;
  getMentoringProposal(p: object): Promise<Pagination<MentoringProposal>>;
  updateMentoringProposal(id: string, isAcp: boolean): Promise<void>;
}

export const ProjectApi: IProjectApi = {
  async getMentoringProposal(
    p: object
  ): Promise<Pagination<MentoringProposal>> {
    const res: Pagination<MentoringProposal> = await axiosClient.get(
      '/mentoring-proposals',
      { params: p }
    );
    return res;
  },

  async updateMentoringProposal(
    id: string,
    isAccpeted: boolean
  ): Promise<void> {
    await axiosClient.patch(`/mentoring-proposals/${id}/response`, {
      isAccpeted,
      note: 'asd',
    });
  },

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

  async getMyCheckpointTaskList(p: object): Promise<Pagination<Checkpoint>> {
    const res: Pagination<Checkpoint> = await axiosClient.get(
      '/students/my-checkpoint-tasks',
      {
        params: p,
      }
    );
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
  async inviteMentorToProject(projectId: string, email: string): Promise<void> {
    await axiosClient.post(`/mentoring-proposals`, {
      projectId,
      email,
      studentNote: 'mentor',
    });
  },

  async inviteLecturerToProject(
    projectId: string,
    email: string
  ): Promise<void> {
    await axiosClient.post(`/lecturing-proposals`, {
      projectId,
      email,
      studentNote: 'mentor',
    });
  },

  async acceptInvitation(token): Promise<void> {
    await axiosClient.get(`/project-students/accept-invitation`, {
      params: {
        token,
      },
    });
  },
};
export default ProjectApi;
