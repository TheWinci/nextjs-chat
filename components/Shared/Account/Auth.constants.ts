import { LoginParams } from "./Auth.types";

export const initialContext = {
  account: null,
  login: async (_params: LoginParams) => { },
  register: async (_params: LoginParams) => { },
  logout: async () => { },
}