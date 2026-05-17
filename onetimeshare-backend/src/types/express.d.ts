export {};

declare global {
  namespace Express {
    interface Response {
      sendApiResponse<T>(data: T, statusCode?: number): this;
    }
  }
}
