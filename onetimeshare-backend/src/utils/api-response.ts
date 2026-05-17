export interface ApiResponse<T = unknown> {
  data: T | null;
  statusCode: number;
  errorMessage: string | null;
}

export function buildSuccessResponse<T>(data: T, statusCode: number): ApiResponse<T> {
  return {
    data,
    statusCode,
    errorMessage: null,
  };
}

export function buildErrorResponse(
  statusCode: number,
  errorMessage: string,
  data: unknown = null,
): ApiResponse {
  return {
    data,
    statusCode,
    errorMessage,
  };
}
