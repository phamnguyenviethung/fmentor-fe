export interface Project {
  id: string;
  code: string;
  description: string;
  status: ProjectStatus;
  statusName: string;
  mentorId: string;
  lecturerId: string;
  facultyId: string;
  facultyIdCode: string;
  termId: string;
  termCode: string;
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
