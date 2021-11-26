
export type LoginParams = {
  username: string,
  password: string
}

export interface IAuthContext {
  account: TAccount | null,
  login: (params: LoginParams) => Promise<void>,
  register: (params: LoginParams) => Promise<void>,
  logout: () => Promise<void>,
}

export type TAccount = {
  id: string,
  createdAt: number,
  username: string,
  hash: string,
  salt: string,
}