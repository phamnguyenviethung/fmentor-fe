import axiosClient from './axiosClient';
import { Pagination } from './interfaces/index';
import {
  Checkpoint,
  Project,
  CheckpointTaskApiParams,
  MentoringProposal,
  LectucringProposal,
  CreateCheckpointTaskRequestData,
  CheckpointTask,
  ProjectStatus,
} from './interfaces/project.interface';

interface IProjectApi {
  getCheckpointList(): Promise<Pagination<Checkpoint>>;
  getCheckpointTaskList(
    p: CheckpointTaskApiParams
  ): Promise<Pagination<CheckpointTask>>;
  getMyCheckpointTaskList(p: object): Promise<Pagination<Checkpoint>>;
  createCheckpointTask(data: CreateCheckpointTaskRequestData): Promise<void>;
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
  getLectucringProposal(p: object): Promise<Pagination<LectucringProposal>>;
  updateLectucringProposal(id: string, isAcp: boolean): Promise<void>;
  updateProjectStatus(id: string, status: ProjectStatus): Promise<void>;
}

export const ProjectApi: IProjectApi = {
  async updateProjectStatus(id: string, status: ProjectStatus): Promise<void> {
    await axiosClient.patch(`/projects/${id}/status`, {
      status,
    });
  },

  async createCheckpointTask(
    data: CreateCheckpointTaskRequestData
  ): Promise<void> {
    await axiosClient.post('/checkpoint-tasks', data);
  },

  async getLectucringProposal(
    p: object
  ): Promise<Pagination<LectucringProposal>> {
    const res: Pagination<LectucringProposal> = await axiosClient.get(
      '/lecturing-proposals',
      { params: p }
    );
    return res;
  },

  async updateLectucringProposal(
    id: string,
    isAccepted: boolean
  ): Promise<void> {
    await axiosClient.patch(`/lecturing-proposals/${id}/response`, {
      isAccepted,
      note: 'asd',
    });
  },
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
    isAccepted: boolean
  ): Promise<void> {
    await axiosClient.patch(`/mentoring-proposals/${id}/response`, {
      isAccepted,
      note: 'asd',
    });
  },

  async getMyProject(): Promise<Pagination<Project>> {
    const res: Pagination<Project> = await axiosClient.get(
      '/projects/my-projects'
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
  ): Promise<Pagination<CheckpointTask>> {
    const res: Pagination<CheckpointTask> = await axiosClient.get(
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
