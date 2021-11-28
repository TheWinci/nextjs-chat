import { useRouter } from "next/dist/client/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { LoginParams, IAuthContext } from "./Auth.types";
import { initialContext } from "./Auth.constants";
import { FirebaseContext } from "../Firebase/FirebaseProvider";
import { Center, Loading } from "../Loading.styles";
import { Layout } from "../Layout/Layout";

export const AuthContext = createContext<IAuthContext>(initialContext)

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const firebaseContext = useContext(FirebaseContext)
  const auth = getAuth(firebaseContext.app)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscriber = auth
      .onAuthStateChanged(() => setIsLoading(false))

    return () => unsubscriber()
  }, [])

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
    console.log(`auth.currentUser`, auth.currentUser)
    const isExcludedPath = ['/login', '/register'].includes(router.pathname)
    if (auth.currentUser === null && !isExcludedPath) {
      navigateToLogin()
    }
    if (auth.currentUser !== null && isExcludedPath) {
      navigateToHome()
    }
  }, [auth.currentUser, isLoading])

  const login = async ({ username, password }: LoginParams) => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => navigateToHome())
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logFirebaseError(errorCode, errorMessage)
      });
  }

  const register = async ({ username, password }: LoginParams) => {
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => navigateToHome())
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logFirebaseError(errorCode, errorMessage)
      });
  }

  const logout = async () => {
    signOut(auth)
      .then(() => navigateToLogin())
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
      {
        isLoading
          ? (
            <Layout>
              <Center>
                <Loading size={75} />
              </Center>
            </Layout>
          )
          : children
      }
    </AuthContext.Provider>
  );
}