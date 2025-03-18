export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: number;
  isSuspended: boolean;
  balance: number;
}

export enum Role {
  ADMIN = '1',
  STUDENT = '2',
  MENTOR = '3',
  LECTURER = '4',
}
