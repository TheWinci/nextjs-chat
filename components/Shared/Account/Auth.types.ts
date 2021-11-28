import { User } from "firebase/auth";
import { TCurrentUser } from "../../../pages/api/users/user.service";

export type LoginParams = {
  username: string,
  password: string
}

export interface IAuthContext {
  user: User | null,
  login: (params: LoginParams) => Promise<void>,
  register: (params: LoginParams) => Promise<void>,
  logout: () => Promise<void>,
}
