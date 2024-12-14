export interface IRequestDAO<T> {
  status: number,
  message: string,
  data: T;
}
