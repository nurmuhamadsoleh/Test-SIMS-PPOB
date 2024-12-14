export interface IProfileDAO {
    status: number,
    message: string,
    data: {
        email: string,
        first_name: string,
        last_name: string,
        profile_image: string
  }
}