export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface Pagination<T> {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}
