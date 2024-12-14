export interface ILoginDAO {
  status: number,
  message: string,
  data: {
    token: string
  }
}