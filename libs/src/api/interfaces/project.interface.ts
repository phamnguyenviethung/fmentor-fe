export interface ProjectStudent {
  id: string;
  code: string;
  studentId: string;
  projectId: string;
  firstName: string;
  lastName: string;
  isLeader: boolean;
}
export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  status: ProjectStatus;
  statusName: string;
  mentorId: string;
  mentorName: string;
  lecturerId: string;
  lecturerName: string;
  facultyId: string;
  facultyCode: string;
  termId: string;
  termCode: string;
  ProjectStudents: ProjectStudent[];
}

export enum ProjectStatus {
  Pending = 1,
  InProgress = 2,
  PendingReview = 3,
  Completed = 4,
  Failed = 5,
  RevisionRequired = 6,
  Closed = 7,
}

export interface Checkpoint {
  id: string;
  code: string;
  termId: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface CheckpointTask {
  id: string;
  code: string;
  checkpointId: string;
  name: string;
  startTime: string;
  endTime: string;
  status: number;
  statusName: string;
}

export enum CheckpointTaskStatus {
  Pending = 1,
  InProgress = 2,
  PendingReview = 3,
  Completed = 4,
  Failed = 5,
}

export interface CheckpointTaskApiParams {
  projectId?: string;
  checkpointId?: string;
}

export interface Appointment {
  id: string;
}
