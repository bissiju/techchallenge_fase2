export enum UserType {
  CUSTOMER = "Client",
  ADMIN = "Admin",
}

export default interface AuthenticationRepository {
  authUser(token: string, UserType: UserType): Promise<string>;
}
