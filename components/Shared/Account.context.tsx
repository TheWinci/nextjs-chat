import { useRouter } from "next/dist/client/router";
import { createContext, FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getPublicEnv } from "../../services/env.service";

export type LoginParams = { username: string, password: string }
export interface IAccountContext {
  account: LoginParams | null,
  login: (params: LoginParams) => Promise<void>,
  logout: () => Promise<void>,
}

const initialContext = {
  account: null,
  login: async (_params: LoginParams) => { },
  logout: async () => { },
}

export const AccountContext = createContext<IAccountContext>(initialContext)

export const AccountProvider: FC = ({ children }) => {
  const [account, setAccount] = useState<LoginParams | null>(null);
  const [cookies] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()

  useEffect(() => {
    if (
      Object.keys(cookies).length <= 0 &&
      router.pathname !== '/register'
    ) {
      router.push('/login')
    }
  }, [cookies])

  const login = async ({ username, password }: LoginParams) => {
    console.log(`attemp login`, { username, password })

    setTimeout(() => {
      setAccount({ username, password })
      router.push('/')
    }, 1500);
  }

  const logout = async () => {
    console.log(`attemp logout`, account)

    setTimeout(() => {
      setAccount(null)
      router.push('/login')
    }, 1500);
  }

  return (
    <AccountContext.Provider value={{ account, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}