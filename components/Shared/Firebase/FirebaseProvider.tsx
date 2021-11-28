
import { FirebaseApp, initializeApp } from 'firebase/app';
import React, { useEffect, useState, createContext, FC } from 'react'
import { getPublicEnv } from '../../../services/env.service';
import { initialContext } from './Firebase.constants';
import { IFirebaseContext } from './Firebase.types';

export const FirebaseContext = createContext<IFirebaseContext>(initialContext)

export const FirebaseProvider: FC = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(initializeApp(getPublicEnv('firebase')));

  const init = () => {
    const app = initializeApp(getPublicEnv('firebase'));
    setFirebaseApp(app)
  }

  useEffect(() => {
    if (firebaseApp !== null) {
      return;
    }
    init()
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        app: firebaseApp,
        init
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
