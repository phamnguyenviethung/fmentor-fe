export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: Role;
  isSuspended: boolean;
  balance: number;
}

export enum Role {
  ADMIN = '1',
  STUDENT = '2',
  MENTOR = '3',
  LECTURER = '4',
}

export interface MentorProfile extends Account {
  baseSalaryPerHour: number;
}

export interface LecturerProfile extends Account {
  faculty: string | null;
}
