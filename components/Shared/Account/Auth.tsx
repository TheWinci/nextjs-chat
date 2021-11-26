import { useRouter } from "next/dist/client/router";
import { createContext, FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getPublicEnv } from "../../../services/env.service";

import { post, get, put } from '../../../libs/http'
import { LoginParams, IAuthContext, TAccount } from "./Auth.types";
import { initialContext } from "./Auth.constants";

export const AuthContext = createContext<IAuthContext>(initialContext)

export const AuthProvider: FC = ({ children }) => {
  const [cookies, setCookies] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()

  useEffect(() => {
    const hasCookies = Object.keys(cookies).length > 0;
    const isExcludedRoute = ['/register', '/login'].includes(router.pathname)
    const hasAccountId = cookies[getPublicEnv('userCookieName')]?.id?.trim()

    if (!isExcludedRoute && (!hasCookies || !hasAccountId)) {
      router.push('/login')
      return;
    }
  }, [cookies])

  const login = async ({ username, password }: LoginParams) => {

    const result = await post('/api/user', { username, password })

    setCookies(getPublicEnv('userCookieName'), result.user)
    router.push('/')
  }

  const register = async ({ username, password }: LoginParams) => {

    const result = await put('/api/user', { username, password })

    if (result.error) {
      return;
    }

    login({ username, password })
    router.push('/')
  }

  const logout = async () => {
    setCookies(getPublicEnv('userCookieName'), null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      account: cookies[getPublicEnv('userCookieName')],
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}