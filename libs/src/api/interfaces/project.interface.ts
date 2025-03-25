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
  projectStudents: ProjectStudent[];
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
  projectId: string;
  projectName: string;
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
  projectId: string;
  projectName: string;
  mentorId: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  statusName: string;
  baseSalaryPerHour: number;
  totalPayment: number;
  totalTime: number;
  cancelReason: string | null;
  rejectReason: string | null;
}

export enum AppointmentStatus {
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  PendingConfirmation = 4,
  ConfirmedByStudent = 5,
  ConfirmedByMentor = 6,
  Completed = 7,
  Canceled = 8,
  CancelRequested = 9,
}

export interface CreateAppointmentRequestData {
  projectId: string;
  mentorId: string;
  startTime: string;
  endTime: string;
}

export interface MentorAvailability {
  id: string;
  mentorId: string;
  date: string;
  availableTimeSlots: TimeSlot[];
}
export interface TimeSlot {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  displayText: string;
}

export interface CreateAvaibilityRequestData {
  date: string;
  availableTimeSlots: { startTime: string; endTime: string }[];
}

export interface UpdateAvaibilityRequestData {
  availableTimeSlots: {
    startTime: string;
    endTime: string;
    startDate: Date | string;
    endDate: Date | string;
  }[];
}

export interface MentoringProposal {
  id: string;
  mentorId: string;
  projectId: string;
  studentNote: string;
  statusName: string;
  status: number;
}

export enum MentoringProposalStatus {
  Pending,
  Accepted,
  Rejected,
  Closed,
}

export interface LectucringProposal {
  id: string;
  lecturerId: string;
  projectId: string;
  studentNote: string;
  statusName: string;
  status: number;
}

export enum LectucringProposalStatus {
  Pending,
  Accepted,
  Rejected,
  Closed,
}
