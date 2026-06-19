export class ApiResponse<T> {

  success: boolean;

  requestId?: string;

  data?: T;

  pagination?: unknown;

  constructor(
    success: boolean,
    requestId?: string,
    data?: T,
    pagination?: unknown
  ) {

    this.success =
      success;

    this.requestId =
      requestId;

    this.data = data;

    this.pagination =
      pagination;
  }
}