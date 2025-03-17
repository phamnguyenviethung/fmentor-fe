export interface Term {
  id: string;
  code: string;
  status: TermStatus;
  startDate: string;
  endDate: string;
}

export enum TermStatus {
  PENDING = 1,
  ACTIVE = 2,
  COMPLETED = 3,
}
