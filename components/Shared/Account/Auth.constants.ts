import { LoginParams } from "./Auth.types";

export const initialContext = {
  user: null,
  login: async (_params: LoginParams) => { },
  register: async (_params: LoginParams) => { },
  logout: async () => { },
}