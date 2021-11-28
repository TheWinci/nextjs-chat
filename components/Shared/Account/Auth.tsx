import { useRouter } from "next/dist/client/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getPublicEnv } from "../../../services/env.service";
import { LoginParams, IAuthContext } from "./Auth.types";
import { initialContext } from "./Auth.constants";
import { FirebaseContext } from "../Firebase/FirebaseProvider";

export const AuthContext = createContext<IAuthContext>(initialContext)

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const firebaseContext = useContext(FirebaseContext)
  const auth = getAuth(firebaseContext.app);

  const navigateToHome = () => {
    router.push('/')
  }

  const navigateToLogin = () => {
    router.push('/login')
  }

  const logFirebaseError = (errorCode: any, errorMessage: any) => {
    console.warn(`>\tFirebase error:\t`, errorCode, errorMessage)
  }

  useEffect(() => {
    const isExcludedPath = ['/login', '/register'].includes(router.pathname)

    if (auth.currentUser === null) {
      if (!isExcludedPath) {
        navigateToLogin()
        return;
      }
      return;
    }

    if (isExcludedPath) {
      navigateToHome()
      return;
    }
  }, [auth.currentUser])

  const login = async ({ username, password }: LoginParams) => {
    signInWithEmailAndPassword(auth, username, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logFirebaseError(errorCode, errorMessage)
      });
  }

  const register = async ({ username, password }: LoginParams) => {
    createUserWithEmailAndPassword(auth, username, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logFirebaseError(errorCode, errorMessage)
      });
  }

  const logout = async () => {
    signOut(auth)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logFirebaseError(errorCode, errorMessage)
      });
  }

  return (
    <AuthContext.Provider value={{
      user: auth.currentUser,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}