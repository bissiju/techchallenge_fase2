import { UserType } from "~domain/repository/authenticationRepository";

export {}

declare global {
  namespace Express {
    export interface Request {
        userType?: UserType
        customerId: string;
    }
  }
}