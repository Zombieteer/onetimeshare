export type ApiResponse<T> = {
    data: T;
    statusCode: number;
    errorMessage: string | null;
};