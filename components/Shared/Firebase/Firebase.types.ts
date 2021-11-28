import { FirebaseApp } from "firebase/app";

export interface IFirebaseContext {
  app: FirebaseApp,
  init: () => void,
}
