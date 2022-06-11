export interface PaginationRequest {
  currentPage: number;
  perPage: number;
}

export interface PaginationResponse<T> {
  data: T[];
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}
