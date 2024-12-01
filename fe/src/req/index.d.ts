type SuccessResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  error: false;
};

export type ErrorResponse = {
  statusCode: number;
  data: undefined;
  message: string[];
  error: true;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;
